export interface IUser {
    type:"ADMIN" | "EMPLOYEE" | "PARTRON",
    firstname:string,
    lastname:string,
    email:string,
    password:string
}