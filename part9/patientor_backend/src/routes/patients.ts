/**
 * @file Express route for patients endpoint
 * @author Roman Vasilyev
 */

import express from 'express';

import patientServise from '../servises/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientServise.getPatientShort());
});

router.get('/:id', (req, res) => {
  const foundPatient = patientServise.getPatientById(req.params.id );
  
  if (foundPatient)
    res.send(foundPatient);
  else
    res.status(404).end();
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatient = req.body;
    const result = patientServise.addPatient(newPatient);
    res.json(result);
  } catch(error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(error.message);
  }
});

export default router;