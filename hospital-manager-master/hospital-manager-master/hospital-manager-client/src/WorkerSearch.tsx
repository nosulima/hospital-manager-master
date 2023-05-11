import React, { useState } from "react";
import { HospitalWorker } from "./types/worker";
import axios from "axios";

const WorkerSearch = () => {
  const [workerId, setWorkerId] = useState("");
  const [workerData, setWorkerData] = useState<HospitalWorker | null>(null);
  const [error, setError] = useState("");

  const handleSearchClick = () => {
    axios
      .get("http://localhost:4000/workers/" + workerId)
      .then((response) => {
        setWorkerData(response.data);
        setError("");
      })
      .catch((error) => {
        setError(`ERROR: ${JSON.parse(error.request.response).message}`);
      });
  };

  const handleWorkerIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkerId(event.target.value);
  };

  return (
    <div>
      <label htmlFor="searchworkerId">Worker ID:</label>
      <input type="text" id="searchworkerId" value={workerId} onChange={handleWorkerIdChange} />
      <button onClick={handleSearchClick}>Search</button>
      {error && <div className="error">{error}</div>}

      {workerData && (
        <div>
          <h5>ID: {workerData.id}</h5>
          <h5>First Name: {workerData.firstName}</h5>
          <h5>Last Name: {workerData.lastName}</h5>
          <h5>Address: {workerData.address}</h5>
          <h5>Birth Date: {workerData.birthDate}</h5>
          <h5>Phone Number: {workerData.phoneNumber}</h5>
          <h5>Cellphone Number: {workerData.cellphoneNumber}</h5>
          <br />
          <h3>Corona Vaccines for worker:</h3>
          <table>
            <thead>
              <tr>
                <th>Vaccine Date</th>
                <th>Producer</th>
                <th>Positive Test Date</th>
                <th>Recovery Date</th>
              </tr>
            </thead>
            <tbody>
              {workerData.coronaVaccines.map((coronaVaccine) => (
                <tr key={coronaVaccine.id}>
                  <td>{coronaVaccine.vaccineDate}</td>
                  <td>{coronaVaccine.vaccineProducer}</td>
                  <td>{coronaVaccine.positiveTestDate}</td>
                  <td>{coronaVaccine.recoveryDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WorkerSearch;
