import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useTable from '../../components/useTable'
import { makeStyles } from '@mui/styles'
import { Paper, TableBody, TableCell, TableRow } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(2),
        padding: theme.spacing(1)
    }
}))

const headCells = [
    {id: 'fullName', label: 'Nome'},
    {id: 'email', label: 'Email'},
    {id: 'mobile', label: 'Telefone'},
    {id: 'specializations', label: 'Especializações'},
    {id: 'entry_time', label: 'Hora de entrada'},
    {id: 'exit_time', label: 'Hora de saída'}
]

export default function Customers () {

    const classes = useStyles()
    const [records, setRecords] = useState(useSelector(state => state.workers.array))
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPaging,
    } = useTable(records, headCells)

    return (
        <>
            <Paper className={classes.pageContent}>
                {/*  <OrderForm /> */}
            <TblContainer>
                <TblHead />
                <TableBody>
                    {
                        recordsAfterPaging().map(item => (
                            <TableRow key={item.id}>
                                <TableCell align='center'>{item.nome}</TableCell>
                                <TableCell align='center'>{item.email}</TableCell>
                                <TableCell align='center'>{item.telefone}</TableCell>
                                <TableCell align='center'>{item.especializacoes.map(specialization => specialization.svc + ', ')}</TableCell>
                                <TableCell align='center'>{item.hora_entrada}</TableCell>
                                <TableCell align='center'>{item.hora_saida}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </TblContainer>
            <TblPagination />
            </Paper>
        </>
    )
}