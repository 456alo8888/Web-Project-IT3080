import mysql from 'mysql2/promise';

// Table
const createTables = async () => {
    const connection = await connectDB();
    
    const createFeesTable = `
        CREATE TABLE IF NOT EXISTS fees (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            feeType ENUM('BAT_BUOC', 'HOA_DON', 'TU_NGUYEN') NOT NULL,
            deadline DATETIME DEFAULT CURRENT_TIMESTAMP,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
    `;
    const createFeepayInfoTable = `
        CREATE TABLE IF NOT EXISTS feepayInfo (
            id INT AUTO_INCREMENT PRIMARY KEY,
            fee_id INT,
            room VARCHAR(255) NOT NULL,
            cost DECIMAL(10, 2) NOT NULL CHECK (cost >= 0),
            payed DECIMAL(10, 2) DEFAULT 0 CHECK (payed >= 0),
            FOREIGN KEY (fee_id) REFERENCES fees(id) ON DELETE CASCADE
        );
    `;
    await connection.execute(createFeesTable);
    await connection.execute(createFeepayInfoTable);
    console.log("Tables created successfully.");
    await connection.end();
};

// Querry
const createFee = async (connection, feeData) => {
    const { name, feeType, deadline, feepayInfo } = feeData;
    const feeQuery = `INSERT INTO fees (name, feeType, deadline) VALUES (?, ?, ?)`;
    const [result] = await connection.execute(feeQuery, [name, feeType, deadline]);
    const feeId = result.insertId;
    const payInfoQuery = `INSERT INTO feepayInfo (fee_id, room, cost, payed) VALUES (?, ?, ?, ?)`;
    for (const payInfo of feepayInfo) {
        await connection.execute(payInfoQuery, [feeId, payInfo.room, payInfo.cost, payInfo.payed]);
    }
};

export { createTables, createFee };
