'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bill.init({
    room_id: DataTypes.INTEGER,
    bill_name: DataTypes.STRING,
    deadline: DataTypes.DATE,
    cost: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Bill',
  });
  return Bill;
};