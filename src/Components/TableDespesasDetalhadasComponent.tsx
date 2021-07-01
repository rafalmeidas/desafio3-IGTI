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
import { currentMoney } from '../Utils/format';
import { IDespesas } from '../Services/api';

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

export default function TableDespesasDetalhadasComponent(props: {
  despesas: IDespesas[];
}) {
  const classes = useStyles();

  const despesas = props.despesas;

  return (
    <TableContainer component={Paper} className={classes.containerTable}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {HEADER_TABLE.map((hCell, index) => (
              <StyledTableCell key={index}>{hCell}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {despesas.map(bCell => (
            <TableRow key={bCell.id}>
              <TableCell>{bCell.descricao}</TableCell>
              <TableCell>{bCell.categoria}</TableCell>
              <TableCell>{bCell.dia}</TableCell>
              <TableCell>{currentMoney(bCell.valor)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
