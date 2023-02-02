import React from 'react'
import Input from 'antd/es/input';
import styled from 'styled-components';
import { MenuProps, message } from 'antd';
import DropDown from '../../components/DropDown';
import root from './store.module.scss';
import Table from '../../components/Table';
import { SlNote } from 'react-icons/sl';


const { Search } = Input;
const SearchStyled = styled(Search)`
  &&& {
    :where(.css-dev-only-do-not-override-1n7nwfa).ant-input-group-wrapper {
      width: 40%;
    }
    .ant-input {
      background-color: #515170;
      border: none;
      color: #fff;
      padding: 5px;
    }m
    .ant-btn {
      background-color: #515170;
      border: none;

      .anticon {
        color: #fff;
      }
    }
  }
`
function Store() {

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
    <div className={root.store}>
      <h2>Kho bản ghi</h2>
      <div>
        <div>
          <SearchStyled placeholder="Ten ban ghi, ca si,... "  />
        </div>
        <div>
          <div className={root.options}>
            <div>
              <p>Thể loại: </p>
              <DropDown menuProps={menuProps} orange />
            </div>
            <div>
              <p>Định dạng: </p>
              <DropDown menuProps={menuProps} orange />
            </div>
            <div>
              <p>Thời hạn sử dụng: </p>
              <DropDown menuProps={menuProps} orange />
            </div>
            <div>
              <p>Trạng thái: </p>
              <DropDown menuProps={menuProps} orange />
            </div>
          </div>
        </div>
          <Table />
      </div>
      <div className={root.note}>
          <div>
            <SlNote color='orange' size={27} />
          </div>
          <p>Quản lý phê duyệtv</p>
      </div>
      
    </div>
  )
}

export default Store