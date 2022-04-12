'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Postings, { foreignKey: 'user_id', as: 'Postings' });
      Users.hasMany(models.Comments, { foreignKey: 'user_id', as: 'Comments' });
      Users.hasMany(models.Likes, { foreignKey: 'user_id', as: 'Likes'})
    }
  };
  Users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};