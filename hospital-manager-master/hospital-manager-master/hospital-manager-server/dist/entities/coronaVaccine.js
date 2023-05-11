"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoronaVaccine = void 0;
const typeorm_1 = require("typeorm");
const worker_1 = require("./worker");
let CoronaVaccine = class CoronaVaccine {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CoronaVaccine.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", String)
], CoronaVaccine.prototype, "vaccineDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CoronaVaccine.prototype, "vaccineProducer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "date" }),
    __metadata("design:type", String)
], CoronaVaccine.prototype, "positiveTestDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "date" }),
    __metadata("design:type", String)
], CoronaVaccine.prototype, "recoveryDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => worker_1.Worker, (worker) => worker.coronaVaccines),
    __metadata("design:type", worker_1.Worker)
], CoronaVaccine.prototype, "worker", void 0);
CoronaVaccine = __decorate([
    (0, typeorm_1.Entity)()
], CoronaVaccine);
exports.CoronaVaccine = CoronaVaccine;
//# sourceMappingURL=coronaVaccine.js.map