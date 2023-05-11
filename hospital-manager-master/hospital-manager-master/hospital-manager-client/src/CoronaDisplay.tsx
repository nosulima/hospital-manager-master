import React, { useState, useEffect } from "react";
import axios from "axios";

interface CoronaVaccine {
  id: number;
  vaccineDate: string;
  vaccineProducer: string;
  positiveTestDate: string;
  recoveryDate: string;
  worker: {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    birthDate: string;
    phoneNumber: string;
    cellphoneNumber: string;
    coronaVaccines: [];
  };
}

const VaccinesDisplay: React.FC = () => {
  const [coronaVaccines, setCoronaVaccines] = useState<CoronaVaccine[]>([]);
  const [workerId, setWorkerId] = useState("");
  const [vaccineDate, setVaccineDate] = useState("");
  const [vaccineProducer, setVaccineProducer] = useState("");
  const [positiveTestDate, setPositiveTestDate] = useState("");
  const [recoveryDate, setRecoveryDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get<CoronaVaccine[]>("http://localhost:4000/corona-vaccines")
      .then((response: { data: React.SetStateAction<CoronaVaccine[]> }) => {
        setCoronaVaccines(response.data);
      })
      .catch((error: { message: React.SetStateAction<string> }) => {
        setErrorMessage(error.message);
      });
  }, []);

  const handleWorkerIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkerId(event.target.value);
  };

  const handleVaccineDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVaccineDate(event.target.value);
  };

  const handleVaccineProducerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVaccineProducer(event.target.value);
  };

  const handlePositiveTestDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPositiveTestDate(event.target.value);
  };

  const handleRecoveryDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecoveryDate(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post<CoronaVaccine>("http://localhost:4000/corona-vaccines", {
        workerId,
        vaccineDate,
        vaccineProducer,
        positiveTestDate: positiveTestDate === "" ? undefined : positiveTestDate,
        recoveryDate: recoveryDate === "" ? undefined : recoveryDate,
      })
      .then((response: { data: CoronaVaccine }) => {
        setCoronaVaccines([...coronaVaccines, response.data]);
        setWorkerId("");
        setVaccineDate("");
        setVaccineProducer("");
        setPositiveTestDate("");
        setRecoveryDate("");
        setErrorMessage("");
      })
      .catch((error: any) => {
        console.table(error);
        setErrorMessage(`ERROR: ${JSON.parse(error.request.response).message}`);
      });
  };

  return (
    <div>
      <h2>Corona Vaccines</h2>
      <table>
        <thead>
          <tr>
            <th>Worker</th>
            <th>Vaccine Date</th>
            <th>Producer</th>
            <th>Positive Test Date</th>
            <th>Recovery Date</th>
          </tr>
        </thead>
        <tbody>
          {coronaVaccines.map((coronaVaccine: CoronaVaccine) => (
            <tr key={coronaVaccine.id}>
              <td>{coronaVaccine.worker.id}</td>
              <td>{coronaVaccine.vaccineDate}</td>
              <td>{coronaVaccine.vaccineProducer}</td>
              <td>{coronaVaccine.positiveTestDate}</td>
              <td>{coronaVaccine.recoveryDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Add New Corona Vaccine</h3>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="worker-id">Worker ID:</label>
          <input type="text" id="worker-id" value={workerId} onChange={handleWorkerIdChange} />
        </div>
        <div>
          <label htmlFor="vaccine-date">Vaccine Date:</label>
          <input type="date" id="vaccine-date" value={vaccineDate} onChange={handleVaccineDateChange} />
        </div>
        <div>
          <label htmlFor="vaccine-producer">Vaccine Producer:</label>
          <input type="text" id="vaccine-producer" value={vaccineProducer} onChange={handleVaccineProducerChange} />
        </div>
        <div>
          <label htmlFor="positive-test-date">Positive Test Date:</label>
          <input type="date" id="positive-test-date" value={positiveTestDate} onChange={handlePositiveTestDateChange} />
        </div>
        <div>
          <label htmlFor="recovery-date">Recovery Date:</label>
          <input type="date" id="recovery-date" value={recoveryDate} onChange={handleRecoveryDateChange} />
        </div>
        <button type="submit">Add Vaccine</button>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default VaccinesDisplay;
