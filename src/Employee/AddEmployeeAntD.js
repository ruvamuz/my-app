import React,{useState} from 'react';
import { Form, Input, Modal, Button, DatePicker, Select, message} from 'antd';
import axios from 'axios';
//import { render } from '@testing-library/react';
import moment from 'moment';

function AddEmployeeAntd(props){
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [jobPos, setJobPos] = useState([]);
    const { Option } = Select;

    const showModal = () => {
      setIsModalVisible(true);
      getJobPosition();
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const disabledDate = (current) => {
      let customDate = moment().format("YYYY-MM-DD");
      return current && current >= moment(customDate, "YYYY-MM-DD");
    }

    const onFinish = (values) => {
      //console.log('Success: - ', values);
      //console.log('Дата: - ', values.birthDate);
      //console.log('select - ', String(values.jobPosition))
      axios.post(process.env.REACT_APP_API+'employee',{
          Family: values.family,
          Name: values.name,
          Patronymic: values.patronymic,
          JobPosition: values.jobPosition,
          BirthDate: values.birthDate.format("YYYY-MM-DD")
      })
      .then(response =>{
        message.info(response.data)
      })
      .catch(error => {
        message.error(error);
      })
    };

    const getJobPosition = () => {
      axios.get(process.env.REACT_APP_API+'jobposition')
        .then(res => {
            //console.log(res.data);
            //this.setState({jobPos: res.data});
            setJobPos(res.data)
        })
        .catch(error =>{console.log(error);})
      };

    // Вывод модального окна добавления Контракта
    return(
        <div className="container">
                <Button type="primary" onClick={showModal}>
                  Добавить сотрудника
                </Button>
                <Modal title="Добавить сотрудника" 
                footer={null}
                visible={isModalVisible} 
                onCancel={handleCancel}>
                  
                  <Form
                  {...layout}
                  name="basic"
                  onFinish={onFinish}
                  >

                  <Form.Item
                    label="Фамилия"
                    name="family"
                    rules={[
                      {
                        required: true,
                        message: 'Введите фамилию',
                      },                     
                    ]}
                  >
                    <Input />
                  </Form.Item>
            
                  <Form.Item
                    label="Имя"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Введите имя',
                      },
                    ]}
                  >
                    <Input/>
                  </Form.Item>

                  <Form.Item
                    label="Отчество"
                    name="patronymic"
                    rules={[
                      {
                        required: true,
                        message: 'Введите отчество',
                      },
                    ]}
                  >
                    <Input/>
                  </Form.Item>

                  <Form.Item
                    label="Должность"
                    name="jobPosition"
                    rules={[
                      {
                        required: true,
                        message: 'Введите должность',
                      },
                    ]}
                  >
                    <Select>
                      {jobPos.map(item => 
                        {return  <Option key={item.Id} value={item.Id.toString()}>
                                    {item.JobPosition}
                                  </Option>})}
                    </Select>
                    {/* <Input/> */}
                  </Form.Item>

                  <Form.Item
                    label="Дата рождения"
                    name="birthDate"
                    rules={[
                      {
                        required: true,
                        message: 'Введите дату рождения',
                      },
                    ]}
                  >
                    <DatePicker
                    format="YYYY-MM-DD"
                    disabledDate={disabledDate}
                    />
                  </Form.Item>
            
                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" >
                      Добавить 
                    </Button>
                  </Form.Item>
                </Form>
                </Modal>
            </div>
    )
}



// function SelectJobPosition(){
//   const [jobPosition, setJobPosition] = useState([]);
//   const { Option } = Select;

//   render(
//     <Select>
//       <Option value="1">1</Option>
//       <Option value="2">2</Option>
//     </Select>
//   )
// }

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

  export default AddEmployeeAntd