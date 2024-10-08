import mysql from 'mysql2/promise';

// MySQL table creation query
const createTableQuery = `
CREATE TABLE residents (
   room VARCHAR(255) NOT NULL UNIQUE,
   name VARCHAR(255) NOT NULL,
   gender VARCHAR(10) NOT NULL,
   age INT NOT NULL CHECK (age >= 18),
   phone VARCHAR(20) NOT NULL UNIQUE,
   cccd VARCHAR(20) NOT NULL UNIQUE,
   image VARCHAR(255) NOT NULL,
   numMember INT NOT NULL,
   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);
`;

// Query to create a resident
const createResident = async (connection, residentData) => {
   const { room, name, gender, age, phone, cccd, image, numMember } = residentData;
   const query = `INSERT INTO residents (room, name, gender, age, phone, cccd, image, numMember) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

   try {
       await connection.execute(query, [room, name, gender, age, phone, cccd, image, numMember]);
       console.log("Resident created successfully");
   } catch (error) {
       if (error.code === 'ER_DUP_ENTRY') {
           console.error("Error: Duplicate entry for room, phone, or CCCD");
       } else {
           console.error('Error creating resident:', error);
       }
       throw error;
   }
};

export { createTableQuery, createResident };
