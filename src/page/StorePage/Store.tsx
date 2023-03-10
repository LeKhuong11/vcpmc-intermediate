import React, { useEffect, useState } from 'react'
import {  MenuProps, message } from 'antd';
import DropDown from '../../components/DropDown';
import root from './store.module.scss';
import { SlNote } from 'react-icons/sl';
import FeatureInPage from '../../components/FeatureInPage';
import InputSearch from '../../components/InputSearch';
import { ColumnsType } from 'antd/es/table';
import CustomTable from '../../components/Table';
import { RxDotFilled } from 'react-icons/rx';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { Link } from 'react-router-dom';
import { DataTypeStoreMusic, fetchStoreMusic } from '../../redux/slice/storeSlice';
import { usePaymentsCollection } from '../../hooks/useSnapshot';
import Loading from '../../components/Loading';
import Card from './components/Card';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useSearch } from '../../hooks/useSearch';
import { FaTimes } from 'react-icons/fa';
import { AiOutlineCheck } from 'react-icons/ai';


function Store() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user)
  const storeMusic = useAppSelector(state => state.storeMusic.store);
  const [store, setStore] = useState(storeMusic)
  const { payments, loading} = usePaymentsCollection('store-music');
  const [ displaySwitch, setDisplaySwitch ] = useState('row')
  const [ search, setSearch ] = useSearch(storeMusic, 'nameMusic');
  const [ displayRowSelection, setDisplayRowSelection ] = useState(false)
  
  //listen to 'search' change returned from useSearch();
  useEffect(() => {
    setStore(search)
  }, [search])

  useEffect(() => {
    dispatch(fetchStoreMusic());
  }, [])
  
  // listen 
  // When data changes on firestore, we receive that update here in this
  // callback and then update the UI based on current state 
  useEffect(() => {
    setStore(payments)
  }, [payments])
  
  
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };
  
  //handle search song
  const handleChangeSetSearchValue = (e: any) => {
    const value = e.value;
    setSearch(value);
  }

  const items: MenuProps['items'] = [
    {
      label: 'T???t c???',
      key: '1',
    },
    {
      label: 'Pop',
      key: '2'
    },
    {
      label: 'EDM',
      key: '3'
    },
    {
      label: 'Ballad',
      key: '4',
    }
  ];
  
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const handleClickApproveSong = () => {
    setDisplayRowSelection(false);
    message.success('???? ph?? duy???t')
  }
  const handleClickCancelApproveSong = () => {
    setDisplayRowSelection(false);
    message.success('???? h???y ph?? duy???t')
  }

  const featureProps = displayRowSelection ? [
    {
      icon: AiOutlineCheck,
      text: 'Ph?? duy???t',
      event: handleClickApproveSong,
      color: '#0FBF00'
    },
    {
      icon: FaTimes,
      text: 'T??? ch???i',
      event: handleClickCancelApproveSong
    }
  ] :[
    {
      icon: SlNote,
      text: "Qu???n l?? ph?? duy???t",
      event: () => {
        user.isAdmin ? setDisplayRowSelection(true) : message.warning('Ch???c n??ng n??y ch??? d??nh cho ng?????i qu???n l??')
      },
      unActive: user.isAdmin ? false : true
    }
  ]   
  
  //table 
  const dataSource: DataTypeStoreMusic[] = store
  const columns: ColumnsType<DataTypeStoreMusic> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (_, {}, index) => {

        return <p>{index + 1}</p>
      }
    },
    {
      title: 'T??n b???n ghi',
      dataIndex: 'nameMusic',
      key: 'nameMusic'
    },
    {
      title: 'M?? IRC',
      dataIndex: 'IRCID',
      key: 'IRCID'
    },
    {
      title: 'Th???i l?????ng',
      dataIndex: 'time',  
      key: 'time'
    },
    {
      title: 'Ca s??',
      dataIndex: 'singer',
      key: 'singer'
    },
    {
      title: 'T??c gi???',
      dataIndex: 'author',
      key: 'author'
    },
    {
      title: 'Th??? lo???i',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: '?????nh d???ng',
      dataIndex: 'format',
      key: 'format'
    },
    {
      title: 'Th???i h???n s??? d???ng',
      dataIndex: 'date',
      key: 'date',
      render: (_, { status }) => {

        return <>{status ? <p><RxDotFilled color="blue" />C??n th???i h???n</p> : <p><RxDotFilled color="gray" />H???t th???i h???n</p>}</>
      }
    },
    {
      title: '',
      dataIndex: 'status',
      key: 'status',
      render: (_, { id }) => {
        
        return <>
          {user.isAdmin ? <Link to={`update-infomation/${id}`}>C???p nh???t</Link> : ''}
        </>
      }
    },
    {
      title: '',
      dataIndex: 'status2',
      key: 'status2',
      render: (_, { }) => {

        return <a>Nghe</a>
      }
    },
  ]

  const rowSelection = {
    onChange: (selectedRowKeys: number, selectedRows: any, ) => {
    }
  };

  return (
    <>
      {loading ? <Loading /> : 
        <div className={root.store}>
          <h3>Kho b???n ghi</h3>
          <div>
            <div>
              <InputSearch 
                placehoder='T??n b???n ghi,...'
                name='searchStore'
                setValue={handleChangeSetSearchValue}
              />
            </div>
            <div>
              <div className={root.options}>
                <div>
                  <p>Th??? lo???i: </p>
                  <DropDown menuProps={menuProps} orange />
                </div>
                <div>
                  <p>?????nh d???ng: </p>
                  <DropDown menuProps={menuProps} orange />
                </div>
                <div>
                  <p>Th???i h???n s??? d???ng: </p>
                  <DropDown menuProps={menuProps} orange />
                </div>
                <div>
                  <p>Tr???ng th??i: </p>
                  <DropDown menuProps={menuProps} orange />
                </div>
                <div className={root.switch}>
                  <span className={displaySwitch === 'row' ? root.active : ''} onClick={() => setDisplaySwitch('row')}>
                    <UnorderedListOutlined />
                  </span>
                  <span className={displaySwitch === 'table' ?  root.active : ''} onClick={() => setDisplaySwitch('table')}>
                    <AppstoreOutlined />
                  </span>
                </div>
              </div>
            </div>
            {displaySwitch === 'row' && 
              <CustomTable 
                rowSelection={displayRowSelection ? rowSelection : false} 
                pagination={{pageSize: displayRowSelection ? 8 : 9}} columns={columns} 
                dataSrouce={dataSource} 
                heightProps={66} 
            /> }
            {displaySwitch === 'table' &&
              <div className={root.listSongTable}>
              {store.length ? store.map(item => (
                <Card displayRowSelection={displayRowSelection} song={item} />
              )) : <p className={root.notfoundSong}>Kh??ng t??m th???y b???n ghi</p>}
          </div>
            }
        </div>
        <FeatureInPage featureProps={featureProps} />
      </div>
      }
    </>
  )
}

export default Store