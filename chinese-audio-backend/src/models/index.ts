"use strict";

import * as fs from "fs";
import * as path from "path";
import {Model, ModelStatic, Sequelize } from "sequelize";

const env = process.env.NODE_ENV || "development";
import config, { ConfigDBArgs } from "../config/database.js";


import { fileURLToPath } from "url";
import { User } from "./user.js";
const configDB = config[env] as ConfigDBArgs;

interface DB {
    User: ModelStatic<Model & User>;
    sequelize: Sequelize;
    [key: string]: ModelStatic<Model> | Sequelize;
}

const db: DB = {} as DB;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);


const sequelize = new Sequelize(configDB.database, configDB.username, configDB.password, {
    host: configDB.host,
    port: parseInt(configDB.port, 10),
    dialect: configDB.dialect,
    dialectOptions: configDB.dialectOptions,
});

// onlu use for check connection
// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log("Connection has been established successfully.");
//     } catch (error) {
//         console.error("Unable to connect to the database:", error);
//     }
// })();

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts" && file.indexOf(".test.js") === -1
        );
    })
    .forEach(async (file) => {
        const modelModule = await import(`file://${path.join(__dirname, file)}`);
        if (modelModule.default) {
            const model = modelModule.default(sequelize) as ModelStatic<Model>;
            db[model.name] = model;
            console.log(`Loaded model: ${model.name}`);
        }
        
    });

Object.keys(db).forEach((modelName) => {
    const model = db[modelName] as ModelStatic<Model> & { associate?: (db: DB) => void };
    if (model.associate) {
        model.associate(db);
    }
});

db.sequelize = sequelize;



export default db;
