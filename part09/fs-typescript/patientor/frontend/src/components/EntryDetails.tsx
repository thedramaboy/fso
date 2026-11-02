import type { Entry } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
        case "HealthCheck":
            return (<p>Health rating: {entry.healthCheckRating}</p>);
        case "Hospital":
            return (
                <div>
                    <p>Discharge date: {entry.discharge.date}</p>
                    <p>Criteria: {entry.discharge.criteria}</p>
                </div>
            );
        case "OccupationalHealthcare":
            return (
                <div>
                    <p>Employer name: {entry.employerName}</p>
                    <p>Sick leave: {entry.sickLeave ? `${entry.sickLeave.startDate} - ${entry.sickLeave.endDate}` : "None"}</p>
                </div>
            );
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;