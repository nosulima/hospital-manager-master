import * as express from "express";
import * as cors from "cors";
import { connect } from "./db";
import { getWorkers, createWorker, getCoronaVaccines, createCoronaVaccine, getworker } from "./endpoints";

const port = 4000;

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/workers/:id", getworker);
app.get("/workers", getWorkers);
app.post("/workers", createWorker);

app.get("/corona-vaccines", getCoronaVaccines);
app.post("/corona-vaccines", createCoronaVaccine);

connect().then(() => {
  app.listen(port, () => {
    console.log("Server started on http://localhost:" + port);
  });
});
