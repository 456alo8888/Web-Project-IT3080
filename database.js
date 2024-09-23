import mysql2 from 'mysql2';

export default function connection() {
    const connection = mysql2.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'mydatabase',
    });

    connection.connect((err) => {
        if (err)
            throw new Error(`Failed to connect to database: ${err.stack}`);
    });

    return connection;
}
