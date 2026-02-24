import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FetchUserPayload, LoginUserPayload, RegisterUserPayload, User } from "../../models/User";
import axios from "axios";



interface AuthenticationSliceState {
    loggedInUser: User | undefined;
    profileUser: User | undefined;
    libraryCard: string | any;
    loading : boolean;
    error : boolean;
    registerSuccess : boolean;
}

const initialState : AuthenticationSliceState = {
    loggedInUser : undefined,
    profileUser : undefined,
    libraryCard:"", 
    loading : false,
    error : false,
    registerSuccess : false
}

export const loginUser = createAsyncThunk('auth/login',
    async (user:LoginUserPayload,thunkAPI)=>{
        try{
            const req =await axios.post("http://localhost:8080/auth/login",user)
            return req.data.user
        }catch(e){
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const registerUser = createAsyncThunk('auth/register',
    async (user:RegisterUserPayload,thunkAPI)=>{
        try{
            const req =await axios.post("http://localhost:8080/auth/register",user)
            return req.data.user;
        }catch(e){
            return thunkAPI.rejectWithValue(e)
        }       
    }
)

export const fetchUser=createAsyncThunk('auth/fetch',async(payload:FetchUserPayload,thunkAPI)=>{
    try{
        const req = await axios.get(`http://localhost:8080/users/${payload.userId}`)
        const user = req.data.user
        return {
            user,
            property : payload.property
        }
    }catch(e){
        return thunkAPI.rejectWithValue(e)
    }
})

export const updateUser=createAsyncThunk('auth/update',async(payload:User,thunkAPI)=>{
    try {
        const req = await axios.put(`http://localhost:8080/users`,payload)
        return req.data.updateUser
    } catch (error:any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message)
    }
})

export const getLibraryCard=createAsyncThunk('auth/libraryCard',async(userId:string,thunkAPI)=>{
    try{
        const req = await axios.post(`http://localhost:8080/card/`,{user:userId})
        // console.log("Library card API result:", req.data);
        // console.log("Returning:", req.data.libraryCard);

        return req.data.libraryCard
    }catch(e){
        return thunkAPI.rejectWithValue(e)
    }
})
export const AuthenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        resetRegisterSuccess:(state)=>{
         state={
            ...state,
            registerSuccess : false
         }   
        },
        resetUser:(state,action:PayloadAction<string>)=>{
            state={
             ...state,
             [action.payload]:undefined   
            }
            return state
        }
    },

    extraReducers:(builder)=>{
    //!Pending logic
    builder.addCase(loginUser.pending,(state)=>{
            state={
                ...state,
                loading : true,
                error : false
            }
            return  state
    })
    builder.addCase(registerUser.pending,(state)=>{
        state={
            ...state,
            loading : true,
            error : false
        }
        return  state
    })
    builder.addCase(fetchUser.pending,(state)=>{
        state={
            ...state,
            loading : true,
            error : false
        }
        return  state
    })
    builder.addCase(updateUser.pending,(state)=>{
        state={
            ...state,
            loading : true,
            error : false
        }
        return  state
    })
    builder.addCase(getLibraryCard.pending,(state)=>{
        state={
            ...state,
            loading : true,
            error : false
        }
        return  state
    })

    //!Resolved logic
    builder.addCase(loginUser.fulfilled,(state,action)=>{
        state={
            ...state,
            loggedInUser : action.payload,
            loading : false,
        }
        return state
    })
    builder.addCase(registerUser.fulfilled,(state,action)=>{
      state={
        ...state,
        loading:false,
        registerSuccess : true   
      }  
      return state
    })
    builder.addCase(fetchUser.fulfilled,(state,action)=>{
        state={
            ...state,
            [action.payload.property] : action.payload.user,
            loading : false
        }
        return state
    })
    builder.addCase(updateUser.fulfilled,(state,action)=>{
        state={
            ...state,
            loggedInUser : action.payload,
            profileUser : action.payload,
            loading : false
        }
        return state
    })
    builder.addCase(getLibraryCard.fulfilled,(state,action)=>{
        state={
            ...state,
            libraryCard: action.payload,
            error : false,
            loading : false   
        }    
        return state
    })

    //!Rejected logic
    builder.addCase(loginUser.rejected,(state)=>{
        state={
            ...state,
            error:true,
            loading : false
        }
        return state
    })
    builder.addCase(registerUser.rejected,(state)=>{
        state={
            ...state,
            error:true,
            loading : false
        }
        return state
    })
    builder.addCase(fetchUser.rejected,(state)=>{
        state={
            ...state,
            error:true,
            loading : false
        }
        return state
    })
    builder.addCase(updateUser.rejected,(state)=>{
        state={
            ...state,
            error:true,
            loading : false
        }
        return state
    })
    builder.addCase(getLibraryCard.rejected,(state)=>{
        state={
            ...state,
            error:true,
            loading : false
        }
        return state
    })

    }
})

export const {resetRegisterSuccess,resetUser} = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer