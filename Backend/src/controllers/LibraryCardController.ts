import { ILibraryCard } from "../models/LibraryCard"
import { Request,Response } from "express"
import { findLibraryCard, registerLibraryCard } from "../services/LibraryCardService"
import { LibraryCardDoesNotExistError } from "../utils/LibraryError"


async function getLibraryCard(req:Request,res:Response){
    const {cardId}= req.params
    try{
        let libraryCard = await findLibraryCard(cardId)
        res.status(200).json({message:"Library card fetched successfully",libraryCard})
        }catch(error:any){
            if(error instanceof LibraryCardDoesNotExistError){
                res.status(404).json({message:"Library card does not exist with this ID"})
            }else{
                res.status(500).json({message:"Unable to get library card at this time",error:error.message})
            }
        }
}

async function createLibraryCard(req:Request,res:Response){
    const card:ILibraryCard = req.body
    try{
        let libraryCard = await registerLibraryCard(card)
        res.status(201).json({message:"Library card created successfully",libraryCard})
        }catch(error:any){
            res.status(500).json({message:"Unable to create library card at this time",error:error.message})            
        }
}

export default {getLibraryCard,createLibraryCard}