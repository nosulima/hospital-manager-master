import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { HospitalWorker } from "./types/worker";

const WorkersDisplay = () => {
  const [workers, setWorkers] = useState<HospitalWorker[]>([]);
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cellphoneNumber, setCellphoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/workers")
      .then((response) => {
        setWorkers(response.data);
      })
      .catch((error) => {
        setErrorMessage(`ERROR: ${JSON.parse(error.request.response).message}`);
      });
  }, []);

  const handleFormSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const newWorker = {
      id,
      firstName,
      lastName,
      address,
      birthDate,
      phoneNumber: phoneNumber === "" ? undefined : phoneNumber,
      cellphoneNumber: cellphoneNumber === "" ? undefined : cellphoneNumber,
    };

    axios
      .post("http://localhost:4000/workers", newWorker)
      .then((response) => {
        setWorkers([...workers, response.data]);
        setFirstName("");
        setId("");
        setLastName("");
        setAddress("");
        setBirthDate("");
        setPhoneNumber("");
        setCellphoneNumber("");
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage(`ERROR: ${JSON.parse(error.request.response).message}`);
      });
  };

  const handleWorkerIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleBirthDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBirthDate(event.target.value);
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleCellPhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCellphoneNumber(event.target.value);
  };

  return (
    <div>
      <h2>Workers</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Birth Date</th>
            <th>Phone Number</th>
            <th>Cell Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => (
            <tr key={worker.id}>
              <td>{worker.id}</td>
              <td>{worker.firstName}</td>
              <td>{worker.lastName}</td>
              <td>{worker.address}</td>
              <td>{worker.birthDate}</td>
              <td>{worker.phoneNumber}</td>
              <td>{worker.cellphoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Add New Worker</h3>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="id">Worker ID:</label>
          <input type="text" id="id" value={id} onChange={handleWorkerIdChange} />
        </div>
        <div>
          <label htmlFor="first-name">First Name:</label>
          <input type="text" id="first-name" value={firstName} onChange={handleFirstNameChange} />
        </div>
        <div>
          <label htmlFor="last-name">Last Name:</label>
          <input type="text" id="last-name" value={lastName} onChange={handleLastNameChange} />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" value={address} onChange={handleAddressChange} />
        </div>
        <div>
          <label htmlFor="birth-date">Birth Date:</label>
          <input type="date" id="birth-date" value={birthDate} onChange={handleBirthDateChange} />
        </div>
        <div>
          <label htmlFor="phone-number">Phone Number:</label>
          <input type="text" id="phone-number" value={phoneNumber} onChange={handlePhoneNumberChange} />
        </div>
        <div>
          <label htmlFor="cell-phone-number">Cell Phone Number:</label>
          <input type="text" id="cell-phone-number" value={cellphoneNumber} onChange={handleCellPhoneNumberChange} />
        </div>
        <button type="submit">Add Worker</button>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default WorkersDisplay;
