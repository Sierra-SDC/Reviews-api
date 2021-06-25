const Sequelize = require('sequelize');
const db = require('../../util/database');

const Photos = db.define('photos', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  review_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING(300),
    allowNull: false,
  },
});

module.exports = Photos;
