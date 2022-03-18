import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const loadOrders = createAsyncThunk(
    'orders/loadOrders',
    async (arg, {dispatch, getState }) => {
        const state = getState()
        const res = await fetch('https://a9n8syhfv3.tk/ordens', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': state.token.key
            },
        })
        const json = await res.json()

        return json['ordens']
    }
)

export const addOrder = createAsyncThunk(
    'orders/addOrder',
    async (payload, {dispatch, getState}) => {
        const state = getState()
        const order = {
            id_cliente: parseInt(payload.id_cliente),
            id_endereco: parseInt(payload.id_endereco),
            id_servico: parseInt(payload.id_servico),
            id_funcionario: parseInt(payload.id_funcionario),
            prioridade: parseInt(payload.prioridade),
            tempo_estimado: parseInt(payload.tempo_estimado),
            timestamp_criacao: Math.floor(new Date().getTime()/1000), //timestamp em segundos
            timestamp_inicio: Math.floor(payload.timestamp_inicio/1000), //timestamp em segundos
        }

        await fetch('https://a9n8syhfv3.tk/ordens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': state.token.key
            },
            body: JSON.stringify(order)
        }).then(res => console.log(res.json()))
        
        //Atualizando lista de ordens e datas
        await dispatch(loadOrders())
        dispatch(getDates())
    }
)

export const editOrder = createAsyncThunk(
    'orders/editOrder',
    async (arg, {dispatch, getState}) => {
        const { payload, orderId } = arg
        const state = getState()
        const order = {
            id_cliente: parseInt(payload.id_cliente),
            id_endereco: parseInt(payload.id_endereco),
            id_servico: parseInt(payload.id_servico),
            id_funcionario: parseInt(payload.id_funcionario),
            prioridade: parseInt(payload.prioridade),
            tempo_estimado: parseInt(payload.tempo_estimado),
            tempo_criacao: null,
            timestamp_inicio: Math.floor(payload.timestamp_inicio/1000), //timestamp em segundos
        }

        await fetch(`https://a9n8syhfv3.tk/ordens/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': state.token.key
            },
            body: JSON.stringify(order)
        }).then(res => console.log(res.json()))

        //Atualizando lista de ordens e datas
        await dispatch(loadOrders())
        dispatch(getDates())
    }
)

export const deleteOrder = createAsyncThunk(
    'orders/deleteOrder',
    async (arg, {dispatch, getState}) => {
        const { orderId } = arg
        const state = getState()

        await fetch(`https://a9n8syhfv3.tk/ordens/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': state.token.key
            },
        }).then(res => console.log(res.json()))

        //Atualizando lista de ordens e datas
        await dispatch(loadOrders())
        dispatch(getDates())
    }
)

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        array: [],
        status: null,
        creationDates: [],
        startDates: []
    },

    reducers: {
        getDates: (state) => {
            let aux = state.array.map(item => new Date(item.timestamp_criacao * 1000))
            let aux2 = state.array.map(item => new Date(item.timestamp_inicio * 1000))

            state.creationDates = aux.map(date => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`)
            state.startDates = aux2.map(date => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`)
        }
    }, 

    extraReducers: {
        [loadOrders.pending]: (state) => {
            state.status = 'loading'
        },
        [loadOrders.fulfilled]: (state, { payload }) => {
            state.array = payload
            state.status = 'success'
        },
        [loadOrders.rejected]: (state) => {
            state.status = 'failed'
        },
        [addOrder.pending]: (state) => {
            state.status = 'loading'
        },
        [addOrder.fulfilled]: (state) => {
            state.status = 'success'
        },
        [addOrder.rejected]: (state) => {
            state.status = 'failed'
        },
        [editOrder.pending]: (state) => {
            state.status = 'loading'
        },
        [editOrder.fulfilled]: (state) => {
            state.status = 'success'
        },
        [editOrder.rejected]: (state) => {
            state.status = 'failed'
        }
    },
})

export const { getDates } = ordersSlice.actions

export default ordersSlice.reducer