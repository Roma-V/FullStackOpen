/**
 * @file Express route for patients endpoint
 * @author Roman Vasilyev
 */

import express from 'express';
import patientService from '../servises/patientService';

import { toNewEntry } from '../utils/entryParser';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientShort());
});

router.get('/:id', (req, res) => {
  const foundPatient = patientService.getPatientById(req.params.id );
  
  if (foundPatient)
    res.send(foundPatient);
  else
    res.status(404).end();
});

router.post('/', (req, res) => {
  console.log('new patient posted', req.body);
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatient = patientService.addPatient(req.body);
    res.json(newPatient);
  } catch(error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(error.message);
  }
});

router.post('/:id/entries', (req, res) => {
  console.log('new entry posted', req.body);
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newEntry = toNewEntry(req.body);
    if (!newEntry) throw Error('improperly formated entry');

    const added = patientService.addEntryToPatient(req.params.id, newEntry);
    if (!added) throw Error('Patient not found');

    res.json(newEntry);
  } catch(error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(error.message);
  }
});

export default router;