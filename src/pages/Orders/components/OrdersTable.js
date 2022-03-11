import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
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
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';

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
      display: 'flex',
      justifyContent: 'space-between'
    },
    table: {
      minWidth: 700,
    },
    tableRow: {
      backgroundColor: deepPurple[500],
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
  }));

const rows = [
    {
        id: '0', status:'em andamento', funcionario:'cleiton da silva', cliente: 'Arthur', expedicao: '01/01/2022', validade: '10/01/2022', prioridade: '3'
    },
    {
        id: '1', status:'finalizado', funcionario:'cleiton da silva', cliente: 'Arthur', expedicao: '01/01/2022', validade: '10/01/2022', prioridade: '3'
    },
    {
        id: '2', status:'finalizado', funcionario:'cleiton da silva', cliente: 'Arthur', expedicao: '01/01/2022', validade: '10/01/2022', prioridade: '3'
    },
    {
        id: '3', status:'em andamento', funcionario:'cleiton da silva', cliente: 'Arthur', expedicao: '01/01/2022', validade: '10/01/2022', prioridade: '3'
    },
    {
      id: '4', status:'em andamento', funcionario:'cleiton da silva', cliente: 'Arthur', expedicao: '01/01/2022', validade: '10/01/2022', prioridade: '3'
  },
  {
    id: '5', status:'em andamento', funcionario:'cleiton da silva', cliente: 'Arthur', expedicao: '01/01/2022', validade: '10/01/2022', prioridade: '3'
},
{
  id: '6', status:'em andamento', funcionario:'cleiton da silva', cliente: 'Arthur', expedicao: '01/01/2022', validade: '10/01/2022', prioridade: '3'
},
{
  id: '7', status:'em andamento', funcionario:'cleiton da silva', cliente: 'Arthur', expedicao: '01/01/2022', validade: '10/01/2022', prioridade: '3'
},
]

export default function OrdersTable() {
    const classes = useStyles()

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    return (
      <div className={classes.margin}>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonMargin}
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
                  <TableCell align='center'>
                    <Typography 
                      className={classes.status}

                      style={{
                        backgroundColor:
                        ((row.status === 'em andamento' && 'orange') ||
                        (row.status === 'finalizado' && 'green')),
                        width: '100%'
                      }}
                    > {row.status} </Typography>
                  </TableCell>
                  <TableCell align='center'>{row.funcionario}</TableCell>
                  <TableCell align='center'>{row.cliente}</TableCell>
                  <TableCell align='center'>{row.expedicao}</TableCell>
                  <TableCell align='center'>{row.validade}</TableCell>
                  <TableCell align='center'>{row.prioridade}</TableCell>

                  <TableCell align='center'>
                    <IconButton aria-label="delete">
                      <DeleteIcon/>
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
      </div>
    )
}