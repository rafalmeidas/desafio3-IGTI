import React from 'react';
import DespesasPage from './Pages/DespesasPage';
import Container from '@material-ui/core/Container';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import HeaderComponent from './Components/HeaderComponent';

function App() {
  const mesAtual = obtemMesAtual();

  return (
    <div className="App">
      <HeaderComponent />
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
}

export function obtemMesAtual(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}-${String(month).padStart(2, '0')}`;
}

export default App;
