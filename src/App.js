import './App.css';

import {Home} from './Home.js';
import {Contract} from './Contract';
import {Employee} from './Employee';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <div className="container">
          <h3 className="m3 d-flex justify-content-center">
            React Js 
          </h3>
        <Navigation/>
        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/contract' component={Contract}/>
          <Route path='/employee' component={Employee}/>
        </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
