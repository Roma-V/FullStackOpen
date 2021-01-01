type BMI = 'Very severely underweight' |
    'Severely underweight' |
    'Underweight' |
    'Normal (healthy weight)' |
    'Overweight' |
    'Obese Class I (Moderately obese)' |
    'Obese Class II (Severely obese)' |
    'Obese Class III (Very severely obese)'

interface BMIArguments {
    height: number,
    weight: number
}

const calculateBmi = (height: number, weight: number): BMI => {
    const bmi = weight / Math.pow(height/100, 2)

    switch (true) {
        case (bmi < 15):
            return 'Very severely underweight'
        case (bmi < 16):
            return 'Severely underweight'
        case (bmi < 18.5):
            return 'Underweight'
        case (bmi < 25):
            return 'Normal (healthy weight)'
        case (bmi < 30):
            return 'Overweight'
        case (bmi < 35):
            return 'Obese Class I (Moderately obese)'
        case (bmi < 40):
            return 'Obese Class II (Severely obese)'
        case (bmi >= 40):
            return 'Obese Class III (Very severely obese)'
    }
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