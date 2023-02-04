import React, { useEffect } from 'react'
import { MenuProps, message } from 'antd';
import DropDown from '../../components/DropDown';
import root from './store.module.scss';
import Table from './components/Table';
import { SlNote } from 'react-icons/sl';
import FeatureInPage from '../../components/FeatureInPage';
import InputSearch from '../../components/InputSearch';


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

  const featureProps = [
    {
      icon: SlNote,
      text: "Quan li phe duyet"
    }
  ];

  const storeMusic = [
    {
      stt: 1,
      id: 1,
      nameMusic: 'Mất em',
      IRCId: 'KRA40105463',
      time: '04:27',
      singer: 'Phan Mạnh Quỳnh',
      auth: 'Phan Mạnh Quỳnh',
      type: 'Ballad',
      format: 'Audio',
      date: 'Còn thời hạn',
      status: 'cập nhật',
      status2: 'nghe',
    },
    {
      stt: 1,
      id: 2,
      nameMusic: 'Mất em',
      IRCId: 'KRA40105463',
      time: '04:27',
      singer: 'Phan Mạnh Quỳnh',
      auth: 'Phan Mạnh Quỳnh',
      type: 'Ballad',
      format: 'Audio',
      date: 'Còn thời hạn',
      status: 'cập nhật',
      status2: 'nghe',
    },
    {
      stt: 1,
      id: 3,
      nameMusic: 'Mất em',
      IRCId: 'KRA40105463',
      time: '04:27',
      singer: 'Phan Mạnh Quỳnh',
      auth: 'Phan Mạnh Quỳnh',
      type: 'Ballad',
      format: 'Audio',
      date: 'Còn thời hạn',
      status: 'cập nhật',
      status2: 'nghe',
    },
    {
      stt: 1,
      id: 4,
      nameMusic: 'Mất em',
      IRCId: 'KRA40105463',
      time: '04:27',
      singer: 'Phan Mạnh Quỳnh',
      auth: 'Phan Mạnh Quỳnh',
      type: 'Ballad',
      format: 'Audio',
      date: 'Còn thời hạn',
      status: 'cập nhật',
      status2: 'nghe',
    },
    {
      stt: 1,
      id: 5,
      nameMusic: 'Mất em',
      IRCId: 'KRA40105463',
      time: '04:27',
      singer: 'Phan Mạnh Quỳnh',
      auth: 'Phan Mạnh Quỳnh',
      type: 'Ballad',
      format: 'Audio',
      date: 'Còn thời hạn',
      status: 'cập nhật',
      status2: 'nghe',
    },
    {
      stt: 1,
      id: 6,
      nameMusic: 'Mất em',
      IRCId: 'KRA40105463',
      time: '04:27',
      singer: 'Phan Mạnh Quỳnh',
      auth: 'Phan Mạnh Quỳnh',
      type: 'Ballad',
      format: 'Audio',
      date: 'Còn thời hạn',
      status: 'cập nhật',
      status2: 'nghe',
    }
  ]
  const columnMusic = ['STT', 'Tên bản ghi', 'Mã IRC', 'Thời lượng', 'Ca sĩ', 'Tác Giả', 'Thể loại', 'Định dạng', 'Thời hạn sử dụng']

  return (
    <div className={root.store}>
      <h2>Kho bản ghi</h2>
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
          <Table columnMusic={columnMusic} storeMusic={storeMusic} heightProp={62} />
      </div>
      <FeatureInPage featureProps={featureProps} />
      
    </div>
  )
}

export default Store