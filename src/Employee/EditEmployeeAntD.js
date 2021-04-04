import React, {useState} from 'react';
import { Modal, Button, Form, Input, Select, DatePicker} from 'antd';
import moment from 'moment';
import axios from 'axios';

function EditEmployee(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [jobPos, setJobPos] = useState([]);
  const { Option } = Select;
  const dateFormat = 'YYYY-MM-DD';

  const showModal = () => {
    setIsModalVisible(true);
    getJobPosition();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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

  const onFinish = (values) => {
    console.log('Success:', values);
    axios.put(process.env.REACT_APP_API+'employee',
    {
      Id: values.id,
      Family: values.family,
      Name: values.name,
      Patronymic: values.patronymic,
      JobPosition: values.jobPosition ,
      BirthDate: values.birthDate.format("YYYY-MM-DD"),
    })
    //.then(response =>{alert(response.data);})
    .catch(error => {
    console.log(error);
    })
    // .then((result)=>{
    //   alert(result)
    //   })
    };

    //const {item} = this.state;
    return (
      <div>

          {/* <Button type="primary" onClick={()=>console.log(props.item)}> */}
          <Button type="primary" onClick={showModal}>
          Редактировать
          </Button>

          <Modal title="Редактирование контракта" 
            
            footer={null}
            visible={isModalVisible} 
            onCancel={handleCancel}>
            
            <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            //onSubmit={handleSubmit}
            >
        
          <Form.Item
            label="Id"
            name="id"
          >
          
          <Input 
            disabled={false}
            defaultValue={props.item.Id}
            //value={props.item.ContractId}
            />
          </Form.Item>

          <Form.Item
            label="Фамилия"
            name="family"
          >
          <Input 
            defaultValue={props.item.Family} 
            //value={props.item.ShortNameContract}
          />
          </Form.Item>
        
          <Form.Item
            label="Имя"
            name="name"
          >
          <Input 
          defaultValue={props.item.Name} 
          //value={props.item.FullNameContract}
          />
          </Form.Item>
        
          <Form.Item
            label="Отчество"
            name="patronymic"
          >
          <Input 
          defaultValue={props.item.Patronymic} 
          //value={props.item.FullNameContract}
          />
          </Form.Item>
          
          <Form.Item
            label="Должность"
            name="jobPosition"
          >
            <Select defaultValue={props.item.JobPosition}>
              {jobPos.map(item => 
                {
                  return  <Option key={item.Id} value={item.Id.toString()}>
                            {item.JobPosition}
                          </Option>
                })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Дата рождения"
            name="birthDate"
          >
            <DatePicker defaultValue={moment(props.item.BirthDate,dateFormat)}/>
          </Form.Item>
            
          {/* <Form.Item
            label="FullNameContract"
            name="fullNameContract"
          >
          <Input 
          defaultValue={props.item.FullNameContract} 
          //value={props.item.FullNameContract}
          />
          </Form.Item> */}
        
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

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default EditEmployee