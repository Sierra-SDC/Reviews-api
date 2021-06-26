const Sequelize = require('sequelize');
const sequelize = require('../../util/database');
const db = require('../../util/database');
const Photos = require('./photos');

const Reviews = db.define('reviews', {
  review_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  date: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  summary: {
    type: Sequelize.STRING(200),
    allowNull: true,
  },
  body: {
    type: Sequelize.STRING(500),
    allowNull: true,
  },
  recommend: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  reported: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  reviewer_name: {
    type: Sequelize.STRING(50),
    allowNull: true,
  },
  reviewer_email: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  response: {
    type: Sequelize.STRING(250),
    allowNull: true,
  },
  helpfulness: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
},
{
  sequelize,
  modelName: 'reviews',
  indexes: [
    {
      unique: false,
      fields: ['product_id'],
    },
  ],
});

Reviews.hasMany(Photos, {
  foreignKey: 'review_id',
  constraints: false,
});

Photos.belongsTo(Reviews, {
  foreignKey: 'review_id',
  constraints: false,
});

// Reviews.sync({ alter: true });

module.exports = Reviews;
