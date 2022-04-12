'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Likes.belongsTo(models.Users, {as: 'Users', foreignKey: 'user_id', sourceKey: 'id' });
      Likes.belongsTo(models.Postings, {as: 'Postings', foreignKey: 'posting_id', sourceKey: 'id' });
    }
  };
  Likes.init({
    posting_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    like: DataTypes.INTEGER,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Likes',
  });
  return Likes;
};