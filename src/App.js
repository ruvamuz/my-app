import './App.css';
import {Home} from './Home.js'; // домашняя страница
import {Navigation} from './Navigation';  //Компонент для навигации по приложению

//Попытка добаления компонентов на AntD 
import {CalendarWork} from './Calendar/Calendar'; // Стандартный компонент календаря 
import {ContractAntD} from './Contract/ContractAntD'; // Таблица контрактов
import {EmployeeAntD} from './Employee/EmployeeAntD'; // Таблица сотрудников
import {WorkPlan} from './WorkPlan/WorkPlan' //Таблица план
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

          <Route path='/calendar' component={CalendarWork}/> {/* перенаправление на страницу Календаря */}
        
          <Route path='/workplan' component={WorkPlan}/> {/* перенаправление на 2 Таблицу контрактов с AntD */}

          <Route path='/tableworkplan' component={Example}/> {/* перенаправление на 2 Таблицу контрактов с AntD */}
        </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;