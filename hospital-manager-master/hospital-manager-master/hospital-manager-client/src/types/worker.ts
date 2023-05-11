export interface HospitalWorker {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  birthDate: string;
  phoneNumber: string;
  cellphoneNumber: string;
  coronaVaccines: coronaVaccines[];
}

interface coronaVaccines {
  id: number;
  vaccineDate: string;
  vaccineProducer: string;
  positiveTestDate: string;
  recoveryDate: string;
}
