'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resident extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Resident.init({
    first_name: DataTypes.STRING,
    middle_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    id_card_number: DataTypes.STRING,
    room_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Resident',
  });
  return Resident;
};