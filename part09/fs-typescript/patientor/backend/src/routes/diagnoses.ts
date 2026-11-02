import express, {type Response } from 'express';
import type { Diagnosis } from '../types.ts';
import diagnoseService from '../services/diagnoseService.ts';

const router = express.Router();

router.get('/', (_req, res:Response<Diagnosis[]>) => {
    res.send(diagnoseService.getDiagnoses());
});

router.get('/:id', (req, res: Response<Diagnosis>) => {
    const diagnose = diagnoseService.getDianosesByCode(req.params.id);
    if (diagnose) {
        res.send(diagnose);
    } else {
        res.sendStatus(404);
    }
});

export default router;