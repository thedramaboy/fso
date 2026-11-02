import { type CoursePart } from "../types"

interface PartProps {
    coursePart: CoursePart
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({coursePart}: PartProps) => {
    switch (coursePart.kind) {
        case "basic":
            // console.log(coursePart.name, coursePart.description, coursePart.exerciseCount);
            return (
                <div>
                    <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
                    <p>{coursePart.description}</p>
                </div>
            );
        case "group":
            // console.log(coursePart.name, coursePart.groupProjectCount);
            return (
                <div>
                    <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
                    <p>{coursePart.groupProjectCount}</p>
                </div>
            );
        case "background":
            // console.log(coursePart.name, coursePart.description, coursePart.exerciseCount, coursePart.backgroundMaterial);
            return (
                <div>
                    <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
                    <p>{coursePart.description}</p>
                    <p>{coursePart.backgroundMaterial}</p>
                </div>
            );
        case "special":
            // console.log(coursePart.name, coursePart.description, coursePart.exerciseCount, coursePart.backgroundMaterial);
            return (
                <div>
                    <h3>{coursePart.name}</h3>
                    <p>{coursePart.exerciseCount}</p>
                    <p>{coursePart.description}</p>
                    <p>{coursePart.requirements.join(", ")}</p>
                </div>
            );
        default:
            return assertNever(coursePart);
    }
};

export default Part;