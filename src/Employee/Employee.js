import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddEmployeeModal } from './AddEmployeeModal';
import { EditEmployeeModal } from './EditEmployeeModal';

export class Employee extends Component{

    constructor(props){
        super(props)
        this.state={empls:[], addModalShow: false, editModalShow:false}
    }

    //Get json запрос на получение данных с таблицы Сотрудников
    refreshList(){
        fetch(process.env.REACT_APP_API+'employee')
        .then(response=>response.json())
        .then(data =>{
            this.setState({empls:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }
    //Delete запрос на удаление данных с таблицы Сотрудников
    deleteEmployee(emplId){
        if(window.confirm('Вы уверенны что хотите удалить?')){
            fetch(process.env.REACT_APP_API+'employee/'+emplId,{
                method: 'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }

    render(){
        const {empls, employeeId, familyAndName, jobPosition, birthDate } =  this.state;
        let addModalClose = () => this.setState({addModalShow:false});
        let editModalClose = () => this.setState({editModalShow:false});
        return(
            <div>
                 <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>EmployeeId</th>
                            <th>FamilyAndName</th>
                            <th>JobPosition</th>
                            <th>BirthDate</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empls.map(item =>
                            <tr key={item.EmployeeId}>
                                <td>{item.EmployeeId}</td>
                                <td>{item.FamilyAndName}</td>
                                <td>{item.JobPosition}</td>
                                <td>{item.BirthDate}</td>
                                <td>
                            <ButtonToolbar>
                            
                            <Button className="mr-2" variant="info"
                                onClick={()=>this.setState({editModalShow:true,
                                employeeId:item.EmployeeId,
                                familyAndName:item.FamilyAndName,
                                jobPosition:item.JobPosition,
                                birthDate:item.BirthDate})}>
                                    Edit
                            </Button>

                            <Button className="mr-2" variant="danger"
                                onClick={()=>this.deleteEmployee(item.EmployeeId)}>
                                    Delete
                            </Button>

                            {/* Открытие модального Окна Добавления Сотрудника */}                                  
                            <EditEmployeeModal show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    editEmployeeId={employeeId}
                                    editFamilyAndName={familyAndName}
                                    editJobPosition={jobPosition}
                                    editBirthDate={birthDate}/>
                            
                            </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                
                {/* кнопка для открытия модульного окна добавления Сотрудника */}
                <ButtonToolbar>
                    <Button varant='primary' 
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add Employee
                    </Button>

                    <AddEmployeeModal show={this.state.addModalShow}
                    onHide={addModalClose}/>    

                </ButtonToolbar>
            </div>
        )
    }
}