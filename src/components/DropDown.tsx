import React from 'react'
import Button from 'antd/es/button';
import Dropdown from 'antd/es/dropdown';
import { DownOutlined } from '@ant-design/icons';
import { Space, } from 'antd';
import styled from 'styled-components';

interface Iprops {
    menuProps: {},
    orange?: boolean
}

function DropDown(props: Iprops) {
    const SpaceStyled = styled(Space)`
    &&& {
      .ant-btn-default {
        background-color: transparent;
        color: #C8C8DB;
        margin: 0 15px;
        border: 1px solid ${props.orange ? '#FF7506;' : '#fff'};
      }
      :where(.css-dev-only-do-not-override-1n7nwfa).ant-dropdown .ant-dropdown-menu{
        background-color: #3E3E5B;
        color: #fff;
      }
    }
    `
  return (
    <div>
    <SpaceStyled>
        <Dropdown menu={props.menuProps}>
        <Button>
            <Space>
            Tat Ca 
            <DownOutlined />
            </Space>
        </Button>
        </Dropdown>
    </SpaceStyled>
    </div>
  )
}

export default DropDown