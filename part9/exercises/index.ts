/**
 * @file Express app that return BMI based on a query string
 * @author Roman Vasilyev
 */

import express from 'express';

import { calculateBmi, calculateExercises } from './calculators';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const heightParameter =  req?.query?.height || null;
    const weightParameter =  req?.query?.weight || null;

    let error = '';
    let BMIResults = {};

    if (!heightParameter || !weightParameter) {
        error = 'parameters missing';
    } else {
        const height = parseInt(heightParameter?.toString());
        const weight = parseInt(weightParameter?.toString());

        if (!isNaN(height) && !isNaN(weight)) {
            const bmi = calculateBmi(height, weight);
            BMIResults = {
                weight,
                height,
                bmi
            };
        } else {
            error = 'malformatted parameters';
        }
    }

    if (error)
        res.status(400).send( {error} );
    else
        res.send(BMIResults);
});

app.post('/exercise', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    let error = '';

    if (!daily_exercises)
        error = 'parameters missing';

    if (!target)
        error = 'parameters missing';
    
    if (!error &&
        (!Array.isArray(daily_exercises)
        || daily_exercises.some(element => isNaN(element))
        || isNaN(target)))
        error = 'malformatted parameters';
    
    if (error)
        res.status(400).send( {error} );
    else {
        const exercises = calculateExercises(target, daily_exercises);
        res.send(exercises);
    }        
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});