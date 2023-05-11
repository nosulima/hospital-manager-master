import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Worker } from "./entities/worker";
import { CoronaVaccine } from "./entities/coronaVaccine";

export async function getworker(req: Request, res: Response) {
  const { id } = req.params;
  const workerRepository = getRepository(Worker);
  const worker = await workerRepository.findOne({ relations: { coronaVaccines: true }, where: { id } });
  if (!worker) {
    res.status(400).json({
      message: "Worker not found",
    });
    return;
  }
  res.json(worker);
}

export async function getWorkers(req: Request, res: Response) {
  const workerRepository = getRepository(Worker);
  const workers = await workerRepository.find();
  res.json(workers);
}

export async function createWorker(req: Request, res: Response) {
  const workerRepository = getRepository(Worker);
  const { id, firstName, lastName, address, birthDate, phoneNumber, cellphoneNumber } = req.body;

  const worker = new Worker();
  worker.id = id;
  worker.firstName = firstName;
  worker.lastName = lastName;
  worker.address = address;
  worker.birthDate = birthDate;
  worker.phoneNumber = phoneNumber;
  worker.cellphoneNumber = cellphoneNumber;

  try {
    await workerRepository.save(worker);
    res.json(worker);
  } catch (error) {
    res.status(400).json({
      message: "Invalid Input",
    });
  }
}

export async function getCoronaVaccines(req: Request, res: Response) {
  const coronaVaccineRepository = getRepository(CoronaVaccine);
  const coronaVaccines = await coronaVaccineRepository.find({ relations: ["worker"] });
  res.json(coronaVaccines);
}

export async function createCoronaVaccine(req: Request, res: Response) {
  const workerRepository = getRepository(Worker);
  const coronaVaccineRepository = getRepository(CoronaVaccine);
  const { workerId, vaccineDate, vaccineProducer, positiveTestDate, recoveryDate } = req.body;
  const worker = await workerRepository.findOne({ relations: { coronaVaccines: true }, where: { id: workerId } });
  if (!worker) {
    res.status(400).json({
      message: "Worker not found",
    });
    return;
  }

  if (worker.coronaVaccines.length >= 4) {
    res.status(400).json({
      message: "Maximum number of four corona vaccines per worker",
    });
    return;
  }
  const coronaVaccine = new CoronaVaccine();
  coronaVaccine.worker = worker;
  coronaVaccine.vaccineDate = vaccineDate;
  coronaVaccine.vaccineProducer = vaccineProducer;
  coronaVaccine.positiveTestDate = positiveTestDate;
  coronaVaccine.recoveryDate = recoveryDate;
  try {
    await coronaVaccineRepository.save(coronaVaccine);
    res.json(coronaVaccine);
  } catch (error) {
    res.status(400).json({
      message: "Invalid Input",
    });
  }
}
