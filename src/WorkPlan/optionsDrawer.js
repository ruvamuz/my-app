import React from 'react';
import {Button, Drawer, DatePicker, Select, Form } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { RangePicker } = DatePicker;

export default class OptionsDrawer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      Employee: [],
      visible: false,
      placement: 'left',
      Option: Select,
      SelectEmployeeId: "",
      Date: "",
    }
  }
  
    showDrawer = () => {
      this.setState({
        visible: true,
      });
    };
  
    onClose = () => {
      this.setState({
        visible: false,
      });
    };
  
    onChange = e => {
      this.setState({
        placement: e.target.value,
      });
    };

    componentDidMount(){
      this.getEmployee();
    }

    onFinish = (values) => {
      //console.log('startDate :', this.state.Date[0] );
      var startDate = this.state.Date[0];
      //console.log('endDate :', this.state.Date[1] );
      var endDate = this.state.Date[1];
      //console.log('employeeId:', this.state.SelectEmployeeId);
      var employeeId = this.state.SelectEmployeeId;

      axios.get(process.env.REACT_APP_API+'WorkPlan/'+
      employeeId+"/"+
      startDate+"/"+
      endDate
      )
      .then(res => this.props.updateData(res.data, startDate, endDate))
    }
    //onClick={() => { this.props.updateData(this.state.name)}}


    handleChangeEmployee = (value) => {
      //console.log(value)
      this.setState({SelectEmployeeId: value})
    }

    disabledDate = (current) => {
        let customDate = moment().add(1,'d').format("YYYY-MM-DD");
        return current && current >= moment(customDate, "YYYY-MM-DD");
    }

    onChangeDate = (date, dateString) => {
      //Переменная date не используется но её нельзя убирать. 
      //Без нее не получите dateString в виде объекта из 2 дат
      //console.log("date", date)
      //console.log("dateString", dateString)
      this.setState({Date: dateString})
    }
  
    getEmployee(){
      axios.get(process.env.REACT_APP_API+'employee')
      .then(res => {
          //console.log(res.data)
          this.setState({Employee: res.data})
      })
    }

    render() {
      const { placement, visible, Option, Employee } = this.state;
      return (
        <>
          <Button type="primary" onClick={this.showDrawer}>
              Запрос календаря сотрудника
            </Button>
          <Drawer
            title="Basic Drawer"
            width="400"
            placement={placement}
            closable={false}
            onClose={this.onClose}
            visible={visible}
            key="right"
          >

            <Form
            {...layout}
            name="basic"
            onFinish={this.onFinish}
            >
              <Form.Item label="Диапазон дат:">
                <RangePicker
                  format="YYYY-MM-DD"
                  disabledDate={this.disabledDate}
                  onChange={this.onChangeDate}
                />
              </Form.Item>

              <Form.Item label="Cотрудник:">
                <Select value="Сотрудники" style={{ width: 200 }} 
                  defaultValue={this.state.SelectEmployee}
                  onChange={this.handleChangeEmployee}
                >
                  {Employee.map(item => 
                  {return  <Option key={item.Id} value={item.Id.toString()}>
                              {item.Name+" "+ item.Family}
                          </Option>
                  })}
                </Select> 
              </Form.Item>

              <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Запрос
                  </Button>
                </Form.Item>
              
            </Form>
          </Drawer>
        </>
      );
    }
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
