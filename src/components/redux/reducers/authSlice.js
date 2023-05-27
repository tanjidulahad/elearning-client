import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedinUser:false,
    userData:null
}

export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        userLoggedin:(state,actions)=>{
            state.isLoggedinUser=true
            state.userData=actions.payload
        },
        userLoggedOut:(state)=>{
            state.isLoggedinUser=false
            state.userData=null
        }
    }
})

export const { userLoggedin,userLoggedOut } = authSlice.actions

export const authReducer = authSlice.reducer