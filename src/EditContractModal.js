import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class EditContractModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'contract',{
            method : 'PUT',
            headers : {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ContractId:event.target.ContractId.value,
                ShortNameContract:event.target.ShortNameContract.value,
                FullNameContract:event.target.FullNameContract.value
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
                            EditContract
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    
                                    <Form.Group controlId="ContractId">
                                        <Form.Label>ContractId</Form.Label>
                                        <Form.Control type="text" name="ContractId" required 
                                        disabled
                                        defaultValue={this.props.contrId}
                                        placeholder="ContractId"/>
                                    </Form.Group>

                                    <Form.Group controlId="ShortNameContract">
                                        <Form.Label>ShortNameContract</Form.Label>
                                        <Form.Control type="text" name="ShortNameContract" required 
                                        defaultValue={this.props.shortNameContract}
                                        placeholder="ShortNameContract"/>
                                    </Form.Group>

                                    <Form.Group controlId="FullNameContract">
                                        <Form.Label>FullNameContract</Form.Label>
                                        <Form.Control type="text" name="FullNameContract" required
                                        defaultValue={this.props.fullNameContract}
                                        placeholder="FullNameContract"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Contract
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