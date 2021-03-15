import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class EditEmployeeModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    //PUT запрос изменения информации о сотруднике
    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'employee',{
            method : 'PUT',
            headers : {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmployeeId:event.target.EmployeeId.value,
                FamilyAndName:event.target.FamilyAndName.value,
                JobPosition:event.target.JobPosition.value,
                BirthDate:event.target.BirthDate.value
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
                <Modal 
                {...this.props} 
                size="lg" 
                aria-labelledby="container-modal-title-vcenter" 
                centered>
                    
                    <Modal.Header closeButton>
                        <Modal.Title id="container-modal-title-vcenter">
                            Edit Employee
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    
                                    <Form.Group emplId="EmployeeId">
                                        <Form.Label>EmployeeId</Form.Label>
                                        <Form.Control type="text" name="EmployeeId" required 
                                        disabled
                                        defaultValue={this.props.editEmployeeId}
                                        placeholder="EmployeeId"/>
                                    </Form.Group>

                                    <Form.Group emplId="FamilyAndName">
                                        <Form.Label>FamilyAndName</Form.Label>
                                        <Form.Control type="text" name="FamilyAndName" required 
                                        defaultValue={this.props.editFamilyAndName}
                                        placeholder="FamilyAndName"/>
                                    </Form.Group>

                                    <Form.Group emplId="JobPosition">
                                        <Form.Label>JobPosition</Form.Label>
                                        <Form.Control type="text" name="JobPosition" required
                                        defaultValue={this.props.editJobPosition}
                                        placeholder="JobPosition"/>
                                    </Form.Group>

                                    <Form.Group emplId="BirthDate">
                                        <Form.Label>BirthDate</Form.Label>
                                        <Form.Control type="text" name="BirthDate" required
                                        defaultValue={this.props.editBirthDate}
                                        placeholder="BirthDate"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Employee
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