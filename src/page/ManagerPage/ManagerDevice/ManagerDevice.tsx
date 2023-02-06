import React from 'react'
import { MenuProps } from 'antd';
import { MdAdd } from 'react-icons/md';
import { FiPower } from 'react-icons/fi';
import { FiLock } from 'react-icons/fi';
import { RiDeleteBinFill } from 'react-icons/ri';
import DropDown from '../../../components/DropDown'
import FeatureInPage from '../../../components/FeatureInPage';
import InputSearch from '../../../components/InputSearch';
import root from '../manager.module.scss'
import Table from './components/Table';


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

  const store = [
    {
      stt: 1,
      id: 1,
      nameDevice: 'Device A12231',
      status: true,
      address: '86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh',
      duration: '21/04/2021',
      MacAddress: '123.12.156.10',
      memory: '0.00GB/32GB'
    }, 
    {
      stt: 2,
      id: 2,
      nameDevice: 'Device A12231',
      status: false,
      address: '86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh',
      duration: '21/04/2021',
      MacAddress: '123.12.156.10',
      memory: '0.00GB/32GB'
    }, 
    {
      stt: 3,
      id: 3,
      nameDevice: 'Device A12231',
      status: true,
      address: '86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh',
      duration: '21/04/2021',
      MacAddress: '123.12.156.10',
      memory: '0.00GB/32GB'
    }, 
    {
      stt: 4,
      id: 4,
      nameDevice: 'Device A12231',
      status: false,
      address: '86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh',
      duration: '21/04/2021',
      MacAddress: '123.12.156.10',
      memory: '0.00GB/32GB'
    }, 
    {
      stt: 5,
      id: 5,
      nameDevice: 'Device A12231',
      status: true,
      address: '86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh',
      duration: '21/04/2021',
      MacAddress: '123.12.156.10',
      memory: '0.00GB/32GB'
    }, 
    {
      stt: 6,
      id: 6,
      nameDevice: 'Device A12231',
      status: false,
      address: '86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh',
      duration: '21/04/2021',
      MacAddress: '123.12.156.10',
      memory: '0.00GB/32GB'
    }, 
    {
      stt: 7,
      id: 7,
      nameDevice: 'Device A12231',
      status: true,
      address: '86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh',
      duration: '21/04/2021',
      MacAddress: '123.12.156.10',
      memory: '0.00GB/32GB'
    }, 
    {
      stt: 8,
      id: 8,
      nameDevice: 'Device A12231',
      status: true,
      address: '86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh',
      duration: '21/04/2021',
      MacAddress: '123.12.156.10',
      memory: '0.00GB/32GB'
    }, 
  ]

  const featureProp=[
    {
      icon: MdAdd,
      text: 'Thêm thiết bị'
    },
    {
      icon: FiPower,
      text: 'Kích hoạt thiết bị'
    },
    {
      icon: FiLock,
      text: 'Khóa thiết bị'
    },
    {
      icon: RiDeleteBinFill,
      text: 'Xóa thiết bị'
    }
  ]

  const column = ['', 'STT', 'Tên thiết bị',  'Trạng thái', 'Địa điểm', 'Hạn hợp đồng', 'MAC Address', 'Memory'];
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
      <div>
        <Table column={column} store={store} heightProp={70} />
      </div>
      <FeatureInPage featureProps={featureProp} />
    </div>
  )
}

export default ManagerDevice