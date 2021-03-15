import './App.css';
import {Home} from './Home.js'; // домашняя страница
import {Contract} from './Contract/Contract'; //Компонент таблицы контрактов - Без AntD
import {Employee} from './Employee/Employee'; //Компонент таблицы сотрудников - Без AntD
import {Navigation} from './Navigation';  //Компонент для навигации по приложению

//Попытка добаления компонентов на AntD 
import {CalendarWork} from './Calendar/Calendar'; // Стандартный компонент календаря 
import {TableWork} from './Table'; // 1 таблица
import {EditableTable} from './Table2'; // 2 таблица

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
          <Route path='/' component={Home} exact/> {/* перенаправление на Home - домашнюю страницу */}

          <Route path='/contract' component={Contract}/> {/* перенаправление на Таблицу контрактов */}

          <Route path='/employee' component={Employee}/> {/* перенаправление на Таблицу сотрудников */}

          <Route path='/calendar' component={CalendarWork}/> {/* перенаправление на страницу Календаря */}
          
          <Route path='/table'    component={TableWork}/> {/* перенаправление на 1 Таблицу контрактов с AntD */}

          <Route path='/table2'   component={EditableTable}/> {/* перенаправление на 2 Таблицу контрактов с AntD */}
        </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;