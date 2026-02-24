import LibraryCardDao,{ ILibraryCardModel } from "../daos/LibraryCardDoa"
import { ILibraryCard } from "../models/LibraryCard"
import { LibraryCardDoesNotExistError } from "../utils/LibraryError"

export async function registerLibraryCard(card:ILibraryCard):Promise<ILibraryCardModel>{
    try{
        const savedCard = new LibraryCardDao(card)
        return await savedCard.save()
    }catch(e:any){
        let c = await  LibraryCardDao.findOne({user:card.user}).populate("user")
        if(c) return c
        throw e
    }
}

export async function findLibraryCard(libraryCardId:string):Promise<ILibraryCardModel>{
    try{
        let card=await LibraryCardDao.findOne({_id:libraryCardId}).populate("user")
        if(card) return card
        throw new LibraryCardDoesNotExistError("Library card does not exist with this ID")
        }catch(e:any){
            throw e
        }       
}