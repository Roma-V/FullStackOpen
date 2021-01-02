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

router.post('/', (req, res) => {
  try {
    const newPatient = req.body;
    const result = patientServise.addPatient(newPatient);
    res.json(result);
  } catch(error) {
    res.status(400).send(error.message);
  }
});

export default router;