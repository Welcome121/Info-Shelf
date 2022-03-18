import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const loadWorkers = createAsyncThunk(
    'workers/loadWorkers',
    async (arg, { getState }) => {
        const state = getState()
        const res = await fetch('https://a9n8syhfv3.tk/funcionarios', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': state.token.key
            },
        })
        const json = await res.json()

        return json['funcionarios']
    }
)

const workersSlice = createSlice({
    name: 'workers',
    initialState: {
        array: [],
        status: null,
    },
    extraReducers: {
        [loadWorkers.pending]: (state) => {
            state.status = 'loading'
        },
        [loadWorkers.fulfilled]: (state, { payload }) => {
            state.array = payload
            state.status = 'success'
        },
        [loadWorkers.rejected]: (state) => {
            state.status = 'failed'
        }
    },
})

export default workersSlice.reducer