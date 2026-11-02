import express, { type Response} from "express";
import type { NonSensitivePatient, Patient } from "../types.ts";
import patientService from "../services/patientService.ts";
import {parseNewPatient, newEntrySchema} from "../utils.ts";
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res:Response<NonSensitivePatient[]>) => {
    res.send(patientService.getNonSensitivePatient());
});

router.get('/:id', (req, res:Response<Patient>) => {
    const patient = patientService.findById((req.params.id));

    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    try {
        const newPatient = parseNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {      
            res.status(400).send({ error: error.issues });    
        } else {      
            res.status(400).send({ error: 'unknown error' });    
        }  
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = newEntrySchema.parse(req.body);
        const id = req.params.id;
        res.json(patientService.addEntry(id, newEntry));
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {      
            res.status(400).send({ error: error.issues });    
        } else {      
            res.status(400).send({ error: 'unknown error' });    
        }  
    }
});

export default router;