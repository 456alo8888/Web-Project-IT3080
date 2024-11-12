'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Receipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Receipt.init({
    admin_id: DataTypes.INTEGER,
    resident_id: DataTypes.INTEGER,
    money_amount: DataTypes.FLOAT,
    bill_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Receipt',
  });
  return Receipt;
};