require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  username: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  dialectOptions: { timezone: 'America/Sao_Paulo' },
  timezone: 'America/Sao_Paulo',

};
