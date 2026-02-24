import { findAllUsers, findUserById, modifyUser } from "../services/UserService"
import { Request,Response } from "express"
import { UserDoesNotExistError } from "../utils/LibraryError"


async function getAllUsers(req:Request,res:Response){
    try{
        let users = await findAllUsers()
        res.status(200).json({message:"Users fetched successfully",users})
    }catch(error:any){
        res.status(500).json({message:"Unable to get users at this time",error:error.message})
    }
}

async function getUserById(req:Request,res:Response){
    const userId = req.params.userId
    try{
        let user = await findUserById(userId)
        res.status(200).json({message:"User fetched successfully",user})
    }catch(error:any){
        if(error instanceof UserDoesNotExistError){
            res.status(404).json({message:"User does not exist with this ID"})
        }else{
            res.status(500).json({message:"Unable to get user at this time",error:error.message})
        }
    }
}

async function updateUser(req:Request,res:Response){
    const user = req.body
    try{
        let updateUser = await modifyUser(user)
        res.status(200).json({message:"User updated successfully",updateUser})
    }catch(error:any){
        if(error instanceof UserDoesNotExistError){
            res.status(404).json({message:"User does not exist with this ID"})
        }else{
            res.status(500).json({message:"Unable to update user at this time",error:error.message})
        }
    }
}

async function deleteUser(req:Request,res:Response){
    let userId:string = req.params.userId
    try{
        let user = await findUserById(userId)
        res.status(200).json({message:"User fetched successfully",user})
    }catch(error:any){
        if(error instanceof UserDoesNotExistError){
            res.status(404).json({message:"User requested does not exist"})
        }else{
            res.status(500).json({message:"Unable to delete user at this time",error:error.message})
        }
    }
}

export default {getAllUsers,getUserById,updateUser,deleteUser}