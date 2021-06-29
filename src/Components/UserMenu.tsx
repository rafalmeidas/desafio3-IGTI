import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Icon, IconButton } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';
import { IUser, signOutUserEndpoint } from '../Services/api';

interface IUserMenu {
  OnSignOut: () => void;
  user: IUser;
}

const useStyles = makeStyles({
  headerMenu: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '16px',
    borderBottom: '1px solid rgb(253, 236, 234)',
    marginBottom: '4px',
    '& > *': {
      marginBottom: '4px',
    },
  },
});

export default function UserMenu(props: IUserMenu) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function signOut() {
    signOutUserEndpoint();
    props.OnSignOut();
  }

  return (
    <div>
      <IconButton
        aria-label="Usuário"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar>
          <Icon>person</Icon>
        </Avatar>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className={classes.headerMenu}>
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
          <div>{props.user.nome}</div>
          <small>{props.user.email}</small>
        </div>
        <MenuItem onClick={signOut}>Sair</MenuItem>
      </Menu>
    </div>
  );
}
