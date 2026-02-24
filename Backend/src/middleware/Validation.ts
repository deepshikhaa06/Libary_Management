import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema } from "joi";
import { login } from "../services/UserService";
import { IUserModel } from "../daos/UserDao";
import { IBook } from "../models/Book";
import { IBookModel } from "../daos/BookDao";
import { ILibraryCard } from "../models/LibraryCard";
import { ILoanRecord } from "../models/LoanRecord";
import { ILoanRecordModel } from "../daos/LoanRecordDao";


export function ValidateSchema(schema:ObjectSchema,property:string){
    return async (req:Request, res:Response, next:NextFunction) => {
     try{
        switch(property){
         case'query':
            await schema.validateAsync(req.query)
            break;
            case'params':
            await schema.validateAsync(req.params)
            break;
            default :
            await schema.validateAsync(req.body)
        }
        next()
     }catch(error:any){
         return res.status(422).json({message:"Object validation failed",
                    details: error.details?.map((d: any) => d.message),
         })
     }   
    }
}

export const Schemas= {
    user:{
        create:Joi.object({
            type:Joi.string().valid("ADMIN","EMPLOYEE","PARTRON").required(),
            firstname:Joi.string().required(),
            lastname:Joi.string().required(),
            email:Joi.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
            password:Joi.string().required()
        }),
        login:Joi.object({
            email:Joi.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
            password:Joi.string().required()
        }),
        userId:Joi.object<{userId:string}>({
            userId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        update:Joi.object<IUserModel>({
            _id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            type:Joi.string().valid("ADMIN","EMPLOYEE","PARTRON").optional(),
            firstname:Joi.string().optional(),
            lastname:Joi.string().optional(),
            email:Joi.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).optional(),
            password:Joi.string().optional()
        })
    },
    book:{
        create:Joi.object<IBook>({
            barcode:Joi.string().regex(/^(?=(?:\D*\d){10}(?:\D*\d{3})?$)[\d-]+$/).required(),
            title:Joi.string().required(),
            cover:Joi.string().required(),
            authors:Joi.array().required(),
            description:Joi.string().required(),
            subjects:Joi.array().required(),
            publisher:Joi.string().required(),
            publicationDate:Joi.date().required(),
            pages:Joi.number().required(),
            genre:Joi.string().required()
        }),
        update:Joi.object<IBookModel>({
            _id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            barcode:Joi.string().regex(/^(?=(?:\D*\d){10}(?:\D*\d{3})?$)[\d-]+$/).required()  
        }),
        delete:Joi.object<{barcode:string}>({
            barcode:Joi.string().regex(/^(?=(?:\D*\d){10}(?:\D*\d{3})?$)[\d-]+$/).required()
        })
    },
    libraryCard:{
        create:Joi.object<ILibraryCard>({
            user:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        get:Joi.object<{cardId:string}>({
            cardId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    },
    loan:{
        create:Joi.object<ILoanRecord>({
            status:Joi.string().valid("AVAILABLE","LOANED").required(),
            loanedDate:Joi.date().required(),
            returnedDate:Joi.date(),
            dueDate:Joi.date().required(),
            patron:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            employeeIn:Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            employeeOut:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            item:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        update:Joi.object<ILoanRecordModel>({
            _id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            status:Joi.string().valid("AVAILABLE","LOANED").required(),
            loanedDate:Joi.date().required(),
            returnedDate:Joi.date(),
            dueDate:Joi.date().required(),
            patron:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            employeeIn:Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            employeeOut:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            item:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        query:Joi.object<{property:string,value:string|Date}>({
            property:Joi.string().valid("_id","status","loanedDate","dueDate","returnedDate","patron","employeeIn","employeeOut","item").required(),  
            value:Joi.alternatives().try(Joi.string(),Joi.date()).required()
        })
    }
}