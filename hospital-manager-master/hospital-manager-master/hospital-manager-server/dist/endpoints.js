"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCoronaVaccine = exports.getCoronaVaccines = exports.createWorker = exports.getWorkers = exports.getworker = void 0;
const typeorm_1 = require("typeorm");
const worker_1 = require("./entities/worker");
const coronaVaccine_1 = require("./entities/coronaVaccine");
async function getworker(req, res) {
    const { id } = req.params;
    const workerRepository = (0, typeorm_1.getRepository)(worker_1.Worker);
    const worker = await workerRepository.findOne({ relations: { coronaVaccines: true }, where: { id } });
    if (!worker) {
        res.status(400).json({
            message: "Worker not found",
        });
        return;
    }
    res.json(worker);
}
exports.getworker = getworker;
async function getWorkers(req, res) {
    const workerRepository = (0, typeorm_1.getRepository)(worker_1.Worker);
    const workers = await workerRepository.find();
    res.json(workers);
}
exports.getWorkers = getWorkers;
async function createWorker(req, res) {
    const workerRepository = (0, typeorm_1.getRepository)(worker_1.Worker);
    const { id, firstName, lastName, address, birthDate, phoneNumber, cellphoneNumber } = req.body;
    const worker = new worker_1.Worker();
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
    }
    catch (error) {
        res.status(400).json({
            message: "Invalid Input",
        });
    }
}
exports.createWorker = createWorker;
async function getCoronaVaccines(req, res) {
    const coronaVaccineRepository = (0, typeorm_1.getRepository)(coronaVaccine_1.CoronaVaccine);
    const coronaVaccines = await coronaVaccineRepository.find({ relations: ["worker"] });
    res.json(coronaVaccines);
}
exports.getCoronaVaccines = getCoronaVaccines;
async function createCoronaVaccine(req, res) {
    const workerRepository = (0, typeorm_1.getRepository)(worker_1.Worker);
    const coronaVaccineRepository = (0, typeorm_1.getRepository)(coronaVaccine_1.CoronaVaccine);
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
    const coronaVaccine = new coronaVaccine_1.CoronaVaccine();
    coronaVaccine.worker = worker;
    coronaVaccine.vaccineDate = vaccineDate;
    coronaVaccine.vaccineProducer = vaccineProducer;
    coronaVaccine.positiveTestDate = positiveTestDate;
    coronaVaccine.recoveryDate = recoveryDate;
    try {
        await coronaVaccineRepository.save(coronaVaccine);
        res.json(coronaVaccine);
    }
    catch (error) {
        res.status(400).json({
            message: "Invalid Input",
        });
    }
}
exports.createCoronaVaccine = createCoronaVaccine;
//# sourceMappingURL=endpoints.js.map