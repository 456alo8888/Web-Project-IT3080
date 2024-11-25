import { Model } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  class FeeNonOptional extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  FeeNonOptional.init(
    {
      date: DataTypes.DATE,
      type: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Fee',
      underscored: true,
    }
  );

  return FeeNonOptional;
};
