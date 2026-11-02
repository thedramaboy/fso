// type Operation = 'multiply' | 'add' | 'divide';

// const calculator = (a: number, b: number, op: Operation) : number => {
//   switch(op) {
//     case 'multiply':
//       return a * b;
//     case 'divide':
//       if (b === 0) throw new Error('Can\'t divide by 0!');
//       return a / b;
//     case 'add':
//       return a + b;
//     default:
//       throw new Error('Operation is not multiply, add or divide!');
//   }
// }

// try {
//   console.log(calculator(1, 5 , 'divide'));
// } catch (error: unknown) {
//   let errorMessage = 'Something went wrong: '
//   // here we can not use error.message
//   if (error instanceof Error) {    
//    // the type is narrowed and we can refer to error.message   
//     errorMessage += error.message;  
// }
//   // here we can not use error.message

//   console.log(errorMessage);
// }

// const multiplicator = (a: number, b: number, printText: string) => {
//   console.log(printText,  a * b);
// }

// // command line arguments start from process.argv[2]
// const a: number = Number(process.argv[2])
// const b: number = Number(process.argv[3])

// multiplicator(a, b, `Multiplied ${a} and ${b}, the result is:`);

interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText,  a * b);
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  multiplicator(value1, value2, `Multiplied ${value1} and ${value2}, the result is:`);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}