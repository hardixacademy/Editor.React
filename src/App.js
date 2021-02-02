import { Route, Switch } from 'react-router-dom';
import { HomePage, TemplatePage } from './pages';

function App() {
  return (
    <Switch>
      <Route exact path='/'><HomePage /></Route>
      <Route path='/template'><TemplatePage /></Route>
    </Switch>
  );
}

export default App;
