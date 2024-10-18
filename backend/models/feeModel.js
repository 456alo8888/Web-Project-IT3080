import { DataTypes } from 'sequelize';
import sequelize from 'backend/config/mySQL.js';

// FeePayInfo Model
const FeePayInfo = sequelize.define('FeePayInfo', {
  room: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  payed: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
});

// Fee Model
const Fee = sequelize.define('Fee', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  feeType: {
    type: DataTypes.ENUM('BAT_BUOC', 'HOA_DON', 'TU_NGUYEN'),
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Define relationships
Fee.hasMany(FeePayInfo, { as: 'feepayInfo', foreignKey: 'feeId' });
FeePayInfo.belongsTo(Fee, { foreignKey: 'feeId' });

export { Fee, FeePayInfo };
