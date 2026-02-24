import mongoose, { Schema , Document } from "mongoose"
import { ILoanRecord } from "../models/LoanRecord"


export interface ILoanRecordModel extends ILoanRecord, Document {}

export const LoanRecordSchema:Schema=new Schema({
    status:{type:String,required:true},
    loanedDate:{type:Date,required:true},
    returnedDate:{type:Date},
    dueDate:{type:Date,required:true},
    patron:{type:Schema.Types.ObjectId,required:true},
    employeeIn:{type:Schema.Types.ObjectId},
    employeeOut:{type:Schema.Types.ObjectId,required:true},
    item:{type:Schema.Types.ObjectId,required:true,ref:"Book"}
},
{timestamps:true})

export default mongoose.model<ILoanRecordModel>("LoanRecord",LoanRecordSchema)