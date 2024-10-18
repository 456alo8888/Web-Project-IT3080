import { DataTypes } from 'sequelize';
import sequelize from 'backend/config/mySQL.js'; 

const Admin = sequelize.define('Admin', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  updateFeeAuthority: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  createFeeAuthority: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  updateResidentAuthority: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  isRoot: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Admin;
