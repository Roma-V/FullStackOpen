/**
 * @file A service handling diagnose data
 * @author Roman Vasilyev
 */

import diagnoseData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnoseData;

const getDiagnoses = (): Array<Diagnose>  => {
  return diagnoses;
};

const getDiagnosesShort = (): Omit<Diagnose, 'latin'>[]  => {
    return diagnoses.map(({ code, name }) => ({ code, name }));
};

const addDiagnose = () => {
  return null;
};

export default {
    getDiagnoses,
    getDiagnosesShort,
    addDiagnose
};