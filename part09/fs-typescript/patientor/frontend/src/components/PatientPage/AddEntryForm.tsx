import { useState, SyntheticEvent } from "react";
import { TextField, Alert, Select, MenuItem, InputLabel, FormControl, type SelectChangeEvent } from "@mui/material";
import { type EntryWithoutId, type Entry, type Diagnosis, HealthCheckRating } from "../../types";
type EntryType = Entry['type'];

interface AddEntryFormProps {
    onSubmit: (values: EntryWithoutId) => void;
    error: string;
    diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const AddEntryForm = ({ onSubmit, error, diagnoses }: AddEntryFormProps) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStart, setSickLeaveStart] = useState('');
    const [sickLeaveEnd, setSickLeaveEnd] = useState('');

    const handleCodesChange = (event: SelectChangeEvent<string[]>) => {
        const { value } = event.target;
        setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
    };

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        const base = {
            description,
            date,
            specialist,
            diagnosisCodes: diagnosisCodes.length === 0 ? undefined : diagnosisCodes
        };

        switch (entryType) {
            case "HealthCheck":
                onSubmit({ ...base, type: "HealthCheck", healthCheckRating });
                return;
            case "Hospital":
                onSubmit({ ...base, type: "Hospital",
                    discharge: { date: dischargeDate, criteria: dischargeCriteria } });
                return;
            case "OccupationalHealthcare":
                onSubmit({ ...base, type: "OccupationalHealthcare", employerName,
                    sickLeave: sickLeaveStart && sickLeaveEnd
                        ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
                        : undefined });
                return;
            default:
                return assertNever(entryType);
        }
    };

    return (
        <div>
            
            {error && <Alert severity="error">{error}</Alert>}
            <h4>New entry</h4>
            <FormControl>
                <Select value={entryType} label="Entry type">
                    <MenuItem value="HealthCheck" onClick={() => setEntryType("HealthCheck")}>
                        Health check
                    </MenuItem>
                    <MenuItem value="Hospital" onClick={() => setEntryType("Hospital")}>
                        Hospital
                    </MenuItem>
                    <MenuItem value="OccupationalHealthcare" onClick={() => setEntryType("OccupationalHealthcare")}>
                        Occupational Healthcare
                    </MenuItem>
                </Select>
            </FormControl>
            <form onSubmit={addEntry}>
                <TextField
                    label="Description"
                    fullWidth 
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                <TextField
                    label="Date"
                    type="date"
                    fullWidth
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                    slotProps={{ inputLabel: { shrink: true } }}
                />
                <TextField
                    label="Specialist"
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                />
                <FormControl fullWidth>
                    <InputLabel id="codes-label">Diagnosis codes</InputLabel>
                    <Select labelId="codes-label" label="Diagnosis codes" multiple
                        value={diagnosisCodes} onChange={handleCodesChange}>
                        {diagnoses.map((d) => (
                            <MenuItem key={d.code} value={d.code}>{d.code} - {d.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                { entryType === "HealthCheck" && (
                    <FormControl fullWidth>
                        <InputLabel id="rating-label">Health rating</InputLabel>
                        <Select labelId="rating-label" label="Health rating" value={healthCheckRating}>
                            {Object.entries(HealthCheckRating).map(([label, value]) => (
                                <MenuItem key={label} value={value} onClick={() => setHealthCheckRating(value)}>
                                    {label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
                { entryType === "Hospital" && (
                    <>
                        <TextField
                            label="Discharge date"
                            type="date"
                            fullWidth
                            value={dischargeDate}
                            onChange={({target}) => setDischargeDate(target.value)}
                            slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                            label="Discharge criteria"
                            fullWidth
                            value={dischargeCriteria}
                            onChange={({target}) => setDischargeCriteria(target.value)}
                        />
                    </>
                )}
                { entryType === "OccupationalHealthcare" && (
                    <>
                        <TextField
                            label="Employer name"
                            fullWidth
                            value={employerName}
                            onChange={({target}) => setEmployerName(target.value)}
                        />
                        <TextField
                            label="Sick leave start"
                            type="date"
                            fullWidth
                            value={sickLeaveStart}
                            onChange={({target}) => setSickLeaveStart(target.value)}
                            slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <TextField
                            label="Sick leave end"
                            type="date"
                            fullWidth
                            value={sickLeaveEnd}
                            onChange={({target}) => setSickLeaveEnd(target.value)}
                            slotProps={{ inputLabel: { shrink: true } }}
                        />
                    </>
                )}
                <button type="submit">Add New Entry</button>
            </form>
        </div>
    );
};

export default AddEntryForm;