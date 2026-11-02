import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (!isNaN(height) && !isNaN(weight) && height > 0 && weight > 0) {
        res.json({
            "weight": weight,
            "height": height,
            "bmi": calculateBmi(height, weight)
        });
    } else {
        res.status(400).json({
            "error": "malformatted parameters"
        });
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    if ( daily_exercises === undefined || target === undefined) {
        return res.status(400).json({
            "error": "parameters missing"
        });
    }
    if (!Array.isArray(daily_exercises)) {
        return res.status(400).json({
            "error": "malformatted parameters"
        });
    }
    const numsArray = daily_exercises.map((num) => Number(num));
    const numTarget = Number(target);
    if(numsArray.some(isNaN) || isNaN(numTarget)) {
        return res.status(400).json({
            "error": "malformatted parameters"
        });
    }
    return res.json(calculateExercises(numsArray, numTarget));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});