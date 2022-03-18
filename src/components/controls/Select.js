import React from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import {FormHelperText, Select as MuiSelect} from '@material-ui/core';

export default function Select(props) {
    
    const { name, label, value, error=null, onChange, options } = props
    let titles = []

    if(name === 'id_endereco') titles = options.map(item => `${item.rua}/${item.bairro}/${item.cidade}/${item.estado}`)
    else if (name === 'id_servico') titles = options.map(item => item.svc)
    else titles = options.map(item => item.nome)


    return (
        <FormControl
            fullWidth
            variant="outlined"
            {...(error && {error:true})}
        >
            <InputLabel id="select">{label}</InputLabel>
            <MuiSelect 
                id="select"
                label={label}
                name={name}
                value={value}
                onChange={onChange}
            >
                <MenuItem value="">None</MenuItem>
                {
                    options.map(item => (
                        <MenuItem value={item.id.toString()}>{titles[(item.id - 1)]}</MenuItem>
                    ))
                }
            </MuiSelect>
            {error && <FormHelperText>{ error }</FormHelperText>}
        </FormControl>
    )
}