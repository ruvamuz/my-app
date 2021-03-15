import {React, Component} from 'react';
import { Table, Space, Button } from 'antd';
import {AddContractModal} from './Contract/AddContractModal';



  export class TableWork extends Component{

    constructor(props){
        super(props);
        this.state={deps:[], addModalShow: false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'contract')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteContract(contrId){
        if(window.confirm('Вы уверенны что хотите удалить?')){
            fetch(process.env.REACT_APP_API+'contract/'+contrId,{
                method: 'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }
    
    // onEdit(id) {
    //     console.log('Edit number', id)
    // }

      render(){
        const columns = [
        { title: 'Идентификатор', dataIndex: 'ContractId', key: 'ContractId', render: text => <a>{text}</a>, },
        { title: 'Краткое наименование', dataIndex: 'ShortNameContract', key: 'ShortNameContract',  },
        { title: 'Полное наименование',  dataIndex: 'FullNameContract',  key: 'FullNameContract',
        },
        { title: 'Action', key: 'action',
          render: (action, record) => (
            <Space size="middle">
              {/* <Button type="primary" onClick={(record) => onEdit(1)}> Edit  </Button> | */}
              <Button danger> Delete </Button>
                  {/* <Button onClick={()=>this.deleteContract(item.ContractId)}>
                          Delete
                  </Button> */}
            </Space>
          ),
        },
      ];

      

        const {deps} = this.state;
        let addModalClose = () => this.setState({addModalShow:false});
          return(
           <div>
               <Table columns={columns} dataSource={deps} />

               <Button type='primary' 
                onClick={()=>this.setState({addModalShow:true})}>
                    Add conttract
                </Button>

            <AddContractModal show={this.state.addModalShow}
            onHide={addModalClose}/>

           </div>
          )
      }
  }