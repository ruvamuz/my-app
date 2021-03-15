// Данная таблица является 2 безуспешной попыткой подружить работающую таблицу с AntD
// import ReactDOM from 'react-dom';
import React, { Component, } from 'react';// useContext, useState, useEffect, useRef 
import { Table, Button, Popconfirm, } from 'antd';//Input, Form

import {AddContractModal} from './Contract/AddContractModal';
import AddContractModalAntd from './Contract/AddContractModal-antd';

export class EditableTable extends Component {
  
  constructor(props) {
    super(props);
    this.state={dataSource:[], addModalShow: false, editModalShow:false}
    this.columns = [
      {
        title: 'Идентификатор',
        dataIndex: 'ContractId',
        key: 'ContractId',
        width: '8%',
      },
      {
        title: 'Краткое наименование',
        dataIndex: 'ShortNameContract',
        key: 'ShortNameContract'
      },
      {
        title: 'Полное наименование',
        dataIndex: 'FullNameContract',
      },
      {
        title: 'Действия',
        dataIndex: 'operation',
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Уверенны в удалении?" onConfirm={() => this.deleteContract(record.key)}>
              Delete
            </Popconfirm>
          ) : null,
      },
    ];
  }

  refreshList() {
    fetch(process.env.REACT_APP_API+'contract')
    .then(response=>response.json())
    .then(data=>{
        this.setState({dataSource:data});
    });
  }

  componentDidMount () {
    this.refreshList();
  }

  componentDidUpdate (){
      this.refreshList();
  }

  deleteContract(contrId){
    console.log(contrId)
    fetch(process.env.REACT_APP_API+'contract/'+contrId,{
      method: 'DELETE',
      header:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    }
  })
}

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render = () => {
    const { dataSource } = this.state;
    let addModalClose = () => this.setState({addModalShow:false});
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        
        {/* */}
        <AddContractModal show={this.state.addModalShow}
                    onHide={addModalClose}/>


        <Button
          onClick={()=>this.setState({addModalShow:true})}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
        
        
        <Table
          //components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />

        <AddContractModalAntd/>
      </div>
    );
  }
}