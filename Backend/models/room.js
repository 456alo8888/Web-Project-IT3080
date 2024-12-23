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
      Room.hasMany(models.Resident);
      Room.hasMany(models.Bill);
      Room.hasMany(models.DonationReceipt);
      Room.hasMany(models.Vehicle);
      Room.belongsTo(models.Resident, { as: 'headResident' });
      Room.belongsTo(models.RoomType, { foreignKey: 'typeId' });
    }
  }

  Room.init(
    {
      roomName: DataTypes.STRING,
      headResidentId: DataTypes.INTEGER,
      typeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Room',
      underscored: true,
    }
  );

  return Room;
};
