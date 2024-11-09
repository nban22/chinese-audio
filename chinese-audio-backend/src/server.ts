import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import "./models";

import app from "./app";
import sequelizeConnection from "./models/connection";

const port = parseInt(process.env.PORT || "3001");
const hostname = process.env.HOST || "localhost";



sequelizeConnection.sync().then(() => {
    const modelCount = Object.keys(sequelizeConnection.models).length;
    console.log(`Number of models synced: ${modelCount}`);
    console.log(sequelizeConnection.models);
    
}).catch((error) => {
    console.error("Error syncing models:", error);
});

app.listen(port, hostname, () => {
    console.log(`Server is running in port ${port} http://${hostname}:${port}`);
});
