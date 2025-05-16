import { Dialect } from "sequelize";

import dotenv from "dotenv";
dotenv.config();

export const database = {
  dialect: (process.env.DB_DIALECT || 'mysql') as Dialect,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'chinese_audio',
  logging: process.env.DB_LOGGING === 'true',
  sync: process.env.DB_SYNC === 'true',
  syncAlter: process.env.DB_SYNC_ALTER === 'true',
  pool: {
    max: parseInt(process.env.DB_POOL_MAX || '20', 10),
    min: parseInt(process.env.DB_POOL_MIN || '0', 10),
    acquire: parseInt(process.env.DB_POOL_ACQUIRE || '30000', 10),
    idle: parseInt(process.env.DB_POOL_IDLE || '10000', 10),
  },
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: false,
    charset: 'utf8mb4',
    dialectOptions: {
      collate: 'utf8mb4_unicode_ci',
    },
  },
};


// export default database;

export default database;

exports.module = database;
