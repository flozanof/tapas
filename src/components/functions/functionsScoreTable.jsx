import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { blueGrey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.h4,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const listScores = (scores, loggedCookerId, activePageEvent, page, modified) =>  {
    return (
        scores.map((row) => (
            <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.score.taste}</TableCell>
                <TableCell align="right">{row.score.presentation}</TableCell>
                <TableCell align="right">{row.score.elaboration}</TableCell>
                <TableCell align="right">{row.score.product}</TableCell>
                <TableCell align="right">{Object.values(row.score).reduce((total, num) => {
                                                                return total + num;
                                                            })}
                </TableCell>
                { modified &&  
                    <TableCell align="center">
                        {(row.id !== loggedCookerId) &&
                            <Button variant="outlined" sx={{ color: blueGrey[400] }} onClick={() => activePageEvent(page, row.id)} >
                                <EditIcon sx={{ color: blueGrey[400], "& :hover": { color: blueGrey[600] } }} />
                            </Button>
                        }
                    </TableCell>
                }
            </TableRow>
        ))
    )
};

export const scoreCookersTable = (title, scores, loggedCookerId, activePageEvent, page, modified) =>
{
    return (
        <div>
            <Item>{title}</Item>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="right">Sabor</TableCell>
                            <TableCell align="right">Presentación</TableCell>
                            <TableCell align="right">Elaboración</TableCell>
                            <TableCell align="right">Producto</TableCell>
                            <TableCell align="right">Total</TableCell>
                            { modified && <TableCell align="center"/> }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listScores(scores, loggedCookerId, activePageEvent, page, modified)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
} 

