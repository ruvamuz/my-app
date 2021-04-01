import React,{useState} from 'react';
import { Form, Input, Modal, Button, } from 'antd';
import axios from 'axios';

function AddContractModalAntd(props){
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const onFinish = (values) => {
      //console.log('Success: - ', values);
      axios.post(process.env.REACT_APP_API+'contract',{
          ShortNameContract: values.shortNameContract,
          FullNameContract: values.fullNameContract
      })
      //.then(response =>{console.log(response);})
      .catch(error => {
      console.log(error);
      });
    };

    // Вывод модального окна добавления Контракта
    return(
      <div className="container">
            
            <Button type="primary" onClick={showModal}>
              Добавить контракт
            </Button>
            
            <Modal title="Добавить контракт" 
            footer={null}
            visible={isModalVisible} 
            onCancel={handleCancel}>
                  
            <Form
            {...layout}
              name="basic"
              onFinish={onFinish}
            >

            <Form.Item
              label="Короткое название"
              name="shortNameContract"
            >
              <Input />
            </Form.Item>
            
            <Form.Item
              label="Полное название"
              name="fullNameContract"
            >
              <Input/>
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

  export default AddContractModalAntd