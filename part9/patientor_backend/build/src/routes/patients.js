"use strict";
/**
 * @file Express route for patients endpoint
 * @author Roman Vasilyev
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../servises/patientService"));
const entryParser_1 = require("../utils/entryParser");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getPatientShort());
});
router.get('/:id', (req, res) => {
    const foundPatient = patientService_1.default.getPatientById(req.params.id);
    if (foundPatient)
        res.send(foundPatient);
    else
        res.status(404).end();
});
router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const newPatient = patientService_1.default.addPatient(req.body);
        res.json(newPatient);
    }
    catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(error.message);
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const newEntry = entryParser_1.toNewEntry(req.body);
        if (!newEntry)
            throw Error('improperly formated entry');
        const added = patientService_1.default.addEntryToPatient(req.params.id, newEntry);
        if (!added)
            throw Error('Patient not found');
        res.json(newEntry);
    }
    catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(error.message);
    }
});
exports.default = router;
