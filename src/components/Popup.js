import React from 'react'
import { makeStyles } from '@mui/styles'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import { Typography } from '@mui/material'
import Controls from './controls/Controls'
import { ClassNames } from '@emotion/react'
import { SettingsInputComponentOutlined } from '@material-ui/icons'

const useStyles = makeStyles( theme => ({
    dialogTitle: {
        paddingRight: '0px'
    }
}))

export default function Popup(props) {

    const classes = useStyles()
    const { title, children, openPopup, setOpenPopup } = props

    return (
        <Dialog open={openPopup} maxWidth="md">
            <DialogTitle className={classes.dialogTitle}>
                <div style={{display: 'flex'}}>
                    <Typography variant="h6" component="div" style={{flexGrow: 1}}>{title}</Typography>
                    <Controls.Button
                        text="X"
                        color="secondary"
                        size="midium"
                        onClick={() => setOpenPopup(false)}
                    />
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}