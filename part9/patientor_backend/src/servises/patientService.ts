/**
 * @file A service handling patient data
 * @author Roman Vasilyev
 */

import { v4 as uuidv4 } from 'uuid'

import patientsData from '../../data/patients.json';
import { Patient } from '../types';
import { toNewPatient } from '../utils/patientParser'

const patients: Array<Patient> = patientsData.map(patient => {
    const result = toNewPatient(patient) as Patient
    result.id = patient.id
    return result
});

const getPatient = (): Array<Patient>  => {
    return patients;
};

const getPatientShort = (): Omit<Patient, 'ssn'>[]  => {
    return patients.map(({ 
        id, 
        name, 
        dateOfBirth, 
        gender, 
        occupation 
    }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const addPatient = (patient: any) => {
    const newPatient = {
        id: uuidv4(),
        ...toNewPatient(patient)
    } as Patient;

    patients.push(newPatient);

    return newPatient;
};

export default {
    getPatient,
    getPatientShort,
    addPatient
};