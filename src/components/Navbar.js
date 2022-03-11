import React from 'react'
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2), // 8px * 2 = 16px
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2),
        width:'250px'
    },
}))

const tables = [
    {id: 0, name: 'Ordens de Serviço'},
    {id: 1, name: 'Funcionarios'},
    {id: 2, name: 'Clientes'}
]

export default function Navbar() {
    const classes = useStyles()

    return (
        <Paper elevation="2" className={ classes.root }>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Tabelas</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    {
                        tables.map((item) => (
                            <FormControlLabel value={item.id} control={<Radio />} label={item.name} />
                        ))
                    }
                </RadioGroup>
            </FormControl>
        </Paper>
    )
}