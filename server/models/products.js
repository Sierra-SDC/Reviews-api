const Sequelize = require('sequelize');
const sequelize = require('../../util/database');
const db = require('../../util/database');
const Reviews = require('./reviews');
const Characteristics = require('./characteristics');

const Products = db.define('products', {
  product_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  slogan: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(600),
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  default_price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
},
{
  sequelize,
  modelName: 'products',
  indexes: [
    {
      unique: true,
      fields: ['product_id'],
    },
  ],
});

Products.hasMany(Reviews, {
  foreignKey: 'product_id',
  constraints: false,
});

Reviews.belongsTo(Products, {
  foreignKey: 'product_id',
  constraints: false,
});

Products.hasMany(Characteristics, {
  foreignKey: 'product_id',
  constraints: false,
});

Characteristics.belongsTo(Products, {
  foreignKey: 'product_id',
  constraints: false,
});

// Products.sync({ alter: true });

module.exports = Products;
