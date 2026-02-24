"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoanRecordService_1 = require("../services/LoanRecordService");
const LibraryError_1 = require("../utils/LibraryError");
async function createdRecord(req, res) {
    let record = req.body;
    try {
        let createdRecord = await (0, LoanRecordService_1.generateRecord)(record);
        res.status(201).json({ message: "Record created successfully", record: createdRecord });
    }
    catch (error) {
        res.status(500).json({ message: "Unable to create record at this time", error });
    }
}
async function updatedRecord(req, res) {
    let record = req.body;
    try {
        let updatedRecord = await (0, LoanRecordService_1.modifyRecord)(record);
        res.status(200).json({ message: "Record updated successfully", record: updatedRecord });
    }
    catch (error) {
        if (error instanceof LibraryError_1.LoanRecordDoesNotExistError) {
            res.status(404).json({ message: "Unable to modify record" });
        }
        else {
            res.status(500).json({ message: "Something went wrong", error });
        }
    }
}
async function getAllRecords(req, res) {
    try {
        let records = await (0, LoanRecordService_1.findAllRecords)();
        res.status(200).json({ message: "Records fetched successfully", count: records.length, records });
    }
    catch (error) {
        res.status(500).json({ message: "Unable to get records at this time", error });
    }
}
async function getRecordByProperty(req, res) {
    let param = req.body;
    try {
        let records = await (0, LoanRecordService_1.queryRecords)(param);
        res.status(200).json({ message: "Records fetched successfully from query", records });
    }
    catch (error) {
        res.status(500).json({ message: "Unable to get records at this time", error });
    }
}
exports.default = { createdRecord, updatedRecord, getAllRecords, getRecordByProperty };
