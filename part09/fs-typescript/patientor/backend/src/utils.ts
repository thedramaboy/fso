import { type Patient, Gender, HealthCheckRating } from "./types.ts";
import { z } from 'zod';

const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string()
});

export const parseNewPatient = (object: unknown): Omit<Patient, 'id' | 'entries'> => {
    return newPatientSchema.parse(object);
};

const BaseEntry = z.object({
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});

const healthCheckEntrySchema = BaseEntry.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.union([
        z.literal(HealthCheckRating.Healthy),
        z.literal(HealthCheckRating.LowRisk),
        z.literal(HealthCheckRating.HighRisk),
        z.literal(HealthCheckRating.CriticalRisk),
    ])
});

const hospitalEntrySchema = BaseEntry.extend({
    type: z.literal("Hospital"),
    discharge: z.object({
        date: z.iso.date(),
        criteria: z.string()
    })
});

const occupationalHealthcareEntrySchema = BaseEntry.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: z.object({
        startDate: z.iso.date(),
        endDate: z.iso.date()
    }).optional()
});

export const newEntrySchema = z.discriminatedUnion("type", [
    healthCheckEntrySchema,
    hospitalEntrySchema,
    occupationalHealthcareEntrySchema
]);