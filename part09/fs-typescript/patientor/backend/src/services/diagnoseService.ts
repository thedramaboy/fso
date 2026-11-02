import diagnoses from '../../data/diagnoses.ts';
import type { Diagnosis } from '../types.ts';

const getDiagnoses = (): Diagnosis[] => {
    return diagnoses;
};

const getDianosesByCode = (code: string): Diagnosis | undefined => {
    const diagnose = diagnoses.find((diagnose) => diagnose.code === code);
    return diagnose;
};

export default {
    getDiagnoses,
    getDianosesByCode
};