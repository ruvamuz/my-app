// Данная таблица является 1 безуспешной попыткой подружить работающую таблицу с AntD
import {React, Component, } from 'react';
import { Table, Space, Popconfirm,  } from 'antd';
//import EditContract from './Contract/EditContractModal-antd';
import axios from 'axios';
import AddEmployeeAntd from './AddEmployeeAntD'
import EditEmployee from './EditEmployee-AntD'

export class EmployeeAntD extends Component{
    //Конструктор объявляющий переменные для значении
    constructor(props){
        super(props);
        this.state={deps:[], //переменная 
            jobPos:[], //переменная где хранится массив Должностей
            addModalShow: false, //переннная модального окна добавления значения в таблицу
            editModalShow:false} //переннная модального окна редактирования значения в таблицу
    }


    //Get json запрос на получение данных с таблицы Контрактов
    refreshList(){
        axios.get(process.env.REACT_APP_API+'employee')
        .then(res => {
            this.setState({deps: res.data})
        })
        //.then(res => console.log(res.data))
        .catch(error =>{
            console.log(error);
        })
    }

    //Запрос таблицы при монторовании элемента TableWork
    componentDidMount(){
        //this.getJobPosition();
        //console.log(this.addModalShow)
        this.refreshList();
        this.timerID = setInterval(
            () => this.refreshList(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    //метод для удаления строки таблицы. Так и не понял как получать id строки 
    deleteEmloyee(contrId){
        axios.delete(process.env.REACT_APP_API+'employee/'+contrId,
        {
            header:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
    }
    
    openEditModal(item){
        this.setState({editModalShow: !this.state.editModalShow})
        //console.log(this.state.editModalShow)
        //console.log(item)
    }

    definitionJobPosition(id){
        console.log(id)
    }

    render(){
    //Переменная столбцов таблицы
    const columns = [
    { title: 'Идентификатор', dataIndex: 'Id', key: 'Id', render: text => <p>{text}</p>, },
    { title: 'Фамилия', dataIndex: 'Family', key: 'Family',},
    { title: 'Имя', dataIndex: 'Name', key: 'Name',},
    { title: 'Отчество', dataIndex: 'Patronymic', key:'Patronymic',},
    // { title: 'Полное наименование',  dataIndex: 'FullNameContract',  key: 'FullNameContract', },
    { title: 'Должность', dataIndex: 'JobPosition', key: 'JobPosition', },
    { title: 'Дата рождения', dataIndex: 'BirthDate', key: 'BirthDate' },
        
    // В данном месте формируется Столбец в котором хранятся кнопки Действий.
    { title: 'Действия', key: 'option',
        render: (item) => (
            <Space size="middle">
            <EditEmployee item={item}/>
            |
            <Popconfirm title="Уверены в удалении?" onConfirm={() => this.deleteEmloyee(item.Id)}>
            Удалить
            </Popconfirm>      
            </Space>
          ),
        },
    ];
    const {deps} = this.state;
      return(
        <div>
            {/* выводим таблицу Контракта*/}
            <Table columns={columns} dataSource={deps} />
            <AddEmployeeAntd/>  
            
            {/* <Button onClick={alert(this.jobPos)}/>          */}
        </div>
        )
    }
}