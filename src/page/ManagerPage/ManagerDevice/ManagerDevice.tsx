import React, { useEffect, useState } from 'react'
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
import { usePaymentsCollection } from '../../../hooks/useSnapshot';
import { DataTypeDevice, fetchDevice } from '../../../redux/slice/deviceSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';


function ManagerDevice() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [ selectDevice, setSelectDevice ] = useState()
  const { payments, loading } = usePaymentsCollection('device');
  const { devices } = useAppSelector(state => state.devices)
  const [ listDevice, setListDevice ] = useState<DataTypeDevice[]>(devices)

  useEffect(() => {
    dispatch(fetchDevice())
    setListDevice(payments)
  }, [payments])

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
      text: 'Thêm thiết bị',
      event: () => navigate('add-device')
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

  
  const dataSource: DataTypeDevice[] = listDevice
  const coulumsTable: ColumnsType<DataTypeDevice> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (_, {}, index) => (
        <p>{index + 1}</p>
      )
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
      key: 'memory',
      render: (_, {memory}) => (
        <p>{memory}GB</p>
      )
    },
  ]
  
  const rowSelection = {
    onChange: (selectedRowKeys: number, selectedRows: DataTypeDevice[], ) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onselect: (record: any, selected: any, selectedRows: DataTypeDevice[],) => {
        console.log(selectedRows);
        
    }
    
  };

  return (
    <div className={root.managerDevice}>
      <h3>Danh sách thiết bị</h3>
      <div className={root.dropdownAndSearch}>
        <div>
          <DropDown orange menuProps={menuProps} />
          <DropDown orange menuProps={menuProps} />
        </div>
        <div>
          <InputSearch placehoder='Tìm thiết bị theo tên, SKU, địa điểm, địa chỉ Mac' />
        </div>
      </div>
      <div>
        <CustomTable pagination={true} rowSelection={rowSelection} columns={coulumsTable} dataSrouce={dataSource} heightProps={70} />
      </div>
      <FeatureInPage featureProps={featureProp} />
    </div>
  )
}

export default ManagerDevice