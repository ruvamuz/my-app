//Попытка добавить стандартный модуль календаря, больше ничего интересного нет.

import {React, Component} from 'react';
import { Calendar, Alert } from 'antd';
import moment from 'moment';

export class CalendarWork extends Component {
  state = {
    value: moment('2021-03-25'),
    selectedValue: moment('2021-03-25'),
  };

  onSelect = value => {
    this.setState({
      value,
      selectedValue: value,
    });
  };

  onPanelChange = value => {
    this.setState({ value });
  };

  render() {
    const { value, selectedValue } = this.state;
    return (
      <>
        <Alert
          message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`}
        />
        <Calendar value={value} onSelect={this.onSelect} mode="year" onPanelChange={this.onPanelChange} />
      </>
    );
  }
}