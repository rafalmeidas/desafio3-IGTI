import React, { useEffect, useState } from 'react';
import DespesasPage from './Pages/DespesasPage';
import Container from '@material-ui/core/Container';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import HeaderComponent from './Components/HeaderComponent';
import { getUserEndpoint, IUser } from './Services/api';
import { LoginScreen } from './Components/LoginScreen';

function App() {
  const mesAtual = obtemMesAtual();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserEndpoint().then(
      user => setUser(user),
      () => setUser(null)
    );
  }, []);

  function signOut() {
    setUser(null);
  }

  if (user) {
    return (
      <div className="App">
        <HeaderComponent user={user} OnSignOut={signOut} />
        <HashRouter>
          <Switch>
            <Route path="/despesas/:mes">
              <Container maxWidth="lg">
                <DespesasPage />
              </Container>
            </Route>
            <Redirect to={{ pathname: '/despesas/' + mesAtual }} />
          </Switch>
        </HashRouter>
      </div>
    );
  } else {
    return <LoginScreen onSignIn={setUser} />;
  }
}

export function obtemMesAtual(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}-${String(month).padStart(2, '0')}`;
}

export default App;
