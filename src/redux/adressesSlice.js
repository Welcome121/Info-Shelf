import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const loadAdresses = createAsyncThunk(
    'adresses/loadAdresses',
    async (arg, { getState }) => {
        const state = getState()
        const res = await fetch('https://a9n8syhfv3.tk/enderecos', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': state.token.key
            },
        })
        const json = await res.json()

        return json['enderecos']
    }
)

const adressesSlice = createSlice({
    name: 'adresses',
    initialState: {
        array: [],
        status: null,
    },
    extraReducers: {
        [loadAdresses.pending]: (state) => {
            state.status = 'loading'
        },
        [loadAdresses.fulfilled]: (state, { payload }) => {
            state.array = payload
            state.status = 'success'
        },
        [loadAdresses.rejected]: (state) => {
            state.status = 'failed'
        }
    },
})

export default adressesSlice.reducer