import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';

import { initList, selectListData, download } from '../ListSlice';

const List = () => {
    const dispatch = useDispatch();
    const data = useSelector( selectListData );
    const history = useHistory();

    useEffect(() => { dispatch(initList()) }, []);

    return (
        <Box maxWidth="lg" sx={{mx: 'auto'}}>
            <TableContainer component={ Paper }>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Название записи</TableCell>
                            <TableCell align="right" />
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ cursor: 'pointer' }}>
                        {data.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={() => history.push(`/audio/${row.id}`)}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{ row.name }</TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        aria-label="Скачать"
                                        size={ 'small' }
                                        color={ 'default' }
                                        onClick={ () => dispatch(download(row.id)) }
                                    >
                                        <DownloadIcon fontSize={ 'small' } />
                                    </IconButton>
                                    <IconButton
                                        aria-label="Удалить"
                                        size={ 'small' }
                                        color={ 'default' }
                                        onClick={ () => {} }
                                    >
                                        <DeleteIcon fontSize={ 'small' } />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
};

export default List;