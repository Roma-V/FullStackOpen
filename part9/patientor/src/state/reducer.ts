// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { State } from "./state";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "patients/SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
    type: "patients/SET_PATIENT_DETAILS";
    payload: Patient;
  }
  | {
    type: "patients/ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "diagnoses/SET_LIST";
    payload: Diagnosis[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "patients/SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "patients/SET_PATIENT_DETAILS":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "patients/ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "diagnoses/SET_LIST":
      const newState = new Map<string, Diagnosis>(state.diagnoses);
      action.payload.map(diagnosis => {
        newState.set(diagnosis.code, diagnosis);
      });
      
      return {
        ...state,
        diagnoses: newState
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "patients/SET_PATIENT_LIST",
    payload: patients
  };
};

export const setPatientDetails = (patient: Patient): Action => {
  return {
    type: "patients/SET_PATIENT_DETAILS",
    payload: patient
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "patients/ADD_PATIENT",
    payload: patient
  };
};

export const setDiagnosesList = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "diagnoses/SET_LIST",
    payload: diagnoses
  };
};