import { Model } from 'sequelize';

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Admin.hasMany(models.Receipt);
      Admin.hasMany(models.DonationReceipt);
    }
  }

  Admin.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      updateFeeAuthority: DataTypes.BOOLEAN,
      updateResidentAuthority: DataTypes.BOOLEAN,
      createFeeAuthority: DataTypes.BOOLEAN,
      receiveAuthority: DataTypes.BOOLEAN,
      isRoot: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Admin',
      underscored: true,
    }
  );

  return Admin;
};
