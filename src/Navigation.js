import React,{Component} from 'react';
import { Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

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
                    <Link to="/"/> {/* перенаправление на Home - домашнюю страницу */}
                </Menu.Item>

                <Menu.Item key="app" icon={<AppstoreOutlined />}>
                    Contract
                    <Link to="/contract"/> {/* перенаправление на Таблицу контрактов */}
                </Menu.Item>

                <Menu.Item icon={<UserOutlined/>}>
                    Employee
                    <Link to="/employee"/> {/* перенаправление на Таблицу сотрудников */}
                </Menu.Item>

                <Menu.Item icon={<CalendarOutlined/>}>
                    Calendar
                    <Link to="/calendar"/> {/* перенаправление на страницу Календаря */}
                </Menu.Item>

                <Menu.Item >
                    Table\AntD(Fail)
                    <Link to="/table"/> {/* перенаправление на Таблицу контрактов с AntD */}
                </Menu.Item>

                <Menu.Item >
                    Table_2\AntD(Fail)
                    <Link to="/table2"/> {/* перенаправление на 2 Таблицу контрактов с AntD */}
                </Menu.Item>
                                
                <Menu.Item key="alipay" >
                  <a href="https://ant.design" target="blank" rel="noopener noreferrer">
                    Ant-D site
                  </a>
                </Menu.Item>
      </Menu>
      </div>
        )
    }
}