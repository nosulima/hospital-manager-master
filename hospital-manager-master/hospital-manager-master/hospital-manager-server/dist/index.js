"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const db_1 = require("./db");
const endpoints_1 = require("./endpoints");
const port = 4000;
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.get("/workers/:id", endpoints_1.getworker);
app.get("/workers", endpoints_1.getWorkers);
app.post("/workers", endpoints_1.createWorker);
app.get("/corona-vaccines", endpoints_1.getCoronaVaccines);
app.post("/corona-vaccines", endpoints_1.createCoronaVaccine);
(0, db_1.connect)().then(() => {
    app.listen(port, () => {
        console.log("Server started on http://localhost:" + port);
    });
});
//# sourceMappingURL=index.js.map