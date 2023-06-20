// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState, useEffect } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import Patients from "./components/Patients";
import { Patient } from "./components/types";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient>({
    id: '',
    petName: '',
    ownerName: '',
    email: '',
    date: '',
    symptoms: ''
  });

  useEffect(() => {
    const getPatientsInLocalStorage = () => {
      const lsPatients = JSON.parse(localStorage.getItem('patients')) ?? [];
      setPatients(lsPatients);
    }
    getPatientsInLocalStorage();
  }, []);

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  const deletePatient = (id: string) => {
    const updatedPatients = patients.filter(patient => patient.id !== id);
    setPatients(updatedPatients);
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Form
          patient={patient}
          patients={patients}
          setPatient={setPatient}
          setPatients={setPatients}
        />
        <Patients
          deletePatient={deletePatient}
          patients={patients}
          setPatient={setPatient}
        />
      </div>
    </div>
  )
}

export default App;
