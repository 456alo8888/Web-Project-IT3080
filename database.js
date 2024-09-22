import mysql from 'mysql';

export default function connection() {
    console.log(`User is ${process.env.DB_USER}`)
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'mydatabase',
    });

    connection.connect((err) => {
        if (err) {
            throw new Error(`Failed to connect to database: ${err.stack}`);
        }
        console.log(`Connected to database as id ${connection.threadId}`);
    });

    return connection;
}
