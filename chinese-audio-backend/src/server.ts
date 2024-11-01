import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import app from "./app.js";

const port = parseInt(process.env.PORT || '3001');
const hostname = process.env.HOST || "localhost";

app.set('port', port);
app.set('hostname', hostname);
app.listen(() => {
    console.log(
        `Server is running in port ${port} http://${hostname}:${port}`
    );
});
