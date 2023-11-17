const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database.config');

class Answer extends Model { };

Answer.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  postedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  answerOf: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Answer',
  tableName: 'answerPosts',
});

module.exports = Answer;