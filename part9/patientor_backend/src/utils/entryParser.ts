/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/**
 * @file A parser for new medical entry
 * @author Roman Vasilyev
 */

import { v4 as uuidv4 } from 'uuid';

import { Entry, HealthCheckRating, Diagnose } from '../types';

/*
 * Main parser
 */
export const toNewEntry = (object: any): Entry | null => {
    switch (object.type) {
        case "Hospital":
            return {
                id: uuidv4(),
                description: parseString(object.description),
                date: parseDate(object.date),
                specialist: parseString(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                type: 'Hospital',
                discharge: {
                    date: parseDate(object.discharge.date),
                    criteria: parseString(object.discharge.criteria)
                  }
            };
        case "OccupationalHealthcare": 
            const newEntry: Entry = {
                id: uuidv4(),
                description: parseString(object.description),
                date: parseDate(object.date),
                specialist: parseString(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                type: 'OccupationalHealthcare',
                employerName: parseString(object.employerName)
            };

            if (object.sickLeave && object.sickLeave.startDate && object.sickLeave.endDate)
                newEntry.sickLeave = {
                    startDate: parseDate(object.sickLeave.startDate),
                    endDate: parseDate(object.sickLeave.endDate)
                };

            return newEntry;
        case "HealthCheck":
            return {
                id: uuidv4(),
                description: parseString(object.description),
                date: parseDate(object.date),
                specialist: parseString(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                type: 'HealthCheck',
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
        default:
            return null;
    }
};

/*
 * Parameter parsers
 */
const parseString = (description: any): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing string value: ' + description);
    }
    return description;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseDiagnosisCodes = (codes: any): Array<Diagnose['code']> | undefined => {
    if (!codes) return;

    if (!Array.isArray(codes) || !codes.every(isString)) {
        throw new Error('Incorrect or missing gender: ' + codes);
    }
    return codes;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
    if (rating === undefined || !isHealthCheckRating(rating)) {
        throw new Error('Incorrect or missing rating: ' + rating);
    }
    return rating;
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

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return typeof param.toString === 'function' && Object.values(HealthCheckRating).map(v => v.toString()).includes(param.toString());
};