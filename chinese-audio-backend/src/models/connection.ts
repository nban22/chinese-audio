"use strict";
import path from "path";
import { Sequelize } from "sequelize";
const env = process.env.NODE_ENV || "development";

const config = require(path.join(__dirname, "/../config/database.ts")).default[env];

const sequelize: Sequelize = new Sequelize(config.database, config.username, config.password, config);

module.exports = sequelize;

export default sequelize;
