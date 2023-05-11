"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const typeorm_1 = require("typeorm");
const worker_1 = require("./entities/worker");
const coronaVaccine_1 = require("./entities/coronaVaccine");
async function connect() {
    try {
        await (0, typeorm_1.createConnection)({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "1234",
            database: "hospital_db",
            entities: [worker_1.Worker, coronaVaccine_1.CoronaVaccine],
            synchronize: true,
        });
        console.log("Connected to the database");
    }
    catch (error) {
        console.error("Database connection error", error);
    }
}
exports.connect = connect;
//# sourceMappingURL=db.js.map