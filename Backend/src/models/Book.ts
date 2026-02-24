import { ILoanRecord } from "./LoanRecord";

export interface IBook {
    barcode: string;
    title: string;
    cover:string;
    authors: string[]
    description: string
    subjects: string[]
    publisher: string
    publicationDate: Date
    pages: number
    genre: string
    records: ILoanRecord[]
}