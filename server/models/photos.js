const Sequelize = require('sequelize');
const sequelize = require('../../util/database');
const db = require('../../util/database');

const Photos = db.define('photos', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
    allowNull: false,
  },
  review_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING(300),
    allowNull: false,
  },
},
{
  sequelize,
  modelName: 'photos',
  indexes: [
    {
      unique: false,
      fields: ['review_id'],
    },
  ],
});

// Photos.sync({ alter: true });

module.exports = Photos;
