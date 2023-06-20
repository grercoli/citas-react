type SetPatient = React.Dispatch<React.SetStateAction<Patient>>

type SetPatients = React.Dispatch<React.SetStateAction<Patient[]>>

type DeletePatient = (id: string) => void;

export interface FormProps {
  patient: Patient;
  patients: Patient[];
  setPatient: SetPatient;
  setPatients: SetPatients;
}

export interface PatientProps {
  patient: Patient;
  setPatient: SetPatient;
  deletePatient: DeletePatient;
}

export interface PatientsProps {
  deletePatient: DeletePatient;
  setPatient: SetPatient;
  patients: Patient[];
}

export interface Patient {
  date: string;
  email: string;
  id: string;
  petName: string;
  ownerName: string;
  symptoms: string;
}
