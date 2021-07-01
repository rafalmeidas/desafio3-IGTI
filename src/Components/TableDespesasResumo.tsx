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
import { IDespesas } from '../Services/api';
import { currentMoney } from '../Utils/format';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: '#3F51B5',
      color: '#FFF',
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

const HEADER_TABLE = ['Categoria', 'Valor (R$)'];

interface IDespesasResumo {
  id: number;
  categoria: string;
  valor: number;
}

export default function TableDespesasResumo(props: { despesas: IDespesas[] }) {
  const classes = useStyles();

  const despesas = calcDespesas(props.despesas);

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
              <StyledTableCell>{bCell.categoria}</StyledTableCell>
              <StyledTableCell>{currentMoney(bCell.valor)}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function calcDespesas(despesas: IDespesas[]): IDespesasResumo[] {
  const map = new Map<string, IDespesasResumo>();

  // cada passagem no for verifica se tem a categoria,
  // se tem ele pega o valor da categoria e soma
  for (const despesa of despesas) {
    const entrada = map.get(despesa.categoria);
    if (entrada) {
      entrada.valor += despesa.valor;
    } else {
      //se não tem a categoria no array ele a adiciona no novo map
      map.set(despesa.categoria, {
        id: despesa.id,
        categoria: despesa.categoria,
        valor: despesa.valor,
      });
    }
  }
  //converte para array
  const array = Array.from(map.values());
  //ordena o array do maior para o menor
  array.sort((a, b) => b.valor - a.valor);
  //retorna o array ordenado
  return array;
}
