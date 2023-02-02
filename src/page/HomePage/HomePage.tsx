import React from 'react'
import { Outlet } from 'react-router';
import Sidebar from '../../layout/Sidebar';
import styled from 'styled-components';
import Avatar from 'antd/es/avatar';
import Typography from 'antd/es/typography';
import { MenuProps, message } from 'antd';
import DropDown from '../../components/DropDown';
import root from './home.module.scss';
import { Link } from 'react-router-dom';

const TypographyStyled = styled(Typography.Text)`
&&& {
  :where(.css-dev-only-do-not-override-1n7nwfa).ant-typography {
    color: #fff;
  }
}
`

function HomePage() {

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
    },
    {
      label: '4rd menu item',
      key: '4',
    },
  ];
  
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  
  return (
    <div className={root.home}>
      <Sidebar />
      <div className={root.homeContentMain}>
        <div className={root.homeHeader}>
            <DropDown menuProps={menuProps} />
          <div>
            <Link to="dashboard">
              <Avatar style={{ backgroundColor: '#f56a00', marginRight: 5 }}>T</Avatar>
              <TypographyStyled>Ng.Tuyet</TypographyStyled>
            </Link>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default HomePage