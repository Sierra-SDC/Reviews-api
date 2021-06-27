const Sequelize = require('sequelize');
const sequelize = require('../../util/database');
const db = require('../../util/database');

const CharacteristicReviews = db.define('characteristic_reviews', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
    allowNull: false,
  },
  characteristic_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  review_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  value: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
},
{
  sequelize,
  modelName: 'characteristic_reviews',
  indexes: [
    {
      unique: false,
      fields: ['characteristic_id', 'review_id'],
    },
  ],
});

// CharacteristicReviews.sync({ alter: true });

module.exports = CharacteristicReviews;
