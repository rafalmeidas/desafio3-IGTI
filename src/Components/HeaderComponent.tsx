import { makeStyles } from '@material-ui/core/styles';
import { IUser } from '../Services/api';
import UserMenu from './UserMenu';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4BA836',
    marginBottom: '20px',
  },
});

interface IHeaderComponentProps {
  OnSignOut: () => void;
  user: IUser;
}

export default function HeaderComponent(props: IHeaderComponentProps) {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <h1>Despesas Mensais</h1>
      <UserMenu user={props.user} OnSignOut={props.OnSignOut} />
    </header>
  );
}
