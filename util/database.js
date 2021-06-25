const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'reviews',
  'postgres',
  'postgres',
  {
    host: process.env.PGHOST,
    dialect: 'postgres',
    define: {
      timestamps: false,
    },
  },
);

sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('Failed', err));

module.exports = sequelize;
