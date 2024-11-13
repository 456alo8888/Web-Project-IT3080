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
      // define association here
    }
  }

  Bill.init(
    {
      roomId: DataTypes.INTEGER,
      billName: DataTypes.STRING,
      deadline: DataTypes.DATE,
      cost: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Bill',
      underscored: true,
    }
  );

  return Bill;
};
