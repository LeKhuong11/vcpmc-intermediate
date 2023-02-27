import React, { memo } from 'react'
import Button from 'antd/es/button';
import Dropdown from 'antd/es/dropdown';
import { DownOutlined } from '@ant-design/icons';
import { Space, } from 'antd';
import styled from 'styled-components';

interface Iprops {
    menuProps: {},
    orange?: boolean
}

const SpaceStyled = styled(Space)`
    &&& {
      .ant-btn-default {
        background-color: transparent;
        color: #C8C8DB;
        margin: 0 15px;
      }
      :where(.css-dev-only-do-not-override-1n7nwfa).ant-dropdown .ant-dropdown-menu{
        background-color: #3E3E5B;
        color: #fff;
      }
      
    }
`
const DropdownStyled = styled(Dropdown)`
    &&& {
      .ant-dropdown :where(.css-dev-only-do-not-override-1n7nwfa).ant-dropdown .ant-dropdown-menu, :where(.css-dev-only-do-not-override-1n7nwfa).ant-dropdown-menu-submenu .ant-dropdown-menu {
        background-color: #3E3E5B;
      }
    }
`

function DropDown({menuProps, orange}: Iprops) {
    
  return (
    <div>
    <SpaceStyled>
        <DropdownStyled menu={menuProps}>
          <Button style={orange ? {border: '1px solid #FF7506'} : {border: '1px solid #fff'}}>
              <Space>
              Tất cả
              <DownOutlined />
              </Space>
          </Button>
        </DropdownStyled>
    </SpaceStyled>
    </div>
  )
}

export default memo(DropDown)