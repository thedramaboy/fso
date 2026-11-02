import patients from '../../data/patients.ts';
import type { Patient, NonSensitivePatient, Entry, EntryWithoutId } from '../types.ts';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
    return patients;
};

const getNonSensitivePatient = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, 
        name, 
        dateOfBirth, 
        gender, 
        occupation
    }));
};

const findById = (id: string): Patient | undefined => {
    const entry = patients.find(patient => patient.id === id);
    return entry;
};

const addPatient = (patient: Omit<Patient, 'id' | 'entries'>): NonSensitivePatient => {
    const id = uuid();
    const newPatient: Patient = {
        ...patient, id: id, entries: []
    };
    patients.push(newPatient);
    const { name, dateOfBirth, gender, occupation } = newPatient;
    return ({ id, name, dateOfBirth, gender, occupation});
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry | undefined => {
    const patient = patients.find((p) => p.id === patientId);
    if(patient) {
        const newEntry: Entry = {
            ...entry, id: uuid()
        };
        patient.entries.push(newEntry);
        return newEntry;
    } else {
        return undefined;
    }

};

export default {
    getPatients,
    getNonSensitivePatient,
    findById,
    addPatient,
    addEntry
};