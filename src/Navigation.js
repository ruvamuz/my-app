import React,{Component} from 'react';
import { Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { BrowserRouter as Route, Link } from "react-router-dom";


export class Navigation extends Component{
    state = {
        current: 'mail',
      };
    
    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
      };

    render(){
        const { current } = this.state;
        return(
            <div>
                <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
            Home
            <Link to="/"/>
        </Menu.Item>
        <Menu.Item key="app" icon={<AppstoreOutlined />}>
            Contract
            <Link to="/contract"/>
        </Menu.Item>
        <Menu.Item icon={<UserOutlined/>}>
            Employee
            <Link to="/employee"/>
        </Menu.Item>
        <Menu.Item icon={<CalendarOutlined/>}>
            Calendar
            <Link to="/calendar"/>
        </Menu.Item>
        <Menu.Item >
            Table
            <Link to="/table"/>
        </Menu.Item>
        <Menu.Item >
            Table_2
            <Link to="/table2"/>
        </Menu.Item>
        <Menu.Item key="alipay" disabled  >
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            Ant-d Site
          </a>
        </Menu.Item>
        
      </Menu>
      </div>
            
        )
    }
}