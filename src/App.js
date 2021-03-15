import './App.css';

import {Home} from './Home.js';
import {Contract} from './Contract/Contract';
import {Employee} from './Employee/Employee';
import {Navigation} from './Navigation';
import {CalendarWork} from './Calendar/Calendar';
import {TableWork} from './Table';
import {EditableTable} from './Table2'

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <div className="container">
          <h4 className="m3 d-flex justify-content-center">
            React Js 
          </h4>
        <Navigation/>
        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/contract' component={Contract}/>
          <Route path='/employee' component={Employee}/>
          <Route path='/calendar' component={CalendarWork}/>
          <Route path='/table'    component={TableWork}/>
          <Route path='/table2'   component={EditableTable}/>
        </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
