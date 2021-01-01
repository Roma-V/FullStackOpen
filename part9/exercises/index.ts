/**
 * @file Express app that return BMI based on a query string
 * @author Roman Vasilyev
 */

import express from 'express';

import { calculateBmi } from './calculators';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const heightParameter =  req?.query?.height || null;
    const weightParameter =  req?.query?.weight || null;

    if (heightParameter && weightParameter) {
        const height = parseInt(heightParameter?.toString());
        const weight = parseInt(weightParameter?.toString());
        
        if (!isNaN(height) && !isNaN(weight)) {
            const bmi = calculateBmi(height, weight)
            res.send({
                weight,
                height,
                bmi
            });
        } 
    } 
    res.send( {error: 'malformatted parameters'} )
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});