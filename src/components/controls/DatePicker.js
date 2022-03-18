import React from 'react'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';


export default function DatePicker(props) {

    const { name, label, value, onChange } = props
    
      const convertToDefEventPara = (nome, value) => ({
          target: {
              name, value
          }
      })

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
                name={name}
                label={label}
                inputFormat="dd/MM/yyyy"
                value={value}
                onChange={date => onChange(convertToDefEventPara(name, date))}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )
}