import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Option, some, none, fold } from 'fp-ts/es6/Option'
import { pipe } from 'fp-ts/es6/pipeable'
import { AppThunk } from './store'
import { fetchCounter } from './http'

interface Increment {
    n: number
}
interface State {
    n: Option<number>
    error: Option<string>
}

let initialState: State = { n: none, error: none }

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        increment: (state, action: PayloadAction<Increment>) => {
            state.n = pipe(
                state.n,
                fold(
                    () => state.n,
                    x => some(x + action.payload.n)
                )
            )
        },
        loadedCounter: (state, action: PayloadAction<number>) => {
            state.n = some(action.payload)
        },
        failedCounter: (state, action: PayloadAction<string>) => {
            state.error = some(action.payload)
        },
        decrement: (state, action: PayloadAction<Increment>) => {
            state.n = pipe(
                state.n,
                fold(
                    () => state.n,
                    x => some(x - action.payload.n)
                )
            )
        },
    }
})

export const {
    increment,
    loadedCounter,
    failedCounter,
    decrement
} = counterSlice.actions

export default counterSlice.reducer


export const fetchInitialCounter = (
): AppThunk => async dispatch => {
    try {
        console.log("fire missile!")
        const repoDetails = await fetchCounter()
        const cad = repoDetails.rates["CAD"]
        if (cad == null) {
            dispatch(failedCounter("WeirdJson received sorry"));
        } else {
            dispatch(loadedCounter(cad))
        }
    } catch (err) {
        dispatch(failedCounter(err.toString()))
    }
}
