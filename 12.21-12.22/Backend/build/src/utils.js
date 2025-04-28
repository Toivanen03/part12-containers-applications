"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPatient = exports.patientEntrySchema = exports.toNewDiagnosis = exports.newDiagnosticsSchema = exports.entrySchema = void 0;
const types_1 = require("./types");
const zod_1 = require("zod");
const baseEntrySchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, {
        message: "ID error!"
    }),
    date: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Date must be YYYY-MM-DD!"
    }),
    specialist: zod_1.z.string().regex(/^[a-zåäö.-]{1,}(?: [a-zåäö.-]{1,})*$/i, {
        message: "Invalid or missing specialist!"
    }),
    diagnosisCodes: zod_1.z.array(zod_1.z.string()).optional(),
    description: zod_1.z.string().min(5, {
        message: "Description is required!"
    }),
});
const healthCheckEntrySchema = baseEntrySchema.extend({
    type: zod_1.z.literal("HealthCheck"),
    healthCheckRating: zod_1.z.number().refine((val) => {
        return val >= 0 && val <= 3;
    }, {
        message: "Select health risk rating!",
    }),
});
const hospitalEntrySchema = baseEntrySchema.extend({
    type: zod_1.z.literal("Hospital"),
    discharge: zod_1.z.object({
        date: zod_1.z.string(),
        criteria: zod_1.z.string(),
    }).optional(),
});
const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
    type: zod_1.z.literal("OccupationalHealthcare"),
    employerName: zod_1.z.string().min(2, {
        message: "Missing employer!"
    }),
    sickLeave: zod_1.z.object({
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string(),
    }).optional(),
});
exports.entrySchema = zod_1.z.union([
    healthCheckEntrySchema,
    hospitalEntrySchema,
    occupationalHealthcareEntrySchema,
]);
exports.newDiagnosticsSchema = zod_1.z.array(exports.entrySchema);
const toNewDiagnosis = (object) => {
    const entries = exports.newDiagnosticsSchema.parse(object);
    return entries;
};
exports.toNewDiagnosis = toNewDiagnosis;
exports.patientEntrySchema = zod_1.z.object({
    id: zod_1.z.string().regex((/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/), {
        message: "ID error!"
    }),
    name: zod_1.z.string().regex((/^[a-zåäö]{2,} [a-zåäö]{2,}$/i), {
        message: "Invalid or missing name!"
    }),
    dateOfBirth: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Date must be YYYY-MM-DD!",
    }),
    ssn: zod_1.z.string().regex((/^[0-9]{6}([A-F-+YXWVU])[0-9]{3}[0-9a-z]{1}$/i), {
        message: "Invalid SSN!"
    }),
    gender: zod_1.z.nativeEnum((types_1.Gender), {
        message: "Gender error!"
    }),
    occupation: zod_1.z.string().min((3), {
        message: "Occupation must be at least 3 characters!"
    }),
    entries: zod_1.z.array(exports.entrySchema).optional()
});
const toPatient = (object) => {
    const result = exports.patientEntrySchema.safeParse(object);
    if (!result.success) {
        throw new zod_1.ZodError(result.error.errors);
    }
    return result.data;
};
exports.toPatient = toPatient;
