import type { Book } from "./Book"

export type LoanRecord = {
    _id:string,
    status:"LOANED"|"AVAILABLE",
    loanedDate:Date,
    returnedDate?:Date,
    dueDate:Date,
    patron:string,
    employeeIn?:string,
    employeeOut:string,
    item:Book,
    createdAt:Date,
    updatedAt:Date
}