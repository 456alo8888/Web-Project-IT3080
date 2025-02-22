import { Model } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  class VehicleType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }

  VehicleType.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'VehicleType',
      tableName: 'vehicle_types',
      underscored: true,
    }
  );

  return VehicleType;
};
