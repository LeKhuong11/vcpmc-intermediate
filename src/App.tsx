import { Space, message } from 'antd';
import Button from 'antd/es/button';
import Dropdown from 'antd/es/dropdown';
import { MenuProps } from 'antd/es/menu';
import React from 'react';
import { Routes } from 'react-router';
import { Route } from 'react-router-dom';
import './App.css';
import Sidebar from './layout/Sidebar';
import { publicRoutes } from './routes';
import { DownOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Avatar from 'antd/es/avatar';
import Typography from 'antd/es/typography';

interface typeRoute {
  component: Function,
  path: string
}

function App() {


  const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };

  const items: MenuProps['items'] = [
    {
      label: '1st menu item',
      key: '1'
    },
    {
      label: '2nd menu item',
      key: '2'
    },
    {
      label: '3rd menu item',
      key: '3',
      danger: true,
    },
    {
      label: '4rd menu item',
      key: '4',
      danger: true,
      disabled: true,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const SpaceStyled = styled(Space)`
    &&& {
      .ant-btn-default {
        background-color: transparent;
        color: #fff;
        margin: 0 15px;
      }
      :where(.css-dev-only-do-not-override-1n7nwfa).ant-dropdown .ant-dropdown-menu{
        background-color: #3E3E5B;
        color: #fff;
      }
    }
  `

  const TypographyStyled = styled(Typography.Text)`
    &&& {
      :where(.css-dev-only-do-not-override-1n7nwfa).ant-typography {
        color: #fff;
      }
    }
  `
  return (
    <div className="App">
        <Sidebar />
        <div className='app-content-main'>
          <div className='app-header'>
            <SpaceStyled>
              <Dropdown menu={menuProps}>
                <Button>
                  <Space>
                    Language 
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </SpaceStyled>
            <div>
              <Avatar>A</Avatar>
              <TypographyStyled>Ng.Tuyet</TypographyStyled>
            </div>
          </div>
          <div>
            <Routes>
              {publicRoutes.map((route: typeRoute, index: number) => {
                const Page = route.component;
                return <Route key={index} path={route.path} element={<Page />} />
              })}
            </Routes>
          </div>
        </div>
    </div>
  );
}

export default App;
