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

function Store() {
  const dispatch = useAppDispatch();
  const storeMusic = useAppSelector(state => state.storeMusic.store);
  const [store, setStore] = useState(storeMusic)
  const { payments, loading} = usePaymentsCollection('store-music');
  const [ displaySwitch, setDisplaySwitch ] = useState('row')
  const [ search, setSearch ] = useSearch(storeMusic, 'nameMusic');

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
      label: 'Tất cả',
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

  const featureProps = [
    {
      icon: SlNote,
      text: "Quản lí phê duyệt"
    }
  ];
  
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
      title: 'Tên bản ghi',
      dataIndex: 'nameMusic',
      key: 'nameMusic'
    },
    {
      title: 'Mã IRC',
      dataIndex: 'IRCID',
      key: 'IRCID'
    },
    {
      title: 'Thời lượng',
      dataIndex: 'time',  
      key: 'time'
    },
    {
      title: 'Ca sĩ',
      dataIndex: 'singer',
      key: 'singer'
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author'
    },
    {
      title: 'Thể loại',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Định dạng',
      dataIndex: 'format',
      key: 'format'
    },
    {
      title: 'Thời hạn sử dụng',
      dataIndex: 'date',
      key: 'date',
      render: (_, { date }) => {

        return <>{date ? <p><RxDotFilled color="blue" />Còn thời hạn</p> : <p><RxDotFilled color="gray" />Hết thời hạn</p>}</>
      }
    },
    {
      title: '',
      dataIndex: 'status',
      key: 'status',
      render: (_, { update, id }) => {
        
        return <Link to={`update-infomation/${id}`}>{update}</Link>
      }
    },
    {
      title: '',
      dataIndex: 'status2',
      key: 'status2',
      render: (_, { listen }) => {

        return <a>{listen}</a>
      }
    },
  ]


  return (
    <>
      {loading ? <Loading /> : 
        <div className={root.store}>
          <h3>Kho bản ghi</h3>
          <div>
            <div>
              <InputSearch 
                placehoder='Tên bản ghi,...'
                name='searchStore'
                setValue={handleChangeSetSearchValue}
              />
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
                <div className={root.switch}>
                  <span className={displaySwitch === 'row' ? root.active : ''} onClick={() => setDisplaySwitch('row')}>
                    <UnorderedListOutlined />
                  </span>
                  <span className={displaySwitch === 'table' ?  root.active : ''} onClick={() => setDisplaySwitch('table')}>
                    <AppstoreOutlined />
                  </span>
                  <span>

                  </span>
                </div>
              </div>
            </div>
            {displaySwitch === 'row' && <CustomTable pagination={{pageSize: 10}} columns={columns} dataSrouce={dataSource} heightProps={64} /> }
            {displaySwitch === 'table' &&
              <div className={root.listSongTable}>
              {store.length ? store.map(item => (
                <Card song={item} />
              )) : <p className={root.notfoundSong}>Không tìm thấy bản ghi</p>}
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