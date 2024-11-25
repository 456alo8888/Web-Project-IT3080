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
      Resident.belongsTo(models.Room, { foreignKey: 'roomId' });
    }
  }

  Resident.init(
    {
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      idCardNumber: DataTypes.STRING,
      roomId: DataTypes.INTEGER,
      image: DataTypes.STRING(2083),
    },
    {
      sequelize,
      modelName: 'Resident',
      underscored: true,
    }
  );

  return Resident;
};
