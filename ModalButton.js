import React, { Component, useState } from 'react';
import { Modal, Button } from 'antd';

export class ModalButton extends Component {
    constructor(props){
        super(props);
        this.state={ isModalVisible: false, setIsModalVisible:false}
    }
//   const [isModalVisible, setIsModalVisible] = useState(false);

    showModal () {
        this.setState({setIsModalVisible:true});
    }

  handleOk () {
    this.setState({setIsModalVisible:false});
  }

  handleCancel () {
    this.setState({isModalVisible:false});
  }

  render(){
      return (
        <div>
            <Button type="primary" onClick={true}>
            Open Modal
        </Button>
        <Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={this.setState({setIsModalVisible:false})} onCancel={this.setState({setIsModalVisible:false})}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
        </div>
      )
  }
};

// ReactDOM.render(<ModalButton />, mountNode);