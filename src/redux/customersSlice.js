import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const loadCustomers = createAsyncThunk(
    'customers/loadCustomers',
    async (arg, { getState }) => {
        const state = getState()
        const res = await fetch('https://a9n8syhfv3.tk/clientes', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': state.token.key
            },
        })
        const json = await res.json()

        return json['clientes']
    }
)

const customersSlice = createSlice({
    name: 'customers',
    initialState: {
        array: [],
        status: null,
    },
    extraReducers: {
        [loadCustomers.pending]: (state) => {
            state.status = 'loading'
        },
        [loadCustomers.fulfilled]: (state, { payload }) => {
            state.array = payload
            state.status = 'success'
        },
        [loadCustomers.rejected]: (state) => {
            state.status = 'failed'
        }
    },
})

export default customersSlice.reducer