import { Model } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  class FeeOptional extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FeeOptional.belongsTo(models.Fee, { foreignKey: 'id' });
    }
  }

  FeeOptional.init(
    {
      lowerBound: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'FeeOptional',
      underscored: true,
      tableName: 'fees_optional'
    }
  );

  return FeeOptional;
};