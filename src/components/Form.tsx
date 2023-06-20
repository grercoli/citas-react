import { useState, useEffect } from "react";
import { FormProps } from "./types";
import Error from './Error';

const Form: React.FC<FormProps> = ({ patients, setPatients, patient, setPatient }) => {
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [petName, setPetName] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if(Object.keys(patient).length > 0) {
      setPetName(patient.petName);
      setOwnerName(patient.ownerName);
      setEmail(patient.email);
      setDate(patient.date);
      setSymptoms(patient.symptoms);
    }
  }, [patient]);

  const generateId = () => {
    const random = Math.random().toString(36).substr(2);
    const date = Date.now().toString(36);

    return random + date;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Form Validation
    if([petName, ownerName, email, date, symptoms].includes('')) {
      console.log('There is at least one error');

      setError(true);
      return;
    } 
    
    setError(false);

    // New Patient Data
    const newPatientData = {
      id: '',
      petName, 
      ownerName, 
      email, 
      date, 
      symptoms
    };

    if(patient.id) {
      // Editando el Registro
      newPatientData.id = patient.id;
      const updatedPatients = patients.map(pat => pat.id === patient.id ? newPatientData : pat);

      setPatients(updatedPatients);
      setPatient({
        id: '',
        petName: '',
        ownerName: '',
        email: '',
        date: '',
        symptoms: ''
      });
    } else {
      // Nuevo registro
      newPatientData.id = generateId();
      setPatients([...patients, newPatientData]);
    }

    // Reiniciar el form
    setPetName('');
    setOwnerName('');
    setEmail('');
    setDate('');
    setSymptoms('');
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Patients Track</h2>

      <p className="text-lg mt-5 text-center mb-10">Add Patients and <span className="text-indigo-600 font-bold">Manage Them</span></p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        {error && <Error><p>Every field is required</p></Error>}
        <div className="mb-5">
          <label htmlFor="pet" className="block text-gray-700 uppercase font-bold">
            Pet Name
          </label>
          <input
            id="pet"
            type="text"
            placeholder="Name of the pet"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />  
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
            Owner Name
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />  
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Owner Email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />  
        </div>

        <div className="mb-5">
          <label htmlFor="startDate" className="block text-gray-700 uppercase font-bold">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />  
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="block text-gray-700 uppercase font-bold">
            Symptoms
          </label>
          <textarea 
            id="symptoms"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe the symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={ patient.id ? 'Edit Patient' : 'Add Patient' }
        />
      </form>
    </div>
  );
}

export default Form;