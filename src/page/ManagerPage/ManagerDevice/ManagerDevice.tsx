import { MenuProps } from 'antd';
import React from 'react'
import DropDown from '../../../components/DropDown'
import InputSearch from '../../../components/InputSearch';
import root from '../manager.module.scss'


function ManagerDevice() {

  const handleMenuClick: MenuProps['onClick'] = (e) => {
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
    <div className={root.managerDevice}>
      <h2>Danh sách thiết bị</h2>
      <div className={root.dropdownAndSearch}>
        <div>
          <DropDown menuProps={menuProps} />
          <DropDown menuProps={menuProps} />
        </div>
        <div>
          <InputSearch placehoder='Tìm thiết bị theo tên, SKU, địa điểm, địa chỉ Mac' />
        </div>
      </div>
    </div>
  )
}

export default ManagerDevice