import React, { useEffect, useState } from 'react'
import { MenuProps, message } from 'antd';
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
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/configfb';
import Loading from '../../../components/Loading';
import { useSearch } from '../../../hooks/useSearch';


function ManagerDevice() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { user } = useAppSelector(state => state.user)
  const { payments, loading } = usePaymentsCollection('device');
  const { devices } = useAppSelector(state => state.devices)
  const [ listDevice, setListDevice ] = useState<DataTypeDevice[]>(devices)
  const [ removeDevice, setRemoveDevice ] = useState<DataTypeDevice[]>([]);
  const [ search, setSearch ] = useSearch(payments, 'nameDevice');

  //listen to 'search' change returned from useSearch();
  useEffect(() => {
    setListDevice(search)
  }, [search])

  useEffect(() => {
    dispatch(fetchDevice())
    setListDevice(payments)
  }, [payments])

  const handleChangeSetSearchValue = (e: any) => {
    const value = e.value;

    setSearch(value)
  }

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

  const handleClickRemoveDevice = () => {
   if(removeDevice.length) {
    //remove item by list id 
    removeDevice.forEach(async (item)   => {
      const docRef = doc(db, 'device', `${item.id}`)
      await deleteDoc(docRef)
    })
    return 
   }
   message.warning("B???n ch??a ch???n thi???t b???")
  }

  const featureProp=[
    {
      icon: MdAdd,
      text: 'Th??m thi???t b???',
      event: () => {
        user.isAdmin ? navigate('add-device') : message.warning('Ch???c n??ng n??y ch??? d??nh cho ng?????i qu???n l??')
      },
      unActive: user.isAdmin ? false : true
    },
    {
      icon: FiPower,
      text: 'K??ch ho???t thi???t b???',
      unActive: user.isAdmin ? false : true
    },
    {
      icon: FiLock,
      text: 'Kh??a thi???t b???',
      unActive: user.isAdmin ? false : true
    },
    {
      icon: RiDeleteBinFill,
      text: 'X??a thi???t b???',
      event: () => {
        user.isAdmin ? handleClickRemoveDevice() : message.warning('Ch???c n??ng n??y ch??? d??nh cho ng?????i qu???n l??')
      },
      unActive: user.isAdmin ? removeDevice.length ? false : true : true
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
      title: 'T??n thi???t b???',
      dataIndex: 'nameDevice',
      key: 'nameDevice'
    },
    {
      title: 'Tr???ng th??i',
      dataIndex: 'status',
      key: 'status',
      render: (_, {status}) => (
        <>{status ? 
          <p><RxDotFilled color="green" />??ang k??ch ho???t | ??ang ho???t ?????ng</p> : 
          <p><RxDotFilled color="red" />Ng???ng k??ch ho???t</p>}</>
      )
    },
    {
      title: '?????a ??i???m',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'H???n h???p ?????ng',
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
    onChange: (selectedRowKeys: number, selectedRows: any, ) => {
      setRemoveDevice(selectedRows)
    }
  };

  return (
    <>
      {loading ? <Loading /> : 
        <div className={root.managerDevice}>
          <h3>Danh s??ch thi???t b???</h3>
          <div className={root.dropdownAndSearch}>
            <div>
              <DropDown orange menuProps={menuProps} />
              <DropDown orange menuProps={menuProps} />
            </div>
            <div>
              <InputSearch 
                placehoder='T??m thi???t b??? theo t??n,...' 
                setValue={handleChangeSetSearchValue}  
              />
            </div>
          </div>
          <div>
            <CustomTable 
              pagination={true} 
              rowSelection={rowSelection} 
              columns={coulumsTable} 
              dataSrouce={dataSource} 
              heightProps={70} 
            />
          </div>
          <FeatureInPage featureProps={featureProp} />
        </div>
      }
    </>
  )
}

export default ManagerDevice