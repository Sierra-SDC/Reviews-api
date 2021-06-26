const Sequelize = require('sequelize');
const sequelize = require('../../util/database');
const db = require('../../util/database');
const CharacteristicReviews = require('./characteristicReviews');

const Characteristics = db.define('characteristics', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
},
{
  sequelize,
  modelName: 'characteristics',
  indexes: [
    {
      unique: false,
      fields: ['product_id'],
    },
  ],
});

Characteristics.hasMany(CharacteristicReviews, {
  foreignKey: 'characteristic_id',
  constraints: false,
});

CharacteristicReviews.belongsTo(Characteristics, {
  foreignKey: 'characteristic_id',
  constraints: false,
});

// Characteristics.sync({ alter: true });

module.exports = Characteristics;
