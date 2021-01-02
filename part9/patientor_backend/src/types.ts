/**
 * @file Types used thoughout the app
 * @author Roman Vasilyev
 */

export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
}

export enum Gender {
    Male = 'male',
    Female = 'female'
}

export type NewPatient = Omit<Patient, "id">;