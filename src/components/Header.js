import React from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

const useStyles = makeStyles((theme) => ({
    toolBar: {
        backgroundColor: theme.palette.primary.dark,
    },
    typography: {
        color: "white"
    }
}))

function Header() {
    const classes = useStyles()

    return (
            <AppBar position="fixed" >
                <Toolbar className={ classes.toolBar }>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className={classes.typography}>
                        INFO SHELF
                    </Typography>
                </Toolbar>
            </AppBar>
    )
}

export default Header