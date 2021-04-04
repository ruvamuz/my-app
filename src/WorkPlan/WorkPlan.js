import React from 'react';
import { Modal,Select } from 'antd';
import ReactDataGrid from 'react-data-grid';
import axios from 'axios';
import "./styles.css";

const columns = [
  { key: 'id', name: 'ID' },
  { key: "time8", name: "8:00", editable: true },
  { key: "time9", name: "9:00", editable: true },
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

const rows = [
  {id: 0, key:0, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", }, 
  {id: 1, key:1, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 2, key:2, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 3, key:3, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 4, key:4, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 5, key:5, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 6, key:6, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 7, key:7, time8:"", time9:"wer", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 8, key:8, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 9, key:9, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 10, key:10, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 11, key:11, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 12, key:12, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 13, key:13, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 14, key:14, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 15, key:15, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 16, key:16, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 17, key:17, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 18, key:18, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 19, key:19, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
];

export class WorkPlan extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      rows,
      args:"",
      isModalVisible: false,
      Option: Select,
      contrItem:[],
    }
  }

  //state = { rows };
  
  //const { Option } = Select;
  // componentDidMount(){
  //   this.timerID = setInterval(
  //       () => console.log(this.state.isModalVisible),
  //       1000
  //   );
  // }

  // componentWillUnmount() {
  //   clearInterval(this.timerID);
  // }

  setIsModalVisible(value){
    this.setState({isModalVisible:value})
  }

  showModal = (value) => {
    this.setState({args:value});
    //console.log(this.state.args)

    this.getContract();
    this.setIsModalVisible(true);
  };

  handleOk = () => {
    this.setIsModalVisible(false);
  };

  handleCancel = () => {
    this.setIsModalVisible(false);
  };

  getContract = () => {
    axios.get(process.env.REACT_APP_API+'contract')
      .then(res => {
          this.setState({contrItem: res.data});
          //console.log(res.data)
      })
      .catch(error =>{console.log(error);})
    };

    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
      this.setState(state => {
        const rows = state.rows.slice();
        for (let i = fromRow; i <= toRow; i++) {
          rows[i] = { ...rows[i], ...updated };
        }
        return { rows };
      });
    };

  render(){
    return (
    <div>
    <ReactDataGrid
    columns={columns}
    rowGetter={i => rows[i]}
    rowsCount={30}
    minHeight={650}
    onGridRowsUpdated={this.onGridRowsUpdated}
    //enableCellSelect={true}
    cellRangeSelection={{
      //onStart: e => console.log("onStart",e.topLeft ),
      // onUpdate: args => console.log(args),
      
      onComplete: (args) => this.showModal(args)
      
      // onComplete: (args) => this.showModal(args)
      // onComplete: args => console.log(
      //   "onComplete: args.startCell", args.startCell,
      //   "args.topLeft ", args.topLeft, 
      //   "args.bottomRight:", args.bottomRight
      //   )
    }}
    />
    
      <Modal title="Basic Modal"
      visible={this.state.isModalVisible} 
      onOk={this.handleOk} 
      onCancel={this.handleCancel}
      >
        <Select style={{ width: 470 }}>
          {this.state.contrItem.map(item => 
            {
              return  <Select key={item.Id} value={item.ShortNameContract}>
                        {item.ShortNameContract}
                      </Select>
            })}
        </Select>
        {console.log(this.state.args)}
        {/* <p>{this.state.args.bottomRight.toString()}</p> */}
      </Modal>
    </div>
    );
  }
}
