import mysql from 'mysql2/promise';

//Table
const createTableQuery = `
CREATE TABLE IF NOT EXISTS history (
   id INT AUTO_INCREMENT PRIMARY KEY,
   feeId INT NOT NULL,
   feeName VARCHAR(255) NOT NULL,
   feeCost DECIMAL(10, 2) NOT NULL,
   room VARCHAR(255) NOT NULL,
   roomPayed DECIMAL(10, 2) NOT NULL,
   username VARCHAR(255) NOT NULL,
   updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const createHistoryTable = async () => {
   try {
       const connection = await pool.getConnection();
       await connection.query(createTableQuery);
       console.log("History table created successfully");
       connection.release();
   } catch (error) {
       console.error('Error creating history table:', error);
       throw error;
   }
};

//Querry
const insertHistoryRecord = async (historyData) => {
   const { feeId, feeName, feeCost, room, roomPayed, username } = historyData;
   const query = `INSERT INTO history (feeId, feeName, feeCost, room, roomPayed, username) 
                  VALUES (?, ?, ?, ?, ?, ?)`;

   try {
       const connection = await pool.getConnection();
       await connection.query(query, [feeId, feeName, feeCost, room, roomPayed, username]);
       console.log("History record inserted successfully");
       connection.release();
   } catch (error) {
       console.error('Error inserting history record:', error);
       throw error;
   }
};

export { createHistoryTable, insertHistoryRecord };
