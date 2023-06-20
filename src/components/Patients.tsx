import Patient from "./Patient";
import { PatientsProps } from "./types";

const Patients: React.FC<PatientsProps> = ({ patients, setPatient, deletePatient }) => {
  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {patients && patients.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Patients List</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Control your {''}
            <span className="text-indigo-600 font-bold ">Patients and Dates</span>
          </p>

          {patients.map(patient => (
            <Patient 
              key={patient.id}
              patient={patient}
              setPatient={setPatient}
              deletePatient={deletePatient}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No patients</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Begin adding patients {''}
            <span className="text-indigo-600 font-bold ">and they will appear here</span>
          </p>
        </>
      )}
    </div>
  )
}

export default Patients;
