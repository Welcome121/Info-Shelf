import React, { useEffect } from 'react';
import Title from './components/Title'
import OrdersTable from './components/OrdersTable'
import Header from './components/Header'
import Navbar from './components/Navbar';  
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import deepPurple from '@material-ui/core/colors/deepPurple';
import blue from '@material-ui/core/colors/blue';
import { useDispatch, useSelector } from 'react-redux' 
import { getToken } from './redux/tokenSlice'
import { loadOrders } from './redux/ordersSlice'
import { loadCustomers } from './redux/customersSlice'
import { loadAdresses } from './redux/adressesSlice'
import { loadServices } from './redux/servicesSlice'
import { loadWorkers } from './redux/workersSlice'
import Orders from './pages/Orders/Orders'
import Customers from './pages/Customers/Customers';
import Workers from './pages/Workers/Workers'
import { getDates } from './redux/ordersSlice';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
      height: '100vh',
      display: 'flex',
      width: '1300px',
      margin: '0 auto',
  },
  toolbar: {
      minHeight: '64px'
  }
})

function App() {
  const classes = useStyles()
  const theme = createTheme({
    palette: {
      primary: {
        light: deepPurple[50],
        main: deepPurple[500],
        dark: deepPurple[800],
      },
      secondary: {
        light: blue[100],
        main: blue[500],
        dark: blue[900]
      },
    }
  })

  const token = useSelector(state => state.token.key)
  const workers = useSelector(state => state.workers.array)
  const customers = useSelector(state => state.customers.array)
  const dispatch = useDispatch()
  const [table, setTable] = React.useState('')

  useEffect(async () => {
    await dispatch(getToken())
    await dispatch(loadOrders())
    await dispatch(getDates())
    await dispatch(loadCustomers())
    await dispatch(loadAdresses())
    await dispatch(loadServices())
    await dispatch(loadWorkers())

  }, [dispatch])
  
  if(token == null || workers == null || customers == null) return <></>

  return (
    <ThemeProvider theme={theme}>
      <div className= { classes.root }>
        <Header />
        <div className={ classes.toolbar }></div>
          <main className = { classes.main }>
            <Container maxWidth="lg">
              <Box display="flex">
                <div><Navbar setProps={ setTable } propsValue={ table }/></div>
                {
                  (table === '' && <Title />) ||
                  (table === 'serviceOrders' && <Orders />) ||
                  (table === 'customers' && <Customers />) ||
                  (table === 'workers' && <Workers />)
                }
              </Box>
            </Container>
          </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
