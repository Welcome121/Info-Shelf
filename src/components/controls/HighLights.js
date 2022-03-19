import React from 'react'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    highLight: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
})

export default function HighLight(props) {

    const classes = useStyles()
    const { title, backColor } = props

    return(
        <Typography className={ classes.highLight } style={{ backgroundColor: backColor }}>{title}</Typography>
    )
}