import { Model } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Associate Vehicle with Room
      Vehicle.belongsTo(models.Room);
      Vehicle.belongsTo(models.VehicleType, { as: 'type' });
    }
  }

  Vehicle.init(
    {
      roomId: DataTypes.INTEGER,
      typeId: DataTypes.INTEGER,
      licensePlate: DataTypes.STRING,
      image: DataTypes.STRING,
      insuranceEndDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Vehicle',
      underscored: true,
    }
  );

  return Vehicle;
};
