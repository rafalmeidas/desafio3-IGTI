import TableDespesasDetalhadasComponent from '../Components/TableDespesasDetalhadasComponent';
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Theme, makeStyles } from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useParams, useHistory } from 'react-router-dom';
import { getDespesasEndpoint, IDespesas, IUser } from '../Services/api';
import { Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { currentMoney } from '../Utils/format';
import TableDespesasResumo from '../Components/TableDespesasResumo';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
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
}));

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

export default function DespesasPage(props: { user: IUser }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
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

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box
        component="div"
        display="flex"
        justifyContent="flex-end"
        marginTop="20px"
      >
        <p>
          Bem vindo ao sistema <span>{props.user.nome}</span>
        </p>
      </Box>
      <Box
        marginTop="20px"
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
      <Box className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          centered
        >
          <Tab label="RESUMO" />
          <Tab label="DETALHADO" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TableDespesasResumo despesas={despesas} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TableDespesasDetalhadasComponent despesas={despesas} />
      </TabPanel>
    </div>
  );
}
