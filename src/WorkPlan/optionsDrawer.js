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
      var startDate = this.state.Date[0];
      var endDate = this.state.Date[1];
      var employeeId = this.state.SelectEmployeeId;

      axios.get(process.env.REACT_APP_API+'WorkPlan/'+
      employeeId+"/"+
      startDate+"/"+
      endDate
      )
      .then(res => this.props.updateData(res.data, startDate, endDate))
    }


    handleChangeEmployee = (value) => {
      this.setState({SelectEmployeeId: value})
    }

    disabledDate = (current) => {
        let customDate = moment().add(1,'d').format("YYYY-MM-DD");
        return current && current >= moment(customDate, "YYYY-MM-DD");
    }

    onChangeDate = (date, dateString) => {
      //Переменная date не используется но её нельзя убирать. 
      //Без нее не получите dateString в виде объекта из 2 дат
      this.setState({Date: dateString})
    }
  
    getEmployee(){
      axios.get(process.env.REACT_APP_API+'employee')
      .then(res => {
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
            title="Календарь сотрудника"
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
                <Select style={{ width: 200 }} 
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
            <Button type="primary" onClick={this.props.saveDataInDB}>Сохранить значения в БАЗУ</Button>
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
