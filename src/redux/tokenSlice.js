import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getToken = createAsyncThunk(
    'token/getToken',
    async () => {
        const res = await fetch('https://a9n8syhfv3.tk/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            username: 'inovia',
                            password: 'desafio'
                        })
                    })
        const json = await res.json()

        return json['token']
    }
)

const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        key: null,
        status: null,
    },
    extraReducers: {
        [getToken.pending]: (state) => {
            state.status = 'loading'
        },
        [getToken.fulfilled]: (state, { payload }) => {
            state.key = payload
            state.status = 'success'
        },
        [getToken.rejected]: (state) => {
            state.status = 'failed'
        }
    }
})

export default tokenSlice.reducer