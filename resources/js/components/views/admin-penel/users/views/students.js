import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Avatar from "@material-ui/core/Avatar";
import TableHead from "@material-ui/core/TableHead";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    avatar: {
        width: theme.spacing(25),
        height: theme.spacing(25),
    }
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
    return { name, calories, fat };
}

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

export default function CustomPaginationActionsTable() {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [items, setItems] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        fetch(`api/user/studList`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.token
                }
            }).then(async response => {
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            } else {
                response.json().then(function (data) {
                    setItems(data);
                });
            }
        })
    }, [])

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell>Изоброжение</TableCell>
                        <TableCell>ФИО</TableCell>
                        <TableCell>Логин</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>роль</TableCell>
                        <TableCell>телефон</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                            ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : items
                        ).map((item) => (
                        <TableRow key={item.id}>
                            <TableCell component="th" scope="row" style={{ width: 160 }}>
                                <Avatar alt={item.username} src={item.avatar} className={classes.avatar}/>
                            </TableCell>
                            <TableCell component="th" scope="row" style={{ width: 160 }}>
                                {item.username}
                            </TableCell>
                            <TableCell style={{ width: 160 }} >
                                {item.login}
                            </TableCell>
                            <TableCell style={{ width: 160 }} >
                                {item.email}
                            </TableCell>
                            <TableCell style={{ width: 160 }}>
                                <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                                    студент
                                </Button>
                                <Menu
                                    id="fade-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem onClick={handleClose}>Студент</MenuItem>
                                    <MenuItem onClick={handleClose}>Преподователь</MenuItem>
                                </Menu>
                            </TableCell>
                            <TableCell style={{ width: 160 }}>
                                {item.telephone_number}
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={6}
                            count={items.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

