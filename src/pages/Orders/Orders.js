import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import OrderForm from './OrderForm'
import useTable from '../../components/useTable'
import { makeStyles } from '@mui/styles'
import { Paper, TableBody, TableCell, TableRow } from '@material-ui/core'
import { Toolbar } from '@material-ui/core'
import Controls from '../../components/controls/Controls'
import AddIcon from '@material-ui/icons/Add'
import Popup from '../../components/Popup'
import { addOrder, editOrder, deleteOrder } from '../../redux/ordersSlice'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    pageContent: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
    },
}))

const headCells = [
    {id: 'id', label: 'ID'},
    {id: 'status', label: 'STATUS'},
    {id: 'workerName', label: 'FUNCIONARIO'},
    {id: 'clientName', label: 'CLIENTE'},
    {id: 'timestamp_criation', label: 'EXPEDIÇÃO'},
    {id: 'timestamp_initiation', label: 'VALIDADE'},
    {id: 'priority', label: 'PRIORIDADE'},
    {id: 'emptySpace', label: ''}
]

export default function Orders() {

    const classes = useStyles()
    const dispatch = useDispatch()
    const [recordForEdit, setRecordForEdit] = useState(null)
    const records = useSelector(state => state.orders.array)
    const dateNow = new Date() / 1000
    const dates_criation = useSelector(state => state.orders.creationDates)
    const dates_start = useSelector(state => state.orders.startDates)
    const [openPopup, setOpenPopup] = useState(false)
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
    } = useTable(records, headCells)

    const newOrder = (order) => {
        dispatch(addOrder(order))
        setOpenPopup(false)
    }

    const updateOrder = (order, orderID) => {
        dispatch(editOrder({payload: order, orderId: orderID}))
        setOpenPopup(false)
    }

    const handleEdit = (item) => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    return (
        <Paper className={classes.pageContent}>
            <Toolbar>
                <Controls.Button
                    size="midium"
                    text="CRIAR ORDEM DE SERVIÇO"
                    startIcon = {<AddIcon />}
                    onClick= {() => setOpenPopup(true)}
                />
            </Toolbar>
            <TblContainer>
                <TblHead />
                <TableBody>
                    {
                        recordsAfterPagingAndSorting().map(item => (
                            <TableRow key={item.id}>
                                <TableCell align='center'>{records.findIndex(x => x.id === item.id)}</TableCell>
                                {
                                    ((item.timestamp_inicio + item.tempo_estimado * 60) < dateNow && <TableCell align='center'>Finalizada</TableCell>) ||
                                    ((item.timestamp_inicio + item.tempo_estimado * 60) > dateNow && <TableCell align='center'>Atribuida</TableCell>)
                                }
                                <TableCell align='center'>{item.funcionario.nome}</TableCell>
                                <TableCell align='center'>{item.cliente.nome}</TableCell>
                                <TableCell align='center'>{dates_criation[records.findIndex(x => x.id === item.id)]}</TableCell>
                                <TableCell align='center'>{dates_start[records.findIndex(x => x.id === item.id)]}</TableCell>
                                {
                                    (item.prioridade === 1) && (<TableCell align='center'>BAIXA</TableCell>) ||
                                    (item.prioridade === 2) && (<TableCell align='center'>MÉDIA</TableCell>) ||
                                    (item.prioridade === 3) && (<TableCell align='center'>ALTA</TableCell>) ||
                                    (item.prioridade === 4) && (<TableCell align='center'>URGENTE</TableCell>) 
                                }
                                <TableCell align='center'>
                                    <IconButton aria-label="edit">
                                        <EditIcon color="primary"
                                            onClick={() => {handleEdit(item)}}
                                        />
                                    </IconButton>
                                    <IconButton aria-label="delete">
                                        <DeleteIcon color="secondary"
                                            onClick={() => {dispatch(deleteOrder({ orderId: item.id }))}}
                                        />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </TblContainer>
            <TblPagination />

            <Popup
                title={recordForEdit === null? "NOVA ORDEM DE SERVIÇO" : "EDIÇÃO DE ORDEM DE SERVIÇO"}
                openPopup = {openPopup}
                setOpenPopup = {setOpenPopup}
            >
                <OrderForm 
                    isEditModal={recordForEdit !== null}
                    recordForEdit={recordForEdit}
                    setRecordForEdit={setRecordForEdit}
                    newOrder={newOrder}
                    updateOrder={updateOrder}
                    openPopup = {openPopup}
                />
            </Popup>
        </Paper>
    )
}