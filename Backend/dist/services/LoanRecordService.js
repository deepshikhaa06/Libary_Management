"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRecord = generateRecord;
exports.modifyRecord = modifyRecord;
exports.findAllRecords = findAllRecords;
exports.queryRecords = queryRecords;
const LoanRecordDao_1 = __importDefault(require("../daos/LoanRecordDao"));
const LibraryError_1 = require("../utils/LibraryError");
const BookService_1 = require("./BookService");
async function generateRecord(record) {
    try {
        let createdRecord = new LoanRecordDao_1.default(record);
        createdRecord = await createdRecord.save();
        let book = await (0, BookService_1.findBookById)(record.item);
        let records = book.records;
        records = [...records, createdRecord];
        book.records = records;
        await (0, BookService_1.modifyBook)(book);
        return createdRecord;
    }
    catch (error) {
        throw error;
    }
}
async function modifyRecord(record) {
    try {
        let updatedRecord = await LoanRecordDao_1.default.findOneAndUpdate({ _id: record._id }, record, { new: true });
        if (updatedRecord) {
            let book = await (0, BookService_1.findBookById)(record.item);
            let records = book.records;
            records[0] = updatedRecord;
            book.records = records;
            await (0, BookService_1.modifyBook)(book);
            return updatedRecord;
        }
        throw new LibraryError_1.LoanRecordDoesNotExistError("Record does not exist");
    }
    catch (error) {
        throw error;
    }
}
async function findAllRecords() {
    try {
        return await LoanRecordDao_1.default.find();
    }
    catch (error) {
        throw error;
    }
}
async function queryRecords(params) {
    try {
        return await LoanRecordDao_1.default.find({ [params.property]: params.value }).populate("item").sort("-loanedDate");
    }
    catch (error) {
        throw error;
    }
}
