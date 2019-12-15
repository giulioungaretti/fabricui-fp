import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Increment {
    n: number
}
interface State {
    n: number
}

let initialState: State = { n: 0 }

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        increment: (state, action: PayloadAction<Increment>) => {
            state.n = state.n + action.payload.n
        },
        decrement: (state, action: PayloadAction<Increment>) => {
            state.n = state.n - action.payload.n
        },
    }
})

export const {
    increment,
    decrement
} = counterSlice.actions

export default counterSlice.reducer