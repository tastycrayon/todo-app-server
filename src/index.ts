import express from "express";
import routes from "./start/routes";
import config from "./start/config";
import logger from "./start/logger";
import database from "./start/database";
import prod from "./start/prod";

const app = express();

logger(); // start error loogin
routes(app); // start routes
database(); // start database connection
prod(app);

const server = app.listen(config.PORT, () => {
  console.log(`Todo app listening at http://localhost:${config.PORT}`);
});

export default server;
