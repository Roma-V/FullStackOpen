/**
 * @file Express route for diagnoses endpoint
 * @author Roman Vasilyev
 */

import express from 'express';

import diagnoseServise from '../servises/diagnoseServise';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseServise.getDiagnosesShort());
});

router.post('/', (_req, res) => {
  const result = diagnoseServise.addDiagnose();
  res.send(result);
});

export default router;