"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/**
 * @file A parser for new medical entry
 * @author Roman Vasilyev
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = void 0;
const uuid_1 = require("uuid");
const types_1 = require("../types");
/*
 * Main parser
 */
const toNewEntry = (object) => {
    switch (object.type) {
        case "Hospital":
            return {
                id: uuid_1.v4(),
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
            const newEntry = {
                id: uuid_1.v4(),
                description: parseString(object.description),
                date: parseDate(object.date),
                specialist: parseString(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                type: 'OccupationalHealthcare',
                employerName: parseString(object.employerName)
            };
            if (object.sickLeave)
                newEntry.sickLeave = {
                    startDate: parseDate(object.sickLeave.startDate),
                    endDate: parseDate(object.sickLeave.endDate)
                };
            return newEntry;
        case "HealthCheck":
            return {
                id: uuid_1.v4(),
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
exports.toNewEntry = toNewEntry;
/*
 * Parameter parsers
 */
const parseString = (description) => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing name: ' + description);
    }
    return description;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing birth date: ' + date);
    }
    return date;
};
const parseDiagnosisCodes = (codes) => {
    if (!codes)
        return;
    if (!Array.isArray(codes) || !codes.every(isString)) {
        throw new Error('Incorrect or missing gender: ' + codes);
    }
    return codes;
};
const parseHealthCheckRating = (rating) => {
    if (!rating || !Object.keys(types_1.HealthCheckRating).includes(rating)) {
        throw new Error('Incorrect or missing occupation: ' + rating);
    }
    return rating;
};
/*
 * Type guards
 */
const isString = (param) => {
    return typeof param === 'string' || param instanceof String;
};
const isDate = (param) => {
    return Boolean(Date.parse(param));
};
