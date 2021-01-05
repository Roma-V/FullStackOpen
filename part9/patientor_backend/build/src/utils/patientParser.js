"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/**
 * @file A parser for new patient entry
 * @author Roman Vasilyev
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = void 0;
const types_1 = require("../types");
/*
 * Main parser
 */
const toNewPatient = (object) => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseBorn(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries)
    };
};
exports.toNewPatient = toNewPatient;
/*
 * Parameter parsers
 */
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};
const parseBorn = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing birth date: ' + date);
    }
    return date;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing SSN: ' + ssn);
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};
const parseEntries = (entries) => {
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
const isString = (param) => {
    return typeof param === 'string' || param instanceof String;
};
const isDate = (param) => {
    return Boolean(Date.parse(param));
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const isEntry = (param) => {
    console.log(param);
    return true;
};
