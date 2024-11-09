import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import app from "./app";

const port = parseInt(process.env.PORT || "3001");
const hostname = process.env.HOST || "localhost";

app.listen(port, hostname, () => {
    console.log(`Server is running in port ${port} http://${hostname}:${port}`);
});
