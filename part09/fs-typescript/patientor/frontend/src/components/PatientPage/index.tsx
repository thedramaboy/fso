import { useEffect, useState } from "react";
import { Diagnosis, EntryWithoutId, Patient } from "../../types";
import { useParams } from "react-router-dom";
import patientService from "../../services/patientService";
import diagnoseService from "../../services/diagnoseService";
import EntryDetails from "../EntryDetails";
import axios from "axios";
import AddEntryForm from "./AddEntryForm";

const PatientPage = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [error, setError] = useState('');
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        if (!id) {
            return;
        }
        patientService.getById(id)
            .then((data) => setPatient(data))
            .catch(() => setError('Patient not found'));
    }, [id]);

    useEffect(() => {
        diagnoseService.getAll()
        .then(setDiagnoses)
        .catch(() => setDiagnoses([]));
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (!patient) {
        return <p>Loading...</p>;
    }

    const { entries } = patient;

    const showFormError = (message: string) => {
        setFormError(message);
        setTimeout(() => {
            setFormError('');
        }, 5000);
    };

    const handleSubmit = (values: EntryWithoutId) => {
        patientService.createEntry(patient.id, values)
            .then((newEntry) => {
                setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
                setFormError('');
            })
            .catch((error: unknown) => {
                if (axios.isAxiosError(error)) {
                    const data = error.response?.data;
                    if (typeof data === 'object' && data !== null && 'error' in data && Array.isArray(data.error)) {
                        showFormError(data.error.map((issue: unknown) => {
                            if (typeof issue === 'object' && issue !== null && 'message' in issue && typeof issue.message === 'string') {
                                return issue.message;
                            }
                            return 'Unknown error';
                        }).join(', '));
                        return;
                    }
                }
                showFormError('Unknown error');
            });
    };

    return (
        <div>
            <h2>{patient.name} {patient.gender}</h2>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            {/* <p>date of birth: {patient.dateOfBirth}</p> */}
            <h3>entries</h3>
            {entries.map((entry) => (
                <div key={entry.id}>
                    {entry.date} {entry.description}
                    <ul>
                        {entry.diagnosisCodes?.map((code) => (
                            <li key={code}>{code} {diagnoses.find((diagnose) => diagnose.code === code)?.name}</li>
                        ))}
                    </ul>
                    <EntryDetails entry={entry}/>
                </div>
            ))}
            <AddEntryForm onSubmit={handleSubmit} error={formError} diagnoses={diagnoses} />
        </div>
    );
};

export default PatientPage;