import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Form, Input, Modal, Button, Checkbox } from 'antd';



export default ModalWindow;


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