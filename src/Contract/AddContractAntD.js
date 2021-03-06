import React,{useState} from 'react';
import { Form, Input, Modal, Button, message } from 'antd';
import axios from 'axios';
import TextArea from 'antd/lib/input/TextArea';

function AddContractModalAntd(props){
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const onFinish = (values) => {
      axios.post(process.env.REACT_APP_API+'contract',{
          ShortNameContract: values.shortNameContract,
          FullNameContract: values.fullNameContract
      })
      .then(response =>{
        message.info(response.data)
      })
      .catch(error => {
        message.error(error);
      })
    };

    // Вывод модального окна добавления Контракта
    return(
      <div className="container">
            
            <Button type="primary" onClick={showModal}>
              Добавить контракт
            </Button>
            
            <Modal title="Добавить контракт" 
            width={700}
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
              rules={[
                {
                  required: true,
                  message: 'Введите короткое имя контракта',
                },
              ]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item
              label="Полное название"
              name="fullNameContract"
              rules={[
                {
                  required: true,
                  message: 'Введите короткое имя контракта',
                },
              ]}
            >
              <TextArea autoSize={{ minRows: 2, maxRows: 5 }}/>
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