import { Model } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  class Receipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Receipt.init(
    {
      adminId: DataTypes.INTEGER,
      residentId: DataTypes.INTEGER,
      moneyAmount: DataTypes.FLOAT,
      billId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Receipt',
      underscored: true,
    }
  );

  return Receipt;
};
