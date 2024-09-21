const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');

const app = express();
app.use(bodyParser.json());

// Phục vụ các file tĩnh trong thư mục 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Route để thêm người dùng thông qua API
app.post('/users', (req, res) => {
    const { username, password } = req.body;
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';

    db.query(query, [username, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding user');
            return;
        }
        res.status(200).send('User added successfully');
    });
});

// Route để lấy danh sách người dùng
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
