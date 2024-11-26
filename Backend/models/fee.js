import { Model } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  class Fee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Fee.hasOne(models.FeeOptional, { foreignKey: 'id' });
      Fee.hasOne(models.FeeNonOptional, { foreignKey: 'id' });

      Fee.hasMany(models.Bill);
    }
  }

  Fee.init(
    {
      name: DataTypes.STRING,
      isOptional: DataTypes.BOOLEAN,
      createdById: DataTypes.INTEGER,
      deadline: DataTypes.DATE,
      houseCount: DataTypes.INTEGER,
      paidCount: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Fee',
      underscored: true,
    }
  );

  return Fee;
};
