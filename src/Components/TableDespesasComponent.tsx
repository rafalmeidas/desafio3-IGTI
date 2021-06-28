import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useParams, useHistory } from 'react-router-dom';
import { getDespesasEndpoint, IDespesas } from '../Services/api';
import { Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { currentMoney } from '../Utils/format';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#4BA836',
      color: '#000',
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#9BFF85',
      },
    },
  })
)(TableRow);

const useStyles = makeStyles({
  containerSelect: {
    display: 'flex',
    flexDirection: 'row',
    flex: '1',
  },
  selectLeft: {
    marginRight: '20px',
  },
  containerTable: {
    marginTop: '50px',
  },
  table: {
    minWidth: 700,
  },
});

const HEADER_TABLE = ['Despesas', 'Categoria', 'Dia', 'Valor (R$)'];

const meses = [
  { valor: '01', nome: 'Janeiro' },
  { valor: '02', nome: 'Fevereiro' },
  { valor: '03', nome: 'Março' },
  { valor: '04', nome: 'Abril' },
  { valor: '05', nome: 'Maio' },
  { valor: '06', nome: 'Junho' },
  { valor: '07', nome: 'Julho' },
  { valor: '08', nome: 'Agosto' },
  { valor: '09', nome: 'Setembro' },
  { valor: '10', nome: 'Outubro' },
  { valor: '11', nome: 'Novembro' },
  { valor: '12', nome: 'Dezembro' },
];

export default function TableDespesasComponent() {
  const classes = useStyles();
  const params = useParams<{ mes: string }>();
  const history = useHistory();
  const anoMes = params.mes;
  const [ano, mes] = anoMes.split('-');
  const [despesas, setDespesas] = useState<IDespesas[]>([]);

  function mudaAnoMes(ano: string, mes: string) {
    history.push(`/despesas/${ano}-${mes}`);
  }

  useEffect(() => {
    Promise.all([getDespesasEndpoint(anoMes)]).then(([res]) =>
      setDespesas(res)
    );
  }, [anoMes]);

  useEffect(() => {
    Promise.all([getDespesasEndpoint(`${ano}-${mes}`)]).then(([res]) =>
      setDespesas(res)
    );
  }, [ano, mes]);

  let totalMes = 0;
  for (const despesa of despesas) {
    totalMes += despesa.valor;
  }

  return (
    <>
      <Box
        component="div"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <Box component="div" className={classes.containerSelect}>
          <Select
            className={classes.selectLeft}
            value={ano}
            onChange={e => mudaAnoMes(e.target.value as string, mes)}
          >
            <MenuItem value="2020">2020</MenuItem>
            <MenuItem value="2021">2021</MenuItem>
          </Select>

          <Select
            value={mes}
            onChange={e => mudaAnoMes(ano, e.target.value as string)}
          >
            {meses.map(opcaoMes => (
              <MenuItem key={opcaoMes.valor} value={opcaoMes.valor}>
                {opcaoMes.nome}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box component="div">
          <span>
            Total Mensal: <strong>{currentMoney(totalMes)}</strong>
          </span>
        </Box>
      </Box>

      <TableContainer component={Paper} className={classes.containerTable}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {HEADER_TABLE.map((hCell, index) => (
                <StyledTableCell key={index}>{hCell}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {despesas.map(bCell => (
              <StyledTableRow key={bCell.id}>
                <StyledTableCell>{bCell.descricao}</StyledTableCell>
                <StyledTableCell>{bCell.categoria}</StyledTableCell>
                <StyledTableCell>{bCell.dia}</StyledTableCell>
                <StyledTableCell>{currentMoney(bCell.valor)}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
