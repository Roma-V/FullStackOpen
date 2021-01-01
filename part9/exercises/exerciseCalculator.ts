interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
};

interface ExerciseArguments {
    target: number,
    exerciseHours: Array<number>
};

const ratingFromAverage = (average: number): [number, string] => {
    let rating = 1;
    let ratingDescription = '';
    switch (true) {
        case (average < 1):
            ratingDescription = 'try harder';
            break;
        case (average >= 1 && average < 2):
            rating = 2;
            ratingDescription = 'not too bad but could be better';
            break;
        case (average >= 2):
            rating = 3;
            ratingDescription = 'great result';
            break;
    }

    return [rating, ratingDescription]
};

const calculateExercises = (target: number, exerciseHours: Array<number>) => {
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.reduce(
        (accumulator, currentValue) => {
        return currentValue > 0 ? accumulator + 1 : accumulator;
    }, 0);
    const average = exerciseHours.reduce(
        (total, current) => total + current,
        0
        ) / exerciseHours.length;
    const [rating, ratingDescription] = ratingFromAverage(average);
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