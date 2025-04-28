"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = require("../utils");
const uuid_1 = require("uuid");
const patientsRouter = express_1.default.Router();
const newPatientParser = (req, _res, next) => {
    const body = req.body;
    if (!body.id) {
        body.id = (0, uuid_1.v4)();
    }
    ;
    try {
        utils_1.patientEntrySchema.parse(body);
        next();
    }
    catch (error) {
        next(error);
    }
    ;
};
patientsRouter.get('/', (_req, res) => {
    res.status(200).send(patientsService_1.default.getPatients());
});
patientsRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const patient = patientsService_1.default.getPatient(id);
    if (patient) {
        res.status(200).send(patient);
    }
    else {
        res.status(404).json({ error: 'Invalid id!' });
    }
});
patientsRouter.post('/', newPatientParser, (req, res) => {
    const addedPatient = patientsService_1.default.addPatient(req.body);
    res.status(201).json(addedPatient);
});
patientsRouter.post('/:id', (req, res) => {
    const patientId = req.params.id;
    if (patientId) {
        const data = req.body;
        if (data) {
            try {
                const addedEntry = patientsService_1.default.addEntry(patientId, data);
                res.status(201).json(addedEntry);
            }
            catch (error) {
                res.status(400).send(error);
            }
        }
    }
});
exports.default = patientsRouter;
