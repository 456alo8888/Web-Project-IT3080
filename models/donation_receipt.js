'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donation_receipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Donation_receipt.init({
    resident_id: DataTypes.INTEGER,
    fee_name: DataTypes.STRING,
    admin_id: DataTypes.INTEGER,
    money_amount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Donation_receipt',
  });
  return Donation_receipt;
};