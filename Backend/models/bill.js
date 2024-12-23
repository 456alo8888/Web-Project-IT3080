import { Model } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bill.belongsTo(models.Fee);
      Bill.belongsTo(models.Room);
      Bill.hasOne(models.Receipt);
    }
  }

  Bill.init(
    {
      roomId: DataTypes.INTEGER,
      feeId: DataTypes.INTEGER,
      value: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Bill',
      underscored: true,
    }
  );

  return Bill;
};
