import React, { useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import { useSelector, useDispatch } from 'react-redux'
import Popup from './Popup'
import OrderForm from '../pages/Orders/OrderForm'

  const useStyles = makeStyles((theme) => ({
    buttonMargin: {
      margin: '5px 0px'
    },
    buttonsMargin: {
      marginTop: theme.spacing(2),
      margin: '10px 10px'
    },
    margin: {
      marginTop: theme.spacing(2),
      margin: '10px 0px'
    },
    toolBar: {
      backgroundColor: blue[100],
      display: 'flex',
      justifyContent: 'space-between'
    },
    table: {
      minWidth: 700,
    },
    tableRow: {
      backgroundColor: blue[900],
      "& th": {
        fontWeight: 'bold',
        color: blue[100]
      }
    },
    status: {
      fontSize: '0.75rem',
      color: 'white',
      backgroundColor: 'grey',
      borderRadius: 8,
      padding: '3px 10px',
      display: 'inline-block'
    },
    pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3)
    }
  })); 

export default function OrdersTable() {
    const classes = useStyles()

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dataCriacao, setDC] = useState(null)
    const [dataInicio, setDI] = useState(null)
    const [openPopup, setOpenPopup] = useState(false)
    const rows = useSelector((state) => state.orders.array)
    const dispatch = useDispatch()

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const handleNewOrder = async (event) => {

      setOpenPopup(true)
    }

    return (
      <div className={classes.margin}>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonMargin}
            onClick={ handleNewOrder }
          >
            CRIAR ORDEM DE SERVIÇO
          </Button>
        <TableContainer component={Paper}>
          <Table aria-label="simple table" className={classes.table}>
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell align='center'>ID</TableCell>
                <TableCell align='center'>STATUS</TableCell>
                <TableCell align='center'>FUNCIONÁRIO</TableCell> 
                <TableCell align='center'>CLIENTE</TableCell>
                <TableCell align='center'>EXPEDIÇÃO</TableCell>
                <TableCell align='center'>VALIDADE</TableCell>
                <TableCell align='center'>PRIORIDADE</TableCell>
                <TableCell align='center'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  <TableCell align='center'>{row.id}</TableCell>
                  <TableCell align='center'>{ null }</TableCell>
                  <TableCell align='center'>{row.funcionario.nome}</TableCell>
                  <TableCell align='center'>{row.cliente.nome}</TableCell>
                  <TableCell align='center'>{ null }</TableCell>
                  <TableCell align='center'>{ null }</TableCell>
                  <TableCell align='center'>{row.prioridade}</TableCell>

                  <TableCell align='center'>
                    <IconButton aria-label="edit">
                      <EditIcon color="primary"/>
                    </IconButton>
                    <IconButton aria-label="delete">
                      <DeleteIcon color="secondary"/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className={classes.toolBar}>
            <div style={{marginLeft: '8px', marginTop: '8px'}}>
              <Button
                variant="outlined"
                color="primary"
              >
                DEFINIR FILTROS
              </Button>
              <Button
                variant="outlined"
                color="primary"
                style={{marginLeft: '5px'}}
              >
                LIMPAR FILTROS
              </Button>
            </div>
            <TablePagination 
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              />
          </div>
        </TableContainer>
        <Popup
          openPopup = {openPopup}
          setOpenPopup = {setOpenPopup}
        >
          <Paper className={classes.pageContent}>
            <OrderForm />
          </Paper>
        </Popup>
      </div>
    )
}