import { Model } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Room.init(
    {
      roomNumber: DataTypes.INTEGER,
      headResidentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Room',
      underscored: true,
    }
  );

  return Room;
};
