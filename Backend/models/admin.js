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
      // define association here
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
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Admin',
      underscored: true,
    }
  );

  return Admin;
};
