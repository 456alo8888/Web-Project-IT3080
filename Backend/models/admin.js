'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    update_fee_authority: DataTypes.BOOLEAN,
    update_resident_authority: DataTypes.BOOLEAN,
    create_fee_authority: DataTypes.BOOLEAN,
    receive_authority: DataTypes.BOOLEAN,
    is_root: DataTypes.BOOLEAN,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};