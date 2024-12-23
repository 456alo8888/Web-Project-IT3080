import { Model } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  class RoomType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  RoomType.init(
    {
      name: DataTypes.STRING,
      area: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'RoomType',
      tableName: 'room_types',
      underscored: true,
    }
  );

  return RoomType;
};
