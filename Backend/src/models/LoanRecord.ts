export interface ILoanRecord{
    status:'AVAILABLE' | 'LOANED';
    loanedDate:Date;
    returnedDate ? :Date;
    dueDate:Date;
    patron:string;
    employeeIn?:string;
    employeeOut:string;
    item:string
}