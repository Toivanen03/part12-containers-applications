"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
const patients = patients_1.default;
const getPatients = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id, name, dateOfBirth, gender, occupation, entries: entries || []
    }));
};
const getPatient = (id) => {
    return patients.find(patient => patient.id === id);
};
const addPatient = (entry) => {
    const newPatientEntry = {
        id: entry.id,
        name: entry.name,
        dateOfBirth: entry.dateOfBirth,
        ssn: entry.ssn,
        gender: entry.gender,
        occupation: entry.occupation,
        entries: entry.entries || []
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};
const addEntry = (id, entry) => {
    const patient = patients.find(p => p.id === id);
    if (!patient) {
        throw new Error('Patient not found!');
    }
    const parsedEntry = utils_1.entrySchema.parse(Object.assign(Object.assign({}, entry), { id: (0, uuid_1.v4)(), date: new Date().toISOString().split('T')[0] }));
    patient.entries = patient.entries || [];
    patient.entries.push(parsedEntry);
    return parsedEntry;
};
exports.default = {
    getPatient,
    getPatients,
    addPatient,
    addEntry
};
