import React from 'react';
import Home from './pages/Home'
import Orders from './pages/Orders';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import blue from '@material-ui/core/colors/blue';

const useStyles = makeStyles({
  root: {
   }
})

function App() {
  const classes = useStyles()
  const theme = createTheme({
    palette: {
      primary: {
        light: deepPurple[200],
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

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
