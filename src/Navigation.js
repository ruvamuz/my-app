import React,{Component} from 'react';
import { Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined, UserOutlined } from '@ant-design/icons';
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
        //const { current } = this.state;
        return(
            <div>
                <Menu  mode="horizontal"> 
                {/* onClick={this.handleClick} selectedKeys={[current]} */}

                <Menu.Item key="home" icon={<HomeOutlined />}>
                    Home
                    <Link to="/"/> {/* перенаправление на Home - домашнюю страницу */}
                </Menu.Item>

                <Menu.Item icon={<AppstoreOutlined />} >
                    Contract AntD
                    <Link to="/contract"/> {/* перенаправление на Таблицу контрактов с AntD */}
                </Menu.Item>

                <Menu.Item icon={<UserOutlined/>}>
                    Employee AntD
                    <Link to="/employee"/> {/* перенаправление на 2 Таблицу контрактов с AntD */}
                </Menu.Item>

                {/* <Menu.Item icon={<UserOutlined/>}> */}
                    {/* WorkPlan */}
                    {/* <Link to="/workplan"/> перенаправление на 2 Таблицу контрактов с AntD */}
                {/* </Menu.Item> */}
                
                <Menu.Item icon={<UserOutlined/>}>
                    tableWorkPlan
                    <Link to="/tableworkplan"/> {/* перенаправление на 2 Таблицу контрактов с AntD */}
                </Menu.Item>
                                
                <Menu.Item key="alipay" >
                  <a href="https://ant.design" target="blank" rel="noopener noreferrer">
                    Ant-D site
                  </a>
                </Menu.Item>

                <Menu.Item key="swagger" >
                  <a href="http://localhost:5000/swagger/index.html" target="blank" >
                  Swagger
                  </a>
                </Menu.Item>
      </Menu>
      </div>
        )
    }
}