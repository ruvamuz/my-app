// Данная таблица является 1 безуспешной попыткой подружить работающую таблицу с AntD
import {React, Component, } from 'react';
import { Table, Space, Popconfirm } from 'antd';
//import EditContract from './Contract/EditContractModal-antd';
import axios from 'axios';
import AddContractModalAntd from './AddContractModal-antd'
import EditContract from './EditContract-AntD'

export class TableWork extends Component{
    //Конструктор объявляющий переменные для значении
    constructor(props){
        super(props);
        this.state={deps:[], //переменная 
            addModalShow: false, //переннная модального окна добавления значения в таблицу
            editModalShow:false} //переннная модального окна редактирования значения в таблицу
    }

    //Get json запрос на получение данных с таблицы Контрактов
    refreshList(){
        axios.get(process.env.REACT_APP_API+'contract')
        .then(res => {
            this.setState({deps: res.data})
        })
        .catch(error =>{
            console.log(error);
        })
    }

    //Запрос таблицы при монторовании элемента TableWork
    componentDidMount(){
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
    deleteContract(contrId){
        axios.delete(process.env.REACT_APP_API+'contract/'+contrId,
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

    render(){
    //Переменная столбцов таблицы
    const columns = [
    { title: 'Идентификатор', dataIndex: 'Id', key: 'Id', render: text => <p>{text}</p>, },
    { title: 'Краткое наименование', dataIndex: 'ShortNameContract', key: 'ShortNameContract',  },
    { title: 'Полное наименование',  dataIndex: 'FullNameContract',  key: 'FullNameContract',
    },
        
    // В данном месте формируется Столбец в котором хранятся кнопки Действий.
    { title: 'Действия', key: 'option',
        render: (item) => (
            <Space size="middle">
            <EditContract item={item}/>
            |
            <Popconfirm title="Уверены в удалении?" onConfirm={() => this.deleteContract(item.Id)}>
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
            <AddContractModalAntd/>            
        </div>
        )
    }
}