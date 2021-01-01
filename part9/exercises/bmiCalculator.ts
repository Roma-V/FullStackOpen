/**
 * @file BMI calculator
 * @author Roman Vasilyev
 */

import { calculateBmi } from './calculators'

interface BMIArguments {
    height: number,
    weight: number
}

const parseBMIArguments = (args: Array<string>): BMIArguments => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

const bmiArgs = parseBMIArguments(process.argv);

console.log(calculateBmi(bmiArgs.height, bmiArgs.weight))