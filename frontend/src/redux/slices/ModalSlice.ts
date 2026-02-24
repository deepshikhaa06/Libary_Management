import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface ModalSliceState{
    displayLogin : boolean
    displayLibaryCard : boolean
    displayLoan:boolean
}

const initialState : ModalSliceState = {
    displayLogin : true,
    displayLibaryCard : false,
    displayLoan : false
}

export const ModalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setDisplayLogin (state, action:PayloadAction<boolean>){
            // state = {...state, displayLogin : action.payload}
              state.displayLogin = action.payload;
            return state
        },
        setDisplayLibaryCard (state, action:PayloadAction<boolean>){
        // state = {...state, displayLibaryCard : action.payload}
              state.displayLibaryCard = action.payload;
            return state
    },    
    setDisplayLoan (state, action:PayloadAction<boolean>){
        // state = {...state, displayLoan : action.payload}
              state.displayLoan = action.payload;
            return state
    },
    },
})

export const { setDisplayLogin, setDisplayLibaryCard, setDisplayLoan } = ModalSlice.actions;

export default ModalSlice.reducer