import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    userData:{
        email:"",
        password: "",
        fullName:"",
        imageUrl:""
    },
    authData:{
        idToken:""
    }
}
const dashboardSlice = createSlice({
    name:'dashboard',
    initialState,
    reducers:{
        setUserData(state,action){
    
        }
    }
})
export default dashboardSlice.reducer;
export const dashboardAction = dashboardSlice.actions;
