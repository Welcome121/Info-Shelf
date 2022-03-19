import React from 'react'
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from 'react-redux' 

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

export default function Navbar(props) {

    const { setProps } = props
    const classes = useStyles()

    const [value, setValue] = React.useState('null')
    const dispatch = useDispatch()

    const handleChange = async (event) => {
        await setValue(event.target.value)
        await setProps(event.target.value)
    }
    
    return (
        <Paper elevation="2" className={ classes.root }>
            <FormControl component="fieldset">
                <FormLabel component="legend">Tabela</FormLabel>
                <RadioGroup aria-label="tables" name="tables1" value={value} onChange={handleChange}>
                    <FormControlLabel value="serviceOrders" control={<Radio />} label="Ordens de Serviço" />
                    <FormControlLabel value="workers" control={<Radio />} label="Funcionários" />
                    <FormControlLabel value="customers" control={<Radio />} label="Clientes" />
                </RadioGroup>
                </FormControl>
        </Paper>
    )
}