import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import connection from './database.js';

if (dotenv.config().error) 
    throw new Error('Failed to initialize dotenv')

const PORT = process.env.PORT;
const app = express();
const db = connection();

app.use(bodyParser.json());

// Serve static files in the 'public' directory
app.use(express.static(path.join(import.meta.dirname, 'public')));

// Route to add a user through the API
app.post('/users', async (req, res) => {
    const { username, password } = req.body;
    const saltRounds = 10;
    let hashedPassword = null;
    try {
        hashedPassword = await bcrypt.hash(password, saltRounds)
    } catch (error) {
        res.status(500).send(`Password hashing failed: ${error}`);
        return;
    }
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';

    db.query(query, [username, hashedPassword], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding user');
            return;
        }
        res.status(200).send('User added successfully');
    });
});

// Route to get the list of users
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching users');
            return;
        }
        res.status(200).json(results);
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
