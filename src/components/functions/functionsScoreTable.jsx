import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
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


//const scoreCookersTable = (title, scoresInitial, loggedCookerId, activePageEvent, page, modified) => {
//    <ScoreCookersTable title='MIS PUNTUACIONES' scoresInitial={scoresCookers} loggedCookerId={props.loggedCookerId} activePageEvent={props.activePageEvent} page={4} modified={true} />

const ScoreCookersTable = (props) => {
    const [scores, setScores] = React.useState(props.scoresInitial);

    const [orden, setOrden] = React.useState({ columna: null, ascendente: true });

    const listScores = (loggedCookerId, activePageEvent, page, modified) => {
        return (
            scores.scores.map((row, index) => (
                <TableRow
                    key={row.cookerId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell align="center" style={{ borderRight: "1px solid #505050" }}>{index + 1}</TableCell>
                    <TableCell component="th" scope="row" style={{ borderRight: "1px solid #505050" }}>
                        {row.cookerName}
                    </TableCell>
                    {scores.weight.taste !== 0 && <TableCell align="center" style={{ borderRight: "1px solid #e0e0e0" }}>{row.score.taste}</TableCell>}
                    {scores.weight.taste !== 0 && <TableCell align="center" style={{ borderRight: "1px solid #505050" }}>{row.scoreWeighted.taste}</TableCell>}
                    {scores.weight.presentation !== 0 && <TableCell align="center" style={{ borderRight: "1px solid #e0e0e0" }}>{row.score.presentation}</TableCell>}
                    {scores.weight.presentation !== 0 && <TableCell align="center" style={{ borderRight: "1px solid #505050" }}>{row.scoreWeighted.presentation}</TableCell>}
                    {scores.weight.elaboration !== 0 && <TableCell align="center" style={{ borderRight: "1px solid #e0e0e0" }}>{row.score.elaboration}</TableCell>}
                    {scores.weight.elaboration !== 0 && <TableCell align="center" style={{ borderRight: "1px solid #505050" }}>{row.scoreWeighted.elaboration}</TableCell>}
                    {scores.weight.product !== 0 && <TableCell align="center" style={{ borderRight: "1px solid #e0e0e0" }}>{row.score.product}</TableCell>}
                    {scores.weight.product !== 0 && <TableCell align="center" style={{ borderRight: "1px solid #505050" }}>{row.scoreWeighted.product}</TableCell>}
                    <TableCell align="center" style={{ borderRight: "1px solid #505050" }}>{row.totalWeighted}</TableCell>
                    <TableCell align="center">{row.total}</TableCell>
                    {modified &&
                        <TableCell align="center">
                            {(row.id !== loggedCookerId) &&
                                <Button variant="outlined" sx={{ color: blueGrey[400] }} onClick={() => activePageEvent(page, row.cookerId)} >
                                    <EditIcon sx={{ color: blueGrey[400], "& :hover": { color: blueGrey[600] } }} />
                                </Button>
                            }
                        </TableCell>
                    }
                </TableRow>
            ))
        )
    };

    const manejarOrden = (columna) => {
        const ascendente = orden.columna === columna ? !orden.ascendente : true;
        const scoresOrdenados = [...scores.scores].sort((a, b) => {
            if (a[columna] < b[columna]) return ascendente ? -1 : 1;
            if (a[columna] > b[columna]) return ascendente ? 1 : -1;
            return 0;
        });

        scores.scores = scoresOrdenados;

        setOrden({ columna, ascendente });
        setScores(scores);
    };

    return (
        <div>
            <Item>{props.title}</Item>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" width={10}>Pos</TableCell>
                            <TableCell>Nombre</TableCell>
                            {scores.weight.taste !== 0 && <TableCell align="center">Sabor</TableCell>}
                            {scores.weight.taste !== 0 && <TableCell align="center">({scores.weight.taste})</TableCell>}
                            {scores.weight.presentation !== 0 && <TableCell align="center">Presentación</TableCell>}
                            {scores.weight.presentation !== 0 && <TableCell align="center">({scores.weight.presentation})</TableCell>}
                            {scores.weight.elaboration !== 0 && <TableCell align="center">Elaboración</TableCell>}
                            {scores.weight.elaboration !== 0 && <TableCell align="center">({scores.weight.elaboration})</TableCell>}
                            {scores.weight.product !== 0 && <TableCell align="center">Producto</TableCell>}
                            {scores.weight.product !== 0 && <TableCell align="center">({scores.weight.product})</TableCell>}
                            <TableCell align="center">
                                <TableSortLabel
                                    active={orden.columna === "totalWeighted"}
                                    direction={orden.ascendente ? "asc" : "desc"}
                                    onClick={() => manejarOrden("totalWeighted", scores)}
                                >
                                    Total
                                </TableSortLabel></TableCell>
                            <TableCell align="center">
                                <TableSortLabel
                                    active={orden.columna === "total"}
                                    direction={orden.ascendente ? "asc" : "desc"}
                                    onClick={() => manejarOrden("total", scores)}
                                >
                                    Suma
                                </TableSortLabel>
                            </TableCell>
                            {props.modified && <TableCell align="center" />}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listScores(props.loggedCookerId, props.activePageEvent, props.page, props.modified)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
}

export default ScoreCookersTable;

