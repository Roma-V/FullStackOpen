/**
 * @file Exercise efficiency calculator
 * @author Roman Vasilyev
 */

import { calculateExercises } from './calculators'

interface ExerciseArguments {
    target: number,
    exerciseHours: Array<number>
};

const parseExcerciseArguments = (args: Array<string>): ExerciseArguments => {
    if (args.length < 4) throw new Error('Not enough arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        const exerciseHours = []
        for (let i = 3; i < args.length; i++) {
            if (!isNaN(Number(args[i]))) {
                exerciseHours.push(Number(args[i]))
            } else {
                throw new Error('Provided values were not numbers!');
            }
        }
        return {
            target: Number(args[2]),
            exerciseHours
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const eserciseArgs = parseExcerciseArguments(process.argv)

console.log(calculateExercises(eserciseArgs.target, eserciseArgs.exerciseHours));