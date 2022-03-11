import React from 'react'
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from '../../components/Header.js'
import Navbar from '../../components/Navbar.js'

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

export default function Home() {
    const classes = useStyles()

    return (
        <>
        <div className= { classes.root }>
            <Header />
            <div className={ classes.toolbar }></div>
            <main className = { classes.main }>
                <Container maxWidth="lg">
                    <Box display="flex">
                        <div><Navbar /></div>
                        <div>
                            <h1>Info Show</h1>
                            <h2>Site para visualização de tabelas</h2>
                            <p>Escolha a esquerda a tabela que deseja visualizar</p>
                        </div>
                    </Box>
                </Container>
            </main>
        </div>
        </>
    )
}