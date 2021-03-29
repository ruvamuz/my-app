import React, {useState} from 'react';
import { Modal, Button, Form, Input, } from 'antd';
import axios from 'axios';

function EditContract(props){
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
    
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    
    const onFinish = (values) => {
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

    return(
    <div>
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
            >
        
          <Form.Item
            label="ContractId"
            name="сontractId"
          >
          
          <Input 
            disabled={true}
            defaultValue={props.item.ContractId}
            value={props.item.ContractId}
            />
          </Form.Item>

          <Form.Item
            label="ShortNameContract"
            name="shortNameContract"
          >
          <Input defaultValue={props.item.ShortNameContract} value={props.item.ShortNameContract}/>
          </Form.Item>
        
          <Form.Item
            label="FullNameContract"
            name="fullNameContract"
          >
          <Input defaultValue={props.item.FullNameContract} value={props.item.FullNameContract} />
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

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

export default EditContract