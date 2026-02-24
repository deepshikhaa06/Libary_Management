import type { LoanRecord } from "./LoanRecord"
import type { User } from "./User"

export type Book={
    _id:string,
    barcode:string,
    title:string,
    cover:string,
    authors:string[],
    description:string,
    subjects:string[],
    publisher:string,
    publicationDate:string,
    pages:number,
    genre:string
    records: LoanRecord[]
}

export type CheckoutBookPayload={
    book:Book,
    libraryCard:string
    employee:User
}

export type CheckinBookPayload={
    book:Book,
    employee:User
}