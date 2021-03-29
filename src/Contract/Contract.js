import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddContractModal} from './AddContractModal';
import {EditContractModal} from './EditContractModal';

export class Contract extends Component{

    constructor(props){
        super(props);
        this.state=
        {
            deps:[], 
            addModalShow: false, 
            editModalShow:false
        }
    }

    //Get json запрос на получение данных с таблицы Контрактов
    refreshList(){
        fetch(process.env.REACT_APP_API+'contract')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    //Delete запрос на удаление данных с таблицы Контрактов
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
        const {deps, contrId, shortNameContract, fullNameContract} = this.state;
        let addModalClose = () => this.setState({addModalShow:false});
        let editModalClose = () => this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ContractId</th>
                            <th>ShortNameContract</th>
                            <th>FullNameContract</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(item =>
                            <tr key={item.ContractId}>
                                <td>{item.ContractId}</td>
                                <td>{item.ShortNameContract}</td>
                                <td>{item.FullNameContract}</td>
                                <td>
                            <ButtonToolbar>
                            
                            <Button className="mr-2" variant="info"
                                onClick={()=>this.setState({editModalShow:true,
                                contrId:item.ContractId,
                                shortNameContract:item.ShortNameContract,
                                fullNameContract:item.FullNameContract})}>
                                    Edit
                            </Button>

                            <Button className="mr-2" variant="danger"
                                onClick={()=>this.deleteContract(item.ContractId)}>
                                    Delete
                            </Button>

                            {/* Открытие модального Окна Добавления Контракта */}         
                            <EditContractModal show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    contrId={contrId}
                                    shortNameContract={shortNameContract}
                                    fullNameContract={fullNameContract}/>
                            
                            </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                {/* кнопка для открытия модульного окна добавления Контракта */}
                <ButtonToolbar>
                    <Button variant='primary' 
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add conttract
                    </Button>

                    <AddContractModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                    
                </ButtonToolbar>
            </div>
        )
    }
}