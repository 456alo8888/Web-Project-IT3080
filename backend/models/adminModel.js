import mysql2 from 'mysql2/promise'

//Table
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    updateFeeAuthority BOOLEAN NOT NULL,
    createFeeAuthority BOOLEAN NOT NULL,
    updateResidentAuthority BOOLEAN NOT NULL,
    isRoot BOOLEAN DEFAULT FALSE
);

//Querry
const createAdmin = async (connection, adminData) => {
    const { username, password, updateFeeAuthority, createFeeAuthority, updateResidentAuthority, isRoot } = adminData;
    const query = `INSERT INTO admins (username, password, updateFeeAuthority, createFeeAuthority, updateResidentAuthority, isRoot)
                   VALUES (?, ?, ?, ?, ?, ?)`;
    await connection.execute(query, [username, password, updateFeeAuthority, createFeeAuthority, updateResidentAuthority, isRoot]);
};

export { createTableQuery, createAdmin };
