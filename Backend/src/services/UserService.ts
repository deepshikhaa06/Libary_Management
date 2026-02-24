import { config } from "../config";
import UserDao, { IUserModel } from "../daos/UserDao";
import { IUser } from "../models/user";
import bcrypt from 'bcrypt'
import { InvalidUsernameOrPasswordError, UnableToSaveError, UserDoesNotExistError } from "../utils/LibraryError";


export async function register(user:IUser):Promise<IUserModel>{
    const Rounds = config.server.rounds
    try{
        const hashedPassword = await bcrypt.hash(user.password,Rounds)
        const saved = new UserDao({...user,password:hashedPassword})
        return await saved.save()
    }catch(e:any){
        throw new UnableToSaveError(e.message)
    }
}

export async function login(credentials:{email:string,password:string}):Promise<IUserModel>{
    const {email,password} = credentials
    try{
        const user = await UserDao.findOne({email})
        if(!user) throw new InvalidUsernameOrPasswordError("Invalid username or Password")
        else {
            const validPassword :boolean = await bcrypt.compare(password,user.password)
            if(!validPassword) throw new InvalidUsernameOrPasswordError("Invalid username or Password")
            else return user
        }
    }catch(e:any){
        throw e
    }
}

export async function findAllUsers():Promise<IUserModel[]>{
    try{
        const users = await UserDao.find()
        return users;
    }catch(error){
        return []
    }
}

export async function findUserById(id:string):Promise<IUserModel|null>{
    try{
        const user = await UserDao.findById(id)
        if(user) return user
        throw new UserDoesNotExistError("User does not exist with this ID")
    }catch(error:any){
        throw error
    }
}

export async function modifyUser(user:IUserModel):Promise<IUserModel>{
    try{
        const { _id, ...updateData } = user;
        const updatedUser =await UserDao.findByIdAndUpdate(_id, updateData,{new:true})
        if(! updatedUser) throw new UserDoesNotExistError("User does not exist with this ID")
            console.log("Update payload:", user);

        return updatedUser
    }catch(error:any){
        throw error
    }
}

export async function removeUser(userId:string):Promise<string>{
    try{
        let deleted =await UserDao.findByIdAndDelete(userId)
        if(!deleted) throw new UserDoesNotExistError("User does not exist with this ID")
        return "User deleted successfully"
    }catch(error:any){
        throw error
    }
}