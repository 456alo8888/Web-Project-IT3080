import { DataTypes } from 'sequelize';
import sequelize from 'backend/config/mySQL.js';

const Resident = sequelize.define('Resident', {
   room: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   gender: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
         min: 18,
      },
   },
   phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
   },
   cccd: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
   },
   image: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   numMember: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
   },
});

export default Resident;
