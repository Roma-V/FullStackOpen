/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/**
 * @file A parser for new patient entry
 * @author Roman Vasilyev
 */

import { NewPatient, Gender, Entry } from '../types';

/*
 * Main parser
 */
export const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseBorn(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries)
    };
};

/*
 * Parameter parsers
 */
const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};

const parseBorn = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing birth date: ' + date);
    }
    return date;
};

const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing SSN: ' + ssn);
    }
    return ssn;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};

const parseEntries = (entries: any): Entry[] => {
    if (!entries)
        return [];
    if (!Array.isArray(entries) || !entries.every(isEntry)) {
        throw new Error('Incorrect or missing entries: ' + entries);
    }
    return entries;
};

/*
 * Type guards
 */
const isString = (param: any): param is string => {
    return typeof param === 'string' || param instanceof String;
};

const isDate = (param: string): boolean => {
    return Boolean(Date.parse(param));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isEntry = (param: any): param is Entry => {
    console.log(param);
    return true;
};