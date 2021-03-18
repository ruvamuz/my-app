// Данная таблица является 1 безуспешной попыткой подружить работающую таблицу с AntD
import {React, Component} from 'react';
import { Table, Space, Button } from 'antd';
import {AddContractModal} from './Contract/AddContractModal';

  export class TableWork extends Component{

    //Конструктор объявляющий переменные для значении
    constructor(props){
        super(props);
        this.state={deps:[], //переменная 
            addModalShow: false, //переннная модального окна добавления значения в таблицу
            editModalShow:false} //переннная модального окна добавления значения в таблицу
    }

    //Get json запрос на получение данных с таблицы Контрактов
    refreshList(){
        fetch(process.env.REACT_APP_API+'contract')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    //Запрос таблицы при монторовании элемента TableWork
    componentDidMount(){
        this.refreshList();
    }

    //Обновление таблицы. Каждый раз при обновлении элемента TableWork, запрашивается json.
    //Плохая практика постоянно запрашивает данные. Не знаю как убрать и отказаться от этого метода.
    componentDidUpdate(){
        this.refreshList();
    }

    //метод для удаления строки таблицы. Так и не понял как получать id строки 
    deleteContract(contrId){
        if(window.confirm('Вы уверенны что хотите удалить?')){
            fetch(process.env.REACT_APP_API+'contract/'+contrId,{
                method: 'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }
    
       render(){
        //Переменная столбцов таблицы
        const columns = [
        { title: 'Идентификатор', dataIndex: 'ContractId', key: 'ContractId', render: text => <a>{text}</a>, },
        { title: 'Краткое наименование', dataIndex: 'ShortNameContract', key: 'ShortNameContract',  },
        { title: 'Полное наименование',  dataIndex: 'FullNameContract',  key: 'FullNameContract',
        },
        
        // В данном месте формируется Столбец в котором хранятся кнопки Действий, не понятно каким образом передавать id элемента в кнопки.
        { title: 'Action', key: 'action',
          render: (action, record) => (
            <Space size="middle">
             <Button type="primary" > Edit  </Button> {/* onClick={() =>console.log(action.ContractId) }*/}
             |
              {/* <Button danger> Delete </Button> */}
                  <Button danger onClick={()=>this.deleteContract(action.ContractId)}>{/* this.deleteContract(item.ContractId) */}
                          Delete
                  </Button>
            </Space>
          ),
        },
      ];

        const {deps} = this.state;
        let addModalClose = () => this.setState({addModalShow:false});
          return(
           <div>
               {/* выводим таблицу Контракта*/}
               <Table columns={columns} dataSource={deps} />

                {/* кнопку добавления Контракта */}
               <Button type='primary' 
                onClick={()=>this.setState({addModalShow:true})}>
                    Add conttract
                </Button>

                {/* Модальное окно для добавления Контракта */}
                <AddContractModal show={this.state.addModalShow}
                onHide={addModalClose}/>

           </div>
          )
      }
  }