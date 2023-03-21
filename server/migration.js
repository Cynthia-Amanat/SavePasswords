import pool from "./database.js";
import * as migration from "mysql-migrations";

migration.init(pool, process.cwd() + "/migrations", () => {
  console.log("migrations created");
});
