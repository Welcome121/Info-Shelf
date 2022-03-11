import React from 'react';
import { makeStyles } from '@mui/styles';
import Header from '../../components/Header.js'
import Navbar from '../../components/Navbar.js'
import OrdersTables from './components/OrdersTable.js'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    },
    main: {
        height: '100vh',
        display: 'flex',
        width: '1200px',
        margin: '0 auto',
    },
    toolbar: {
        minHeight: '64px'
    }
}))

export default function Orders() {
    const classes = useStyles()

    return (
        <div className= { classes.root }>
            <Header />
            <div className={ classes.toolbar }></div>
            <main className = { classes.main }>
                <Container maxWidth="lg">
                    <Box display="flex">
                        <div><Navbar /></div>
                        <OrdersTables/>
                    </Box>
                </Container>
            </main>
        </div>
    )
}
