import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Worker } from "./worker";

@Entity()
export class CoronaVaccine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  vaccineDate: string;

  @Column()
  vaccineProducer: string;

  @Column({ nullable: true, type: "date" })
  positiveTestDate: string;

  @Column({ nullable: true, type: "date" })
  recoveryDate: string;

  @ManyToOne(() => Worker, (worker) => worker.coronaVaccines)
  worker: Worker;
}
