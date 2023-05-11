import { createConnection } from "typeorm";
import { Worker } from "./entities/worker";
import { CoronaVaccine } from "./entities/coronaVaccine";

export async function connect() {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "1234",
      database: "hospital_db",
      entities: [Worker, CoronaVaccine],
      synchronize: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error", error);
  }
}
