export interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: Rating,
    ratingDescription: string,
    target: number,
    average: number
}

interface Data {
    hoursArr: number[],
    target: number
}

type Rating = 1 | 2 | 3;

const parseArgs = (args: string[]): Data => {
    if (args.length < 4) throw new Error("Need to provide arguments e.g. \"npm run calculateExercises ...\"");
    const parseArr = args.slice(2);
    const mapped = parseArr.map((arg) => Number(arg));
    const negativeNum = (num: number) => num < 0;
    if(mapped.some(isNaN) || mapped.some(negativeNum)) throw new Error("Some members in array are not a number or is negative.");
    const hoursArr = mapped.slice(1, mapped.length);
    const target = mapped[0];
    return { hoursArr, target };
};

export const calculateExercises = (hoursArr: number[], target: number): Result => {
    if (target === 0) throw new Error("Target can't be zero.");
    let rating: Rating;
    let ratingDescription: string;

    const periodLength = hoursArr.length;
    if (periodLength === 0) throw new Error("Number of days can't be zero");
    const trainingDays = hoursArr.filter((num) => num > 0).length;
    const totalHours = hoursArr.reduce((sum, num) => sum + num, 0);
    const average = totalHours / periodLength;
    const success = average >= target;
    const proportion = average / target;

    if (proportion >= 1) {
        rating = 3;
        ratingDescription = "great job, target reached";
    } else if (proportion >= 0.65 ) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    } else {
        rating = 1;
        ratingDescription = "far from the target, time to push harder";
    }

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

if (process.argv[1] === import.meta.filename) {
    try {
        const { hoursArr, target } = parseArgs(process.argv);
        console.log(calculateExercises(hoursArr, target));
        } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}