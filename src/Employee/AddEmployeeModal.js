import React,{Component} from 'react';
import {Modal, Button,Row, Col, Form} from 'react-bootstrap';

export class AddEmployeeModal extends Component{
    constructor(props){
        super(props)
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    //POST Запрос добавления сотрудника
    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'employee',{
            method : 'POST',
            headers : {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                FamilyAndName: event.target.FamilyAndName.value,
                JobPosition: event.target.JobPosition.value,
                BirthDate: event.target.BirthDate.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    render(){
        return(
            <div className="container">
                <Modal {...this.props} size="lg" aria-labelledby="container-modal-title-vcenter" centered>
                    
                    <Modal.Header closeButton>
                        <Modal.Title id="container-modal-title-vcenter">
                            AddEmployee
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group employeeId="FamilyAndName">
                                        <Form.Label>FamilyAndName</Form.Label>
                                        <Form.Control type="text" name="FamilyAndName" required placeholder="FamilyAndName"/>
                                    </Form.Group>

                                    <Form.Group employeeId="JobPosition">
                                        <Form.Label>JobPosition</Form.Label>
                                        <Form.Control type="text" name="JobPosition" required placeholder="JobPosition"/>
                                    </Form.Group>

                                    <Form.Group employeeId="BirthDate">
                                        <Form.Label>BirthDate</Form.Label>
                                        <Form.Control type="text" name="BirthDate" required placeholder="BirthDate"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Employee
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}