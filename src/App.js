import './App.css';
import {Home} from './Home.js'; // домашняя страница
import {Navigation} from './Navigation';  //Компонент для навигации по приложению

//компоненты на AntD 
import {ContractAntD} from './Contract/ContractAntD'; // Таблица контрактов
import {EmployeeAntD} from './Employee/EmployeeAntD'; // Таблица сотрудников

import {Example} from './WorkPlan/tableworkplan';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <div className="container">
        <Navigation/>
        <Switch>
          <Route path='/' component={Home} exact/> {/* перенаправление на Home - домашнюю страницу */}

          <Route path='/contract' component={ContractAntD}/> {/* перенаправление на Таблицу Контрактов */}

          <Route path='/employee' component={EmployeeAntD}/> {/* перенаправление на Таблицу Сотрудников */}
        
          <Route path='/tableworkplan' component={Example}/> {/* перенаправление на 2 Таблицу контрактов с AntD */}
        </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;