import React from 'react'
import Radio from '@mui/material/Radio';
import {RadioGroup as MuiRadioGroup} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioGroup(props) {

    const { name, label, value, onChange, items } = props

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel> 
            <MuiRadioGroup row
            name={name}
            value={value}
            onChange={onChange}
            >

                {
                    items.map((item) => (
                        <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.title} />
                    ))
                }
            </MuiRadioGroup> 
        </FormControl>
    )
}