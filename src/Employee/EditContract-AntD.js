import React, {setState} from 'react';
import { Modal, Button, Form, Input, } from 'antd';
import axios from 'axios';

class EditContract extends React.Component {
    constructor(props) {
      super(props);
      this.state = 
      {
        value: '',
        isModalVisible: false,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    setIsModalVisible(value){
        this.setState({isModalVisible: value})
    }

    handleCancel = () => {
        this.setIsModalVisible(false);
      };

    onFinish = (values) => {
        console.log('Success:', values);
        axios.put(process.env.REACT_APP_API+'contract',
        {
          ContractId: values.contractId,
          ShortNameContract: values.shortNameContract,
          FullNameContract: values.fullNameContract
        })
        .then(response =>{console.log(response);})
        .catch(error => {
        console.log(error);
        })
        .then((result)=>{
             alert(result)
          })
    };

    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      const {item} = this.state;
      return (
        <div>
          {/* <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
          < input type="submit" value="Submit" />
          </form> */}
          
          <Button type="primary" onClick={()=>console.log(item)}>
          {/* <Button type="primary" onClick={this.showModal}> */}
          Редактировать
          </Button>

          {/* <Modal title="Редактирование контракта" 
            {...this.props}
            footer={null}
            visible={this.isModalVisible} 
            onCancel={this.handleCancel}>
            
            <Form
            {...layout}
            name="basic"
            onFinish={this.onFinish}
            onSubmit={this.handleSubmit}
            >
        
          <Form.Item
            label="ContractId"
            name="сontractId"
          >
          
          <Input 
            disabled={true}
            //defaultValue={this.props.item.ContractId}
            value={this.props.item.ContractId}
            />
          </Form.Item>

          <Form.Item
            label="ShortNameContract"
            name="shortNameContract"
          >
          <Input 
            //defaultValue={props.item.ShortNameContract} 
            value={this.props.item.ShortNameContract}
          />
          </Form.Item>
        
          <Form.Item
            label="FullNameContract"
            name="fullNameContract"
          >
          <Input 
          //defaultValue={props.item.FullNameContract} 
          value={this.props.item.FullNameContract}
          />
          </Form.Item>
        
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Update Contract
                </Button>
              </Form.Item>
            </Form>
        </Modal> */}
        </div>
      );
    }
  }

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default EditContract