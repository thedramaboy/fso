// const parseNewDiaryEntry = (object: unknown): NewDiaryEntry => {
//     console.log(object); // now object is no longer unused
//     const newEntry: NewDiaryEntry = {
//         weather: 'cloudy', // fake the return value
//         visibility: 'great',
//         date: '2026-1-1',
//         comment: 'fake news'
//     };
//     return newEntry;
// };

// export const parseNewDiaryEntry = (object: unknown): NewDiaryEntry => {
//   return NewEntrySchema.parse(object);
// };

// const parseNewDiaryEntry = (object: unknown): NewDiaryEntry => {
//   if ( !object || typeof object !== 'object' ) {
//     throw new Error('Incorrect or missing data');
//   }

//   if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object)  {
//     const newEntry: NewDiaryEntry = {
//         // weather: parseWeather(object.weather),
//         // visibility: parseVisibility(object.visibility),
//         // date: parseDate(object.date),
//         weather: z.enum(Weather).parse(object.weather),
//         visibility: z.enum(Visibility).parse(object.visibility),
//         date: z.iso.date().parse(object.date),
//         comment: z.string().parse(object.comment)
//     };

//     return newEntry;
//   }

//   throw new Error('Incorrect data: some fields are missing');
// };

// const isString = (text: unknown): text is string => {
//     return typeof text === 'string' || text instanceof String;
// };

// const isDate = (date: string): boolean => {
//     return Boolean(Date.parse(date));
// };

// const isWeather = (param: string): param is Weather => {
//     return (Object.values(Weather) as string[]).includes(param);
// };

// const isVisibility = (param: string): param is Visibility => {
//     return (Object.values(Visibility) as string[]).includes(param);
// };

// const parseDate = (date: unknown): string => {
//     if (!date || !isString(date) || !isDate(date)) {
//         throw new Error('Inccorect or missing date: ' + date);
//     }
//     return date;
// };

// const parseComment = (comment: unknown): string => {
//   if (!comment || !isString(comment)) {
//     throw new Error('Incorrect or missing comment');
//   }
//   return comment;
// };

// const parseComment = (comment: unknown): string => {
//     return z.string().parse(comment);
// };

// const parseWeather = (weather: unknown): Weather => {
//     if (!weather || !isString(weather) || !isWeather(weather)) {
//         throw new Error('Incorrect or missing weather: ' + weather);
//     }
//     return weather;
// };

// const parseVisibility = (visibility: unknown): Visibility => {
//     if (!isString(visibility) || !isVisibility(visibility)) {
//         throw new Error('Incorrect or missing visibility: ' + visibility); 
//     }
//     return visibility;
// };

// export default parseNewDiaryEntry;