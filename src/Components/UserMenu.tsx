import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { signOutUserEndpoint } from '../Services/api';
import { makeStyles } from '@material-ui/core/styles';

interface IUserMenu {
  OnSignOut: () => void;
}

const useStyles = makeStyles({
  text: {
    color: '#FFF',
  },
});

export default function UserMenu(props: IUserMenu) {
  const classes = useStyles();

  function signOut() {
    signOutUserEndpoint();
    props.OnSignOut();
  }

  return (
    <Box component="div">
      <Button className={classes.text} onClick={signOut}>
        Sair
      </Button>
    </Box>
  );
}
