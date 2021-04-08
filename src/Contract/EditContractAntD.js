import React from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

class EditContract extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.item.Id,
      shortNameContract: this.props.item.ShortNameContract,
      fullNameContract: this.props.item.FullNameContract,
      isModalVisible: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    //console.log("event",event)
    //const target = event.target;
    //const value = target.type === 'checkbox' ? target.checked : target.value;
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
    //console.log("this.state.id", this.state.id, "this.state.shortNameContract", this.state.shortNameContract, "this.state.fullNameContract", this.state.fullNameContract)
  }

  setIsModalVisible = (value) =>{
    this.setState({isModalVisible: value})
  }

  showModal = () => {
    console.log('showModal', this.state.isModalVisible)
    console.log("this.state.value", this.state.shortNameContract, this.state.fullNameContract, this.state.id)
    this.setIsModalVisible(true);

  };
    
  handleCancel = () => {
    console.log("handleCancel",this.state.isModalVisible)
    this.setIsModalVisible(false);
  };
    
  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  onFinish = () => {
    //console.log('onFinish');
    //console.log("this.state.value", this.state.fullNameContract, this.state.shortNameContract, this.state.id)
    axios.put(process.env.REACT_APP_API+'contract/',
    {
      Id: this.state.id,
      ShortNameContract: this.state.shortNameContract,
      FullNameContract: this.state.fullNameContract
    })
    .then(response =>{
      message.info(response.data)
    })
    .catch(error => {
      console.log(error);
    })
  };

  render(){
    return(
        <div>
            <Button type="primary" onClick={this.showModal}>
            {/* <Button type="primary" onClick={console.log("Click Button")}> */}
              Редактировать
            </Button>
    
            <Modal title="Редактирование контракта" 
            width={700}
            footer={null}
            visible={this.state.isModalVisible} 
            onCancel={this.handleCancel}>
                
                <Form
                {...layout}
                name="basic"
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                >
            
              {/* <Form.Item
                label="Id"
                name="id"
              >
              <Input 
                disabled={true}
                defaultValue={props.item.Id}
                //value={props.item.Id}
                />
              </Form.Item> */}
    
              <Form.Item
                label="Короткое название контракта"
                // rules={[
                //   {
                //     required: true,
                //     message: 'Введите короткое имя контракта',
                //   },
                // ]}
              >
              <Input 
                name="shortNameContract"
                defaultValue={this.props.item.ShortNameContract} 
                onChange={this.handleInputChange}
                //value={props.item.ShortNameContract}
              />
              </Form.Item>
            
              <Form.Item
                label="Полное название контракта"
                //name="fullNameContract"
                //initialValues="this.props.item.FullNameContract"
                // rules={[
                //   {
                //     required: true,
                //     message: 'Введите полное имя контракта',
                //   },
                // ]}
              >
              <TextArea 
                name="fullNameContract"
                defaultValue={this.props.item.FullNameContract} 
                onChange={this.handleInputChange}
                autoSize={{ minRows: 2, maxRows: 5 }}
                //value={props.item.FullNameContract} 
              />
              </Form.Item>
            
                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      Update Contract
                    </Button>
                  </Form.Item>
                </Form>
            </Modal>
        </div>
        )
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