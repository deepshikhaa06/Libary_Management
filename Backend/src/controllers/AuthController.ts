import { login, register } from "../services/UserService";
import { IUser } from "../models/user";
import { Request,Response } from "express";
import { IUserModel } from "../daos/UserDao";
import { InvalidUsernameOrPasswordError } from "../utils/LibraryError";




async function handleRegister(req:Request,res:Response){
    console.log("Request body",req.body);
    const user:IUser = req.body
    try{
        const reqisteredUser = await register(user)
        res.status(201).json({
            message : "User created successfully",
            user:{
                _id:reqisteredUser._id,
                type:reqisteredUser.type,
                firstname:reqisteredUser.firstname,
                lastname:reqisteredUser.lastname,
                email:reqisteredUser.email
            }
        })
    }catch(e:any){
        if(e.message.includes("E11000  duplicate key error collection")){
            return res.status(409).json({message:"User with emailalready exists",error:e.message})
        }else{
            return res.status(500).json({message:"Unable to create user at this time",error:e.message})
        }
        res.status(500).json({message:"Unable to create user at this time",error:e.message})
    }
}

async function handleLogin(req:Request,res:Response){
    const credentials = req.body
    try{
        const loggedIn:IUserModel=await login(credentials)
        res.status(200).json({
          message:"Login successful",
          user:{
           _id:loggedIn._id,
           type:loggedIn.type,   
           firstname:loggedIn.firstname,
           lastname:loggedIn.lastname,
           email:loggedIn.email
          }  
        })
    }catch(error:any){
        if(error instanceof InvalidUsernameOrPasswordError){
                    res.status(500).json({message:"Unable to login at this time",error:error.message})
        }else {
            res.status(500).json({message:"Unable to login at this time",error:error.message})
        }
    }
}

export default {handleRegister,handleLogin}