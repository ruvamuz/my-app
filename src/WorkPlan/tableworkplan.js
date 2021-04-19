import React from "react";
import ReactDataGrid from "react-data-grid";
import { Modal, Select, Form, Button, } from 'antd';

import OptionsDrawer from './optionsDrawer'

import axios from 'axios';
import "./styles.css";

const columns = [
  //{ key: 'id', name: 'ID' },
  { key: "Date",  name: "Дата" },
  //{ key: "time08",  name: "8:00" , editable: true },
  { key: "time09",  name: "9:00" , editable: true },
  { key: "time10", name: "10:00", editable: true },
  { key: "time11", name: "11:00", editable: true },
  { key: "time12", name: "12:00", editable: true },
  { key: "time13", name: "13:00", editable: true },
  { key: "time14", name: "14:00", editable: true },
  { key: "time15", name: "15:00", editable: true },
  { key: "time16", name: "16:00", editable: true },
  { key: "time17", name: "17:00", editable: true },
  { key: "time18", name: "18:00", editable: true },
  { key: "time19", name: "19:00", editable: true },
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

  componentDidMount(){
    this.getContract();
    console.log("contract", this.state.contrItem)
  }

  setIsModalVisible(value){
    this.setState({isModalVisible:value})
  }

  showModal = (value) => {
    this.setState({args:value});
    //console.log("showModal: args", this.state.args)
    //this.getContract();
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
    var startDateMS = Date.parse(startDate)
    var endDateMS = Date.parse(endDate)
    console.log("value: ",value)
    //console.log("startDateMS: ", startDateMS, "endDateMS: ", endDateMS)
    this.setState({rows: []})
    for (let i=startDateMS; i <= endDateMS; i=i+24*60*60*1000){
      var date = new Date(i).toISOString().substr(0, 10)
      var obj = {};
      if (Object.keys(obj).length === 0){
        for (let i=8; i<=19;i++){
        var ident = "time"+i.toString().padStart(2,'0')
        obj[ident] = ""
        }
      }
      for (let i = 0; i < value.length; i++)
        {
        if (value[i].Date === date) {
          for (var item in value[i]){
            if ((item === "Id") || (item === "Date") || (item === "Employee")) {continue}
            for(var j of this.state.contrItem)
            {
              if (j.Id === value[i][item]){
                value[i][item] = j.ShortNameContract
                break
              }
            }
            //console.log(value[i][item])
          }
          obj = value[i]
        }
      }
      const row = { Date:date, Employee:value[0].Employee }
      Object.assign(row, obj)
      const newRow = [...this.state.rows, row]
      this.setState({rows: newRow})
    }
    console.log(this.state.rows)
  }

  saveDataInDB = ()=>
  {
    //var newRow = {}//[...this.state.rows]
    //console.log(newRow)
    let RowSave = []
    for (let i = 0; i < this.state.rows.length; i++){
      var newRow = {}
      for (var item in this.state.rows[i]){
        if ((item === "Id") || (item === "Date") || (item === "Employee")) 
        {
          //console.log(this.state.rows[i].item)
          newRow[item] = this.state.rows[i][item]
          continue
        }
        if (this.state.rows[i][item] === "")
        {
          newRow[item] = ""
          continue
        }
        for(var j of this.state.contrItem){
              if (j.ShortNameContract === this.state.rows[i][item]){
                newRow[item] = j.Id
                break
              } 
            }
      }
      RowSave = [...RowSave, newRow]
      console.log("row [",i,"] = ", RowSave)
    }

    // for (let i = 0; i < this.state.rows.length; i++)
    //     {
    //       var value ={}
    //       for (var item in this.state.rows[i]){
    //         if ((item === "Id") || (item === "Date") || (item === "Employee")) {continue}
    //         for(var j of this.state.contrItem)
    //         {
    //           if (j.ShortNameContract === this.state.rows[i][item]){
    //             value[item] = j.Id
    //             break
    //           }
    //         }
    //         //console.log(value[i][item])
    //       }
    //       console.log(value)
    //   }
    axios.put(process.env.REACT_APP_API+'workplan/', RowSave)
    .then(response => console.log("response",response ))
    .catch(error => console.log("error.response",error.response))
    console.log("Сохранить значения в БАЗУ")
  }

  render() {
    return (
      <div>
          <OptionsDrawer updateData={this.updateData} saveDataInDB={this.saveDataInDB} />
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