import { Model } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  class DonationReceipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DonationReceipt.belongsTo(models.Fee);
    }
  }

  DonationReceipt.init(
    {
      adminId: DataTypes.INTEGER,
      residentId: DataTypes.INTEGER,
      roomId: DataTypes.INTEGER,
      value: DataTypes.FLOAT,
      feeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'DonationReceipt',
      underscored: true,
    }
  );

  return DonationReceipt;
};
