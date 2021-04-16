import React from "react";
import ReactDataGrid from "react-data-grid";
import { Modal, Select, Form, Button, } from 'antd';

import OptionsDrawer from './optionsDrawer'

import axios from 'axios';
import "./styles.css";

const columns = [
  //{ key: 'id', name: 'ID' },
  { key: "date",  name: "Дата" },
  { key: "8.00",  name: "8:00" , editable: true },
  { key: "9.00",  name: "9:00" , editable: true },
  { key: "10.00", name: "10:00", editable: true },
  { key: "11.00", name: "11:00", editable: true },
  { key: "12.00", name: "12:00", editable: true },
  { key: "13.00", name: "13:00", editable: true },
  { key: "14.00", name: "14:00", editable: true },
  { key: "15.00", name: "15:00", editable: true },
  { key: "16.00", name: "16:00", editable: true },
  { key: "17.00", name: "17:00", editable: true },
  { key: "18.00", name: "18:00", editable: true },
  { key: "19.00", name: "19:00", editable: true },
];

// const rows = [
//   {id: 0, key:0, date:"", time8:"1", time9:"1", time10:"1", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", }, 
//   {id: 1, key:1, date:"", time8:"2", time9:"2", time10:"2", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
//   {id: 2, key:2, date:"", time8:"3", time9:"3", time10:"3", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
//   {id: 3, key:3, date:"", time8:"4", time9:"4", time10:"4", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
//   {id: 4, key:4, date:"", time8:"5", time9:"5", time10:"5", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
//   {id: 5, key:5, date:"", time8:"6", time9:"6", time10:"6", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
//   {id: 6, key:6, date:"", time8:"7", time9:"7", time10:"7", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
//   {id: 7, key:7, date:"", time8:"8", time9:"8", time10:"8", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
//   {id: 8, key:8, date:"", time8:"9", time9:"9", time10:"9", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
//   {id: 9, key:9, date:"", time8:"5", time9:"5", time10:"5", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
// ];

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


export class Example extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      update: "",
      rows:[],
      args:"",
      isModalVisible: false,
      contrItem:[],
    }
  }

  setIsModalVisible(value){
    this.setState({isModalVisible:value})
  }

  showModal = (value) => {
    this.setState({args:value});
    //console.log("showModal: args", this.state.args)
    this.getContract();
    this.setIsModalVisible(true);
  };

  handleCancel = () => {
    this.setIsModalVisible(false);
  };

  getContract = () => {
    axios.get(process.env.REACT_APP_API+'contract')
      .then(res => {
          this.setState({contrItem: res.data});
      })
      .catch(error =>{console.log(error);})
    };

  onGridRowsUpdated = ({cellKey, fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
          rows[i] = {...rows[i], ...updated };
          console.log(cellKey)
      }
      return { rows };
    });
  };

  onFinish = (values) => {
    //var args = this.state.args;
    var topLeft = this.state.args.topLeft;
    var bottomRight = this.state.args.bottomRight;
    var updateValue = values.shortContract;
    for (let i = topLeft.idx; i<=bottomRight.idx; i++){
      const inputUpdate ={[columns[i].key] : updateValue}
      this.onGridRowsUpdated({cellKey:columns[i].key, fromRow: topLeft.rowIdx,toRow: topLeft.rowIdx,updated: inputUpdate})
    }
    this.setIsModalVisible(false);
  };

  updateData = (value, startDate, endDate) =>{
    //this.setState({rows2: value})
    console.log(value)
    var startDateMS = Date.parse(startDate)
    var endDateMS = Date.parse(endDate)
    //console.log("startDateMS: ", startDateMS, "endDateMS: ", endDateMS)
    this.setState({rows: []})
    for (let i=startDateMS; i <= endDateMS; i=i+24*60*60*1000){
      var date = new Date(i).toISOString().substr(0, 10)
      var obj = {};
      value.map(item => {
        if (item.DateWork === date) {
          
          for (let i=8; i<=19;i++){
            var ident = i.toString().padStart(2,'0')+".00"
            obj[ident] = 'Контракт' 
          }

          obj[item.StartTime.substr(0,5)] = '1'
          console.log("Дата: ",date, "obj: ", obj)
        }
      })
      const row = {Id:0, date:date }
      Object.assign(row, obj)
      const newRow = [...this.state.rows, row]
      this.setState({rows: newRow})
    }
  }

  render() {
    return (
      <div>
          <OptionsDrawer updateData={this.updateData} />
          <ReactDataGrid
          columns={columns}
          rowGetter={i => this.state.rows[i]}
          rowsCount={this.state.rows.length}
          minHeight={750}
          minWidth={1150}
          onGridRowsUpdated={this.onGridRowsUpdated}
          enableCellSelect={true}
          cellRangeSelection={{
            onComplete: args => this.showModal(args)
          }}
          />
        

        <Modal title="Выбор контракта"
        visible={this.state.isModalVisible} 
        onCancel={this.handleCancel}
        footer={null}
        >
          <Form
            {...layout}
            name="basic"
            onFinish={this.onFinish}
          >

            <Form.Item
              name="shortContract"
              rules={[
                {
                  required: true,
                  message: 'Выберите контракт',
                },                     
              ]}
            >
              <Select style={{ width: 470 }}  >
                {this.state.contrItem.map(item => 
                  {
                    return  <Select key={item.Id} value={item.ShortNameContract}>
                              {item.ShortNameContract}
                            </Select>
                  })}
              </Select>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

          </Form>
        </Modal>
      </div>
    );
  }
}