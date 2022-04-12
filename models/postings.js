'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Postings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Postings.belongsTo(models.Users, {as: 'Users', foreignKey: 'user_id', sourceKey: 'id' });
      Postings.hasMany(models.Comments, { foreignKey: 'posting_id', as: 'Comments' });
      Postings.hasMany(models.Likes, { foreignKey: 'posting_id', as: 'Likes' })
    }
  };
  Postings.init({
    user_id: DataTypes.INTEGER,
    postingan: DataTypes.STRING,
    status: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Postings',
  });
  return Postings;
};