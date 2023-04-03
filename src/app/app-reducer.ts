import {authAPI} from 'api/todolists-api'

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "app/store";
import {authActions} from "features/Login/auth-reducer";


const initialState = {
    status: 'idle' as RequestStatusType,
    error:   null as string | null,
    isInitialized: false
}
export type InitialStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const slice = createSlice({
    name: 'app',
    initialState,
    reducers:{
        setAppStatus:(state,action:PayloadAction<{status:RequestStatusType}>)=>{
            state.status = action.payload.status
        },
        setAppError:(state, action:PayloadAction<{error: string | null}>)=>{
            state.error = action.payload.error
        },
        setAppInitialized:(state, action:PayloadAction<{value:boolean}>)=>{
            state.isInitialized = action.payload.value
        }

    }
})

export const appReducer = slice.reducer
export const appActions = slice.actions




export const initializeAppTC = (): AppThunk => (dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn:true}));
        } else {

        }

        dispatch(appActions.setAppInitialized({value:true}));
    })
}


