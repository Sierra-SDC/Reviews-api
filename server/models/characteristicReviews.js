const Sequelize = require('sequelize');
const db = require('../../util/database');

const CharacteristicReviews = db.define('characteristic_reviews', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
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
});

module.exports = CharacteristicReviews;
