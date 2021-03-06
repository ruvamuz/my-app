import React from "react";
import ReactDataGrid from "react-data-grid";
import { Modal, Select, Form, Button, message, Input } from 'antd';
import OptionsDrawer from './optionsDrawer'
import axios from 'axios';
import "./styles.css";

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
      //EditNoteRow: 1,
      EditNote: "",
      isModalSelectContract: false,
      isModalEditNote: false,
      contrItem:[],
      oldValue: {},
      columns: [
        //{ key: 'id', name: 'ID' },
        { key: "Date",  name: "Дата", width: 90 },
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
        { key: "Note", name: "Примечания", editable: false, width: 105, 
        // events: {
        //   onDoubleClick: 
        //     (ev, args) => this.setIsModalVisibleNote(args, true), 
        //   }
        },
      ]
    }
  }

  componentDidMount(){
    this.getContract();
    //console.log("contract", this.state.contrItem)
  }

  setIsModalVisibleContract(value){
    this.setState({isModalSelectContract:value})
  }

  setIsModalVisibleNote(args, value){
    //if (typeof args.rowIdx === 'number' && !isNaN(args.rowIdx)){
      //this.setState({EditNoteRow:args.rowIdx})
      if ( args.topLeft === undefined) {return}
      console.log("Open modal - rowIdx : ", args.topLeft.rowIdx)
      this.setState({EditNote: this.state.rows[args.topLeft.rowIdx]})
      this.setState({isModalEditNote:value})
    //}
  }

  showModalSelectContract = (value) => {
    //console.log("value: ", value)
    if ((value.topLeft.idx === -1) || (value.topLeft.idx === 12)) {return}
    if (value.topLeft.idx === this.state.oldValue) 
    {return}
    else {
      this.setState({oldValue:value.topLeft.idx})  
      this.setState({args:value});
      this.setIsModalVisibleContract(true);
    }
  };

  handleCancel = () => {
    this.setIsModalVisibleContract(false);
    this.setIsModalVisibleNote(false);
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
      const inputUpdate ={[this.state.columns[i].key] : updateValue}
      this.onGridRowsUpdated({cellKey:this.state.columns[i].key, fromRow: topLeft.rowIdx,toRow: topLeft.rowIdx,updated: inputUpdate})
    }
    this.setIsModalVisibleContract(false);
  };

  saveNote = (e) =>{
    console.log(e)
    console.log("Сохранить примечание")
  }

  updateData = (value, startDate, endDate) =>{
    var startDateMS = Date.parse(startDate)
    var endDateMS = Date.parse(endDate)
    console.log("value: ",value)
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
    let RowSave = []
    for (let i = 0; i < this.state.rows.length; i++){
      var newRow = {}
      for (var item in this.state.rows[i]){
        if ((item === "Id") || (item === "Date") || (item === "Employee") || (item === "Note")) 
        {
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
    axios.put(process.env.REACT_APP_API+'workplan/', RowSave)
    .then(res => message.info(res.data))
    .catch(error => console.log("error.response",error.response))
  }

  render() {
    return (
      <div>
          <OptionsDrawer updateData={this.updateData} saveDataInDB={this.saveDataInDB} />
          <ReactDataGrid
          columns={this.state.columns}
          rowGetter={i => this.state.rows[i]}
          rowsCount={this.state.rows.length}
          minHeight={750}
          minWidth={1150}
          onGridRowsUpdated={this.onGridRowsUpdated}
          enableCellSelect={true}
          cellRangeSelection={{
            onComplete: args => { if (args.topLeft.idx === 12){
                  this.setIsModalVisibleNote(args, true)
                } else {
                  this.showModalSelectContract(args)
              }
            }
          }}
          />
        

        <Modal title="Выбор контракта"
        visible={this.state.isModalSelectContract} 
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
        
        <Modal title="Примечания"
        visible={this.state.isModalEditNote}
        onCancel={this.handleCancel}
        footer={null}
        >
          <Form
            {...layout}
            name="basic"
            onFinish={this.saveNote}
          >
            <Form.Item
              name="Note"
            >
              <Input.TextArea style={{ width: 1200 }} 
              defaultValue={this.state.EditNote.Note
                  // if (this.state.EditNote.Note !== undefined){
                  //   return this.state.EditNote.Note
                  // }
              }
              />
              
            </Form.Item>
            
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" >
                Добавить 
              </Button>
            </Form.Item>
          </Form>

        </Modal>
      </div>
    );
  }
}
