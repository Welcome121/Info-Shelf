import { configureStore } from '@reduxjs/toolkit'
import ordersReducer from './ordersSlice'
import tokenReducer from './tokenSlice'
import customersReducer from './customersSlice'
import adressesReducer from './adressesSlice'
import servicesReducer from './servicesSlice'
import workersReducer from './workersSlice'

export default configureStore({
    reducer: {
        token: tokenReducer,
        orders: ordersReducer,
        customers: customersReducer,
        adresses: adressesReducer,
        services: servicesReducer,
        workers: workersReducer,
    }
})