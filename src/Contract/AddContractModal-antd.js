import React,{Component, useState} from 'react';
// import {Modal, Button,Row, Col, Form} from 'react-bootstrap';
import { Form, Input, Modal, Button, Checkbox,  } from 'antd';

export default class AddContractModalAntd extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'contract',{
            method : 'POST',
            headers : {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
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
                <ModalWindow>

                </ModalWindow>
                
                
                {/* <Modal {...this.props} size="lg" aria-labelledby="container-modal-title-vcenter" centered>
                    
                    <Modal.Header closeButton>
                        <Modal.Title id="container-modal-title-vcenter">
                            AddContract
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="ShortNameContract">
                                        <Form.Label>ShortNameContract</Form.Label>
                                        <Form.Control type="text" name="ShortNameContract" required placeholder="ShortNameContract"/>
                                    </Form.Group>

                                    <Form.Group controlId="FullNameContract">
                                        <Form.Label>FullNameContract</Form.Label>
                                        <Form.Control type="text" name="FullNameContract" required placeholder="FullNameContract"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Contract
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                    
                </Modal> */}
            </div>
        )
    }
}


const ModalWindow = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  
    return (
      <>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <Modal title="Add contract" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Demo />
        </Modal>
      </>
    );
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

const Demo = () => {

    const onFinish = (values) => {
      console.log('Success:', values);
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="ShortNameContract"
          name="ShortNameContract"
          rules={[
            {
              required: true,
              message: 'Please input your ShortNameContract!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="FullNameContract"
          name="FullNameContract"
          rules={[
            {
              required: true,
              message: 'Please input your FullNameContract!',
            },
          ]}
        >
          <Input/>
        </Form.Item>
  
        <Form.Item {...tailLayout}>
          <Button type="primary"  >
            Add Contract
          </Button>
        </Form.Item>
      </Form>
    );
  };