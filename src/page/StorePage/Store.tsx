import React, { useEffect } from 'react'
import { MenuProps, message } from 'antd';
import DropDown from '../../components/DropDown';
import root from './store.module.scss';
import { SlNote } from 'react-icons/sl';
import FeatureInPage from '../../components/FeatureInPage';
import InputSearch from '../../components/InputSearch';
import { ColumnsType } from 'antd/es/table';
import CustomTable from '../../components/Table';
import { RxDotFilled } from 'react-icons/rx';
import { useAppSelector } from '../../redux/store';
import { Link } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/configfb';
import { DataTypeStoreMusic } from '../../redux/slice/storeSlice';

function Store() {
  const storeMusic = useAppSelector(state => state.storeMusic.store);
  const [store, setStore] = React.useState(storeMusic)
  

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

  const featureProps = [
    {
      icon: SlNote,
      text: "Quản lí phê duyệt"
    }
  ];
  
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

  // listen 
  // When data changes on firestore, we receive that update here in this
  // callback and then update the UI based on current state 
  useEffect(() => {
    const colRef = collection(db, "store-music")
    //real time update
    const unsub = onSnapshot(colRef, (snapshot: any) => {
        const items: DataTypeStoreMusic[] = []
        snapshot.docs.forEach((doc: any) => {
          items.push({...doc.data(), id: doc.id})
        })
        setStore(items)
    })

    return () => {
      unsub()
    };
}, [])
  

  return (
    <div className={root.store}>
      <h3>Kho bản ghi</h3>
      <div>
        <div>
          <InputSearch placehoder='Tên bản ghi, ca sĩ,...' />
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
        <CustomTable columns={columns} dataSrouce={dataSource} heightProps={64} />
      </div>
      <FeatureInPage featureProps={featureProps} />
    </div>
  )
}

export default Store