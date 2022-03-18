import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const loadServices = createAsyncThunk(
    'servicos/loadServices',
    async (arg, { getState }) => {
        const state = getState()
        const res = await fetch('https://a9n8syhfv3.tk/servicos', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': state.token.key
            },
        })
        const json = await res.json()

        return json['servicos']
    }
)

const servicesSlice = createSlice({
    name: 'services',
    initialState: {
        array: [],
        status: null,
    },
    extraReducers: {
        [loadServices.pending]: (state) => {
            state.status = 'loading'
        },
        [loadServices.fulfilled]: (state, { payload }) => {
            state.array = payload
            state.status = 'success'
        },
        [loadServices.rejected]: (state) => {
            state.status = 'failed'
        }
    },
})

export default servicesSlice.reducer