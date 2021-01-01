/**
 * @file TS module with functions used for computations
 * @author Roman Vasilyev
 */

type BMI = 'Very severely underweight' |
    'Severely underweight' |
    'Underweight' |
    'Normal (healthy weight)' |
    'Overweight' |
    'Obese Class I (Moderately obese)' |
    'Obese Class II (Severely obese)' |
    'Obese Class III (Very severely obese)' |
    undefined;

export const calculateBmi = (height: number, weight: number): BMI => {
    const bmi = weight / Math.pow(height/100, 2);

    switch (true) {
        case (bmi < 15):
            return 'Very severely underweight';
        case (bmi < 16):
            return 'Severely underweight';
        case (bmi < 18.5):
            return 'Underweight';
        case (bmi < 25):
            return 'Normal (healthy weight)';
        case (bmi < 30):
            return 'Overweight';
        case (bmi < 35):
            return 'Obese Class I (Moderately obese)';
        case (bmi < 40):
            return 'Obese Class II (Severely obese)';
        case (bmi >= 40):
            return 'Obese Class III (Very severely obese)';
    }

    return undefined;
};

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const ratingFromAverage = (average: number, target: number): [number, string] => {
    let rating = 1;
    let ratingDescription = '';
    switch (true) {
        case (average < target):
            ratingDescription = 'try harder';
            break;
        case (average >= target && average < 2*target):
            rating = 2;
            ratingDescription = 'not too bad but could be better';
            break;
        case (average >= 2*target):
            rating = 3;
            ratingDescription = 'great result';
            break;
    }

    return [rating, ratingDescription];
};

export const calculateExercises = (target: number, exerciseHours: Array<number>): Result => {
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.reduce(
        (accumulator, currentValue) => {
        return currentValue > 0 ? accumulator + 1 : accumulator;
    }, 0);
    const average = exerciseHours.reduce(
        (total, current) => total + current,
        0
        ) / exerciseHours.length;
    const [rating, ratingDescription] = ratingFromAverage(average, target);
    const success = average >= target;
    
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};
