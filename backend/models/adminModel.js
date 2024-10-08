//mySQL table
CREATE TABLE residents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    age INT NOT NULL CHECK (age >= 18),
    phone VARCHAR(20) NOT NULL UNIQUE,
    cccd VARCHAR(20) NOT NULL UNIQUE,
    image VARCHAR(255) NOT NULL,
    numMember INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

//Querry
const createResident = async (connection, residentData) => {
    const { room, name, gender, age, phone, cccd, image, numMember } = residentData;
    const query = INSERT INTO residents (room, name, gender, age, phone, cccd, image, numMember) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    
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
