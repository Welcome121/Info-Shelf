import React, { useState } from 'react'
import { Table, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core'
import TableSortLabel from '@mui/material/TableSortLabel';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    table: {
        '& thead th': {
            fontWeight: '600',
            color: theme.palette.secondary.light,
            backgroundColor: theme.palette.primary.dark
        },
        '& tbody td': {
            fontWeight: '300'
        },
        '& tbody tr:hover': {
            backgroundColor: theme.palette.primary.light,
            cursor: 'pointer'
        },
    }
}))

export default function useTables(records, headCells) {

    const classes = useStyles()

    const pages = [5, 10, 20]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [order, setOrder] = useState(null)
    const [orderBy, setOrderBy] = useState(null)

    const TblContainer = props => (
        <Table className={classes.table} >
            {props.children}
        </Table>
    )

    const TblHead = props => {

        const handleSortRequest = headId => {
            const isAsc = orderBy === headId && order === 'asc'
            setOrder(isAsc? 'desc' : 'asc')
            setOrderBy(headId)
        }

        return (
            <TableHead>
                <TableRow>
                    {
                        headCells.map(headCell => (
                            <TableCell key={headCell.id} align='center'>

                                    {headCell.label}

                            </TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
        )
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value,10))
        setPage(0)
    }

    const recordsAfterPaging = () => {
        return records.slice(page*rowsPerPage, (page+1)*rowsPerPage)
    }

    const TblPagination = () => (
        <TablePagination
            component="div"
            page = {page}
            rowsPerPageOptions={pages}
            rowsPerPage={rowsPerPage}
            count={records.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    )

    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPaging
    }
}