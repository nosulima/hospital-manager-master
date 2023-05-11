import { Entity, Column, OneToMany, PrimaryColumn } from "typeorm";
import { CoronaVaccine } from "./coronaVaccine";

@Entity()
export class Worker {
  @PrimaryColumn({nullable:false})
  id!: string;

  @Column({nullable:false})
  firstName: string;

  @Column({nullable:false})
  lastName: string;

  @Column({nullable:false})
  address: string;

  @Column({ type: "date" , nullable:false})
  birthDate: string;

  @Column({nullable:false})
  phoneNumber: string;

  @Column({nullable:false})
  cellphoneNumber: string;

  @OneToMany(() => CoronaVaccine, (coronaVaccine) => coronaVaccine.worker)
  coronaVaccines: CoronaVaccine[];
}
