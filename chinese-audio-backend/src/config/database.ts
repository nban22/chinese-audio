import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { Dialect } from "sequelize";

export interface ConfigDBArgs {
    username: string;
    password: string;
    database: string;
    host: string;
    port: string;
    dialect: Dialect;
    dialectOptions?: any;
}


const config: {[key: string]: ConfigDBArgs} = {
    development: {
        username: process.env.MYSQL_USERNAME || "root",
        password: process.env.MYSQL_PASSWORD || "",
        database: process.env.MYSQL_DATABASE || "my_database",
        host: process.env.MYSQL_HOST || "localhost",
        port: process.env.MYSQL_PORT || "3306",
        dialect: "mysql",
    },
    production: {
        username: process.env.MYSQL_USERNAME || "root",
        password: process.env.MYSQL_PASSWORD || "",
        database: process.env.MYSQL_DATABASE || "express_mysql",
        host: process.env.MYSQL_HOST || "",
        port: process.env.MYSQL_PORT || "3306",
        dialect: "mysql",
        // dialectOptions: {
        //     bigNumberStrings: true,
        //     ssl: {
        //         ca: fs.readFileSync(__dirname + "/mysql-ca-main.crt"),
        //     },
        // },
    }
};

console.log("Database Config:", config);

export default config;