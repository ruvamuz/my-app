import ReactDOM from 'react-dom';
import React, { Component, useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';

import {AddContractModal} from './Contract/AddContractModal';

const EditableContext = React.createContext(null);

// const EditableRow = ({ index, ...props }) => {
//   const [form] = Form.useForm();
//   return (
//     <Form form={form} component={false}>
//       <EditableContext.Provider value={form}>
//         <tr {...props} />
//       </EditableContext.Provider>
//     </Form>
//   );
// };

// const EditableCell = ({
//   title,
//   editable,
//   children,
//   dataIndex,
//   record,
//   handleSave,
//   ...restProps
// }) => {
//   const [editing, setEditing] = useState(false);
//   const inputRef = useRef(null);
//   const form = useContext(EditableContext);
//   useEffect(() => {
//     if (editing) {
//       inputRef.current.focus();
//     }
//   }, [editing]);

//   const toggleEdit = () => {
//     setEditing(!editing);
//     form.setFieldsValue({
//       [dataIndex]: record[dataIndex],
//     });
//   };

//   const save = async () => {
//     try {
//       const values = await form.validateFields();
//       toggleEdit();
//       handleSave({ ...record, ...values });
//     } catch (errInfo) {
//       console.log('Save failed:', errInfo);
//     }
//   };

//   let childNode = children;

//   if (editable) {
//     childNode = editing ? (
//       <Form.Item
//         style={{
//           margin: 0,
//         }}
//         name={dataIndex}
//         rules={[
//           {
//             required: true,
//             message: `${title} is required.`,
//           },
//         ]}
//       >
//         <Input ref={inputRef} onPressEnter={save} onBlur={save} />
//       </Form.Item>
//     ) : (
//       <div
//         className="editable-cell-value-wrap"
//         style={{
//           paddingRight: 24,
//         }}
//         onClick={toggleEdit}
//       >
//         {children}
//       </div>
//     );
//   }

//   return <td {...restProps}>{childNode}</td>;
// };

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
              <a>Delete</a>
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

  // handleDelete = (key) => {
  //   const dataSource = [...this.state.dataSource];
  //   this.setState({
  //     dataSource: dataSource.filter((item) => item.key !== key),
  //   });
  // };

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

  // handleAdd = () => {
  //   const { count, dataSource } = this.state;
  //   const newData = {
  //     key: count,
  //     name: `Edward King ${count}`,
  //     age: '32',
  //     address: `London, Park Lane no. ${count}`,
  //   };
  //   this.setState({
  //     dataSource: [...dataSource, newData],
  //     count: count + 1,
  //   });
  // };

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
    // const components = {
    //   body: {
    //     // row: EditableRow,
    //     // cell: EditableCell,
    //   },
    // };
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
        <Button
          onClick={this.handleAdd,()=>this.setState({addModalShow:true})}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
        <AddContractModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
        <Table
          //components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}