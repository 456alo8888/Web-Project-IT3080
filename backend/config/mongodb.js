/*
import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("DB Connected");
        
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/NMPM`)

}

export default connectDB;
*/

import mysql from "mysql2/promise";

const connectDB = async () => {
    try{
        const connect = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: 'NMPM' 
        });
    console.log("MySQL DB Connected");
        return connection;
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        throw error;
    }
};

export default connectDB;
