import React from 'react'
import { MenuProps, message } from 'antd';
import DropDown from '../../components/DropDown';
import root from './store.module.scss';
import { SlNote } from 'react-icons/sl';
import FeatureInPage from '../../components/FeatureInPage';
import InputSearch from '../../components/InputSearch';
import { ColumnsType } from 'antd/es/table';
import CustomTable from '../../components/Table';
import { RxDotFilled } from 'react-icons/rx';


interface DataType {
  key: number,
  stt: number,
  nameMusic: string,
  IRCID: string,
  time: string,
  singer: string,
  author: string,
  type: string,
  format: string,
  date: boolean,
  update: string,
  listen: string,
}

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
  
  const dataSource: DataType[] = [
    {
      key: 1,
      stt: 1,
      nameMusic: 'Mất em',
      IRCID: 'KRA40105463',
      time: '	04:27',
      singer: 'Phan Mạnh Quỳnh',
      author: 'Phan Mạnh Quỳnh',
      type: 'Ballad',
      format: 'Audio',
      date: true,
      update: 'Cập nhật',
      listen: 'Nghe'
    },
    {
      key: 2,
      stt: 2,
      nameMusic: 'Mất em',
      IRCID: 'KRA40105463',
      time: '	04:27',
      singer: 'Phan Mạnh Quỳnh',
      author: 'Phan Mạnh Quỳnh',
      type: 'Ballad',
      format: 'Audio',
      date: true,
      update: 'Cập nhật',
      listen: 'Nghe'
    },
    {
      key: 3,
      stt: 3,
      nameMusic: 'Mất em',
      IRCID: 'KRA40105463',
      time: '	04:27',
      singer: 'Phan Mạnh Quỳnh',
      author: 'Phan Mạnh Quỳnh',
      type: 'Ballad',
      format: 'Audio',
      date: true,
      update: 'Cập nhật',
      listen: 'Nghe'
    },
    {
      key: 4,
      stt: 4,
      nameMusic: 'Mất em',
      IRCID: 'KRA40105463',
      time: '	04:27',
      singer: 'Phan Mạnh Quỳnh',
      author: 'Phan Mạnh Quỳnh',
      type: 'Ballad',
      format: 'Audio',
      date: false,
      update: 'Cập nhật',
      listen: 'Nghe'
    },
    {
      key: 5,
      stt: 5,
      nameMusic: 'Mất em',
      IRCID: 'KRA40105463',
      time: '	04:27',
      singer: 'Phan Mạnh Quỳnh',
      author: 'Phan Mạnh Quỳnh',
      type: 'Ballad',
      format: 'Audio',
      date: true,
      update: 'Cập nhật',
      listen: 'Nghe'
    },
    {
      key: 6,
      stt: 6,
      nameMusic: 'Mất em',
      IRCID: 'KRA40105463',
      time: '	04:27',
      singer: 'Phan Mạnh Quỳnh',
      author: 'Phan Mạnh Quỳnh',
      type: 'Ballad',
      format: 'Audio',
      date: false,
      update: 'Cập nhật',
      listen: 'Nghe'
    },
    {
      key: 7,
      stt: 7,
      nameMusic: 'Mất em',
      IRCID: 'KRA40105463',
      time: '	04:27',
      singer: 'Phan Mạnh Quỳnh',
      author: 'Phan Mạnh Quỳnh',
      type: 'Ballad',
      format: 'Audio',
      date: true,
      update: 'Cập nhật',
      listen: 'Nghe'
    }
  ]

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt'
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
      render: (_, { update }) => {

        return <a>{update}</a>
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
        <CustomTable columns={columns} dataSrouce={dataSource} heightProps={64} />
      </div>
      <FeatureInPage featureProps={featureProps} />
      
    </div>
  )
}

export default Store