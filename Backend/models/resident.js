import { Model } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
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

  Resident.init(
    {
      firstName: DataTypes.STRING,
      middleName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      age: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      idCardNumber: DataTypes.STRING,
      roomId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Resident',
      underscored: true,
    }
  );

  return Resident;
};
