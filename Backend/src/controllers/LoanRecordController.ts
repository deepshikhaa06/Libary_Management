import { Request, Response } from "express";
import { findAllRecords, generateRecord, modifyRecord, queryRecords } from "../services/LoanRecordService";
import { LoanRecordDoesNotExistError } from "../utils/LibraryError";

async function createdRecord(req:Request,res:Response){
    let record = req.body

    try {
        let createdRecord = await generateRecord(record)
        res.status(201).json({message:"Record created successfully",record:createdRecord})       
    } catch (error) {
        res.status(500).json({message:"Unable to create record at this time",error})
    }
}

async function updatedRecord(req:Request,res:Response){
    let record = req.body
    try {
        let updatedRecord = await modifyRecord(record)
        res.status(200).json({message:"Record updated successfully",record:updatedRecord})
        } catch (error) {
            if(error instanceof LoanRecordDoesNotExistError){
                res.status(404).json({message:"Unable to modify record"})
            }else{
                res.status(500).json({message:"Something went wrong",error})
            }
        }
}

async function getAllRecords(req:Request,res:Response){
    try {
        let records = await findAllRecords()
        res.status(200).json({message:"Records fetched successfully",count:records.length,records})
    } catch (error) {
        res.status(500).json({message:"Unable to get records at this time",error})
    }
}

async function getRecordByProperty(req:Request,res:Response){
    let param=req.body
    try {
        let records = await queryRecords(param)
        res.status(200).json({message:"Records fetched successfully from query",records})
        } catch (error) {
            res.status(500).json({message:"Unable to get records at this time",error})       
}
}

export default {createdRecord,updatedRecord,getAllRecords,getRecordByProperty}
