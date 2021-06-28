import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4BA836',
    marginBottom: '20px',
  },
});
export default function HeaderComponent() {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <h1>Despesas Mensais</h1>
    </header>
  );
}
