'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Fee.init({
    name: DataTypes.STRING,
    fee_type: DataTypes.STRING,
    created_by_id: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    house_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Fee',
  });
  return Fee;
};