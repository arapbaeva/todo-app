import {tasksReducer} from 'features/TodolistsList/tasks-reducer';
import {todolistsReducer} from 'features/TodolistsList/todolists-reducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {appReducer} from './app-reducer'
import {authReducer} from 'features/Auth/auth-reducer'
import {configureStore} from "@reduxjs/toolkit";
import { AnyAction,  combineReducers, createStore } from 'redux'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})


export const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(thunk)
})

// непосредственно создаём store
// export const _store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
