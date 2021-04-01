import React from 'react';
import { Modal } from 'antd';
import ReactDataGrid from 'react-data-grid';

const columns = [
  { key: 'id', name: 'ID' },
  // { key: 'title', name: 'Title' },
  // { key: 'count', name: 'Count' }, 
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
  {id: 0, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", }, 
  {id: 1, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 2, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 3, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 4, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 5, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 6, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 7, time8:"", time9:"wer", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 8, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 9, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 10, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 11, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 12, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 13, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 14, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 15, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 16, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 17, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 18, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
  {id: 19, time8:"", time9:"", time10:"", time11:"", time12:"", time13:"", time14:"", time15:"", time16:"", time17:"", time18:"", time19:"", },
];

export class WorkPlan extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      rows,
      points: null,
      isModalVisible: false
    }
  }

  // componentDidMount(){
  //   this.timerID = setInterval(
  //       () => console.log(this.state.isModalVisible),
  //       1000
  //   );
  // }

  // componentWillUnmount() {
  //   clearInterval(this.timerID);
  // }

  //state = { rows };

  setIsModalVisible(value){
    this.setState({isModalVisible:value})
  }

  showModal = (args) => {
    console.log(this.state.points)
    this.setState({points:args});
    //if (this.state.points ===null) console.log(this.state.points.bottomRight);
    this.setIsModalVisible(true);
  };

  handleOk = () => {
    this.setIsModalVisible(false);
  };

  handleCancel = () => {
    this.setIsModalVisible(false);
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
    //minHeight={450}
    onGridRowsUpdated={this.onGridRowsUpdated}
    enableCellSelect={true}
    cellRangeSelection={{
      //onStart: e => console.log("onStart",e.topLeft ),
      //onUpdate: args => console.log(args.topRight),
      onComplete: (args) => this.showModal(args)
      // onComplete: args => console.log(
      //   "onComplete: args.startCell", args.startCell,
      //   "args.topLeft ", args.topLeft, 
      //   "args.bottomRight:", args.bottomRight
      //   )
    }}
    />
    
      <Modal title="Basic Modal"
      {...this.state.points} 
      visible={this.state.isModalVisible} 
      onOk={this.handleOk} 
      onCancel={this.handleCancel}
      >
          {/* <p>{this.state.points}</p> */}
          <p>Some contents...</p>
          <p>Some contents...</p>
      </Modal>

    </div>
    );
  }
}
