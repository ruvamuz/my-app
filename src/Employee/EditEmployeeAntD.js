import React from 'react';
import { Modal, Button, Form, Input, Select, DatePicker, message} from 'antd';
import moment from 'moment';
import axios from 'axios';

const { Option } = Select;
//const dateFormat = ;

class EditEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.item.Id,
      family: this.props.item.Family,
      name: this.props.item.Name,
      patronymic: this.props.item.Patronymic,
      jobPosition: this.props.item.JobPosition,
      birthDate: this.props.item.BirthDate,
      isModalVisible: false,
      jobPos: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  setIsModalVisible = (value) =>{
    this.setState({isModalVisible: value})
  }

  setJobPos = (value) =>{
    this.setState({jobPos:value})
  }

  showModal = () => {
    console.log(this.props.item)
    this.setIsModalVisible(true);
    this.getJobPosition();
  };
    
  handleCancel = () => {
    this.setIsModalVisible(false);
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  getJobPosition = () => {
    axios.get(process.env.REACT_APP_API+'jobposition')
      .then(res => {
          this.setJobPos(res.data)
      })
      .catch(error =>{console.log(error);})
    };

  onFinish = (values) => {
    //console.log('value.jobPosition :', values.jobPosition );
    console.log('Success:', this.state);
    axios.put(process.env.REACT_APP_API+'employee',
    {
      Id: this.state.id,
      Family: this.state.family,
      Name: this.state.name,
      Patronymic: this.state.patronymic,
      JobPosition: this.state.jobPosition,
      BirthDate: this.state.birthDate, //.format("YYYY-MM-DD")
    })
    .then(response =>{
      message.info(response.data)
    })
    .catch(error => {
      message.error(error);
    })
    };

    handleChangeJobPosition = (value) => {
      this.setState({jobPosition: value})
    }

    // handleChangeBirthDate = (value) => {
    //   if (value !== null) {
    //     console.log("value.format(YYYY-MM-DD)",value._i);
    //     this.setState({birthDate: value._i})
    //   }
      
    //   console.log("this.state.birthDate",this.state.birthDate);
    // }


    onChangeBirthDate = (date, dateString) => {
      //console.log(dateString);
      this.setState({birthDate: dateString})
      //console.log("this.state.birthDate",this.state.birthDate);
    }

    disabledDate = (current) => {
      let customDate = moment().format("YYYY-MM-DD");
      return current && current >= moment(customDate, "YYYY-MM-DD");
    }

    render(){
      return (
        <div>
            <Button type="primary" onClick={this.showModal}>
            Редактировать
            </Button>

            <Modal title="Редактирование контракта" 
              
              footer={null}
              visible={this.state.isModalVisible} 
              onCancel={this.handleCancel}>
              
              <Form
              {...layout}
              name="basic"
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              >

            <Form.Item label="Фамилия">
              <Input 
                name="family"
                defaultValue={this.props.item.Family} 
                onChange={this.handleInputChange}
              />
            </Form.Item>
          
            <Form.Item label="Имя">
              <Input 
                name="name"
                defaultValue={this.props.item.Name} 
                onChange={this.handleInputChange}
              />
            </Form.Item>
          
            <Form.Item label="Отчество">
              <Input name="patronymic"
                defaultValue={this.props.item.Patronymic} 
                onChange={this.handleInputChange}
              />
            </Form.Item>
            
            <Form.Item label="Должность"> 
              <Select name="jobPosition" 
                defaultValue={this.props.item.JobPosition}
                onChange={this.handleChangeJobPosition}
              >
                {this.state.jobPos.map(item => 
                  {
                    return  <Option key={item.Id} value={item.Id.toString()}>
                              {item.JobPosition}
                            </Option>
                  })}
              </Select>
            </Form.Item>

            <Form.Item label="Дата рождения"
            rules={[
              {
                required: true,
                message: 'Введите дату рождения',
              },
            ]}
            >
              <DatePicker name="birthDate" 
              disabledDate={this.disabledDate}
              defaultValue={moment(this.props.item.BirthDate, 'YYYY-MM-DD')}
              onChange={this.onChangeBirthDate}
              //onChange={this.handleChangeBirthDate}
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

export default EditEmployee