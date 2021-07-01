import { makeStyles } from '@material-ui/core/styles';
import { IUser } from '../Services/api';
import UserMenu from './UserMenu';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#3F51B5',
    color: '#FFF',
  },
  text: {
    textAlign: 'center',
    flexShrink: 1,
    flexGrow: 1,
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
      <h1 className={classes.text}>Despesas Mensais</h1>
      <div>
        <UserMenu OnSignOut={props.OnSignOut} />
      </div>
    </header>
  );
}
