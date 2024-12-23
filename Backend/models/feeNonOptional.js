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
      FeeNonOptional.belongsTo(models.Fee, { foreignKey: 'id' });
    }
  }

  FeeNonOptional.init(
    {
      date: DataTypes.DATE,
      type: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'FeeNonOptional',
      underscored: true,
      tableName: 'fees_non_optional'
    }
  );

  return FeeNonOptional;
};
