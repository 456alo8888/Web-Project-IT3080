import { Model } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  class Donation_receipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Donation_receipt.init(
    {
      residentId: DataTypes.INTEGER,
      feeName: DataTypes.STRING,
      adminId: DataTypes.INTEGER,
      moneyAmount: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Donation_receipt',
      underscored: true,
    }
  );

  return Donation_receipt;
};
