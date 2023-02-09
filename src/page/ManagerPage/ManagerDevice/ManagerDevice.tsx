import React from 'react'
import { Checkbox, MenuProps } from 'antd';
import { MdAdd } from 'react-icons/md';
import { FiPower } from 'react-icons/fi';
import { FiLock } from 'react-icons/fi';
import { RiDeleteBinFill } from 'react-icons/ri';
import DropDown from '../../../components/DropDown'
import FeatureInPage from '../../../components/FeatureInPage';
import InputSearch from '../../../components/InputSearch';
import root from '../manager.module.scss'
import { ColumnsType } from 'antd/es/table';
import CustomTable from '../../../components/Table';
import { RxDotFilled } from 'react-icons/rx';

interface DataType {
  checkbox: any,
  stt: number,
  key: number,
  nameDevice: string,
  status: boolean,
  address: string,
  duration: string,
  MacAddress: string,
  memory: string
}

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

  
  const dataSource: DataType[] = [
    {
      checkbox: '',
      stt: 1,
      key: 1,
      nameDevice: 'Device A12231',
      status: true,
      address: '86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh',
      duration: '21/04/2021',
      MacAddress: '123.12.156.10',
      memory: '0.00GB/32GB'
    }, 
    {
      checkbox: '',
      stt: 2,
      key: 2,
      nameDevice: 'Device A12231',
      status: false,
      address: '86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh',
      duration: '21/04/2021',
      MacAddress: '123.12.156.10',
      memory: '0.00GB/32GB'
    }, 
    {
      checkbox: '',
      stt: 3,
      key: 3,
      nameDevice: 'Device A12231',
      status: true,
      address: '86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh',
      duration: '21/04/2021',
      MacAddress: '123.12.156.10',
      memory: '0.00GB/32GB'
    }, 
    {
      checkbox: '',
      stt: 4,
      key: 4,
      nameDevice: 'Device A12231',
      status: false,
      address: '86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh',
      duration: '21/04/2021',
      MacAddress: '123.12.156.10',
      memory: '0.00GB/32GB'
    }, 
    {
      checkbox: '',
      stt: 5,
      key: 5,
      nameDevice: 'Device A12231',
      status: true,
      address: '86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh',
      duration: '21/04/2021',
      MacAddress: '123.12.156.10',
      memory: '0.00GB/32GB'
    }, 
    {
      checkbox: '',
      stt: 6,
      key: 6,
      nameDevice: 'Device A12231',
      status: false,
      address: '86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh',
      duration: '21/04/2021',
      MacAddress: '123.12.156.10',
      memory: '0.00GB/32GB'
    }, 
    {
      checkbox: '',
      stt: 7,
      key: 7,
      nameDevice: 'Device A12231',
      status: true,
      address: '86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh',
      duration: '21/04/2021',
      MacAddress: '123.12.156.10',
      memory: '0.00GB/32GB'
    }, 
    {
      checkbox: '',
      stt: 8,
      key: 8,
      nameDevice: 'Device A12231',
      status: true,
      address: '86/33, Âu Cơ, Phường 9, Tân Bình, TP Hồ Chí Minh',
      duration: '21/04/2021',
      MacAddress: '123.12.156.10',
      memory: '0.00GB/32GB'
    }, 
  ]
  const coulumsTable: ColumnsType<DataType> = [
    {
      title: '',
      dataIndex: 'checkbox',
      key: 'checkbox',
      render: (_, ) => {

        return <Checkbox />
      }
    },
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt'
    },
    {
      title: 'Tên thiết bị',
      dataIndex: 'nameDevice',
      key: 'nameDevice'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, {status}) => (
        <>{status ? 
          <p><RxDotFilled color="green" />Đang kích hoạt | Đang hoạt động</p> : 
          <p><RxDotFilled color="red" />Ngừng kích hoạt</p>}</>
      )
    },
    {
      title: 'Địa điểm',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Hạn hợp đồng',
      dataIndex: 'duration',
      key: 'duration'
    },
    {
      title: 'MAC Address',
      dataIndex: 'MacAddress',
      key: 'MacAddress'
    },
    {
      title: 'Memory',
      dataIndex: 'memory',
      key: 'memory'
    },
  ]

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
        <CustomTable columns={coulumsTable} dataSrouce={dataSource} heightProps={70} />
      </div>
      <FeatureInPage featureProps={featureProp} />
    </div>
  )
}

export default ManagerDevice