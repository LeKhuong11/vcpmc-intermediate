import React from 'react'
import FeatureInPage from '../../components/FeatureInPage';
import root from './createList.module.scss'
import { MdPlaylistAdd } from 'react-icons/md'
import { ColumnsType } from 'antd/es/table';
import CustomTable from '../../components/Table';

interface DataType {
      id: number,
      stt: number,
      name: string,
      time: string,
      detail: string,
      delete: string,
}

function CreateList() {

  const dataSource: DataType[] = [
    {
      id: 1,
      stt: 1,
      name: 'Lịch phát số 1',
      time: '22/05/2021 - 30/05/2021',
      detail: 'Xem chi tiết',
      delete: 'Xóa',
    },
    {
      stt: 2,
      id: 2,
      name: 'Lịch phát số 1',
      time: '22/05/2021 - 30/05/2021',
      detail: 'Xem chi tiết',
      delete: 'Xóa',
     
    },
    {
      stt: 3,
      id: 3,
      name: 'Lịch phát số 1',
      time: '22/05/2021 - 30/05/2021',
      detail: 'Xem chi tiết',
      delete: 'Xóa',
     
    },
    {
      stt: 4,
      id: 4,
      name: 'Lịch phát số 1',
      time: '22/05/2021 - 30/05/2021',
      detail: 'Xem chi tiết',
      delete: 'Xóa',
     
    },
    {
      stt: 5,
      id: 5,
      name: 'Lịch phát số 1',
      time: '22/05/2021 - 30/05/2021',
      detail: 'Xem chi tiết',
      delete: 'Xóa',
     
    },
    {
      stt: 6,
      id: 6,
      name: 'Lịch phát số 1',
      time: '22/05/2021 - 30/05/2021',
      detail: 'Xem chi tiết',
      delete: 'Xóa',
     
    },
    {
      stt: 7,
      id: 7,
      name: 'Lịch phát số 1',
      time: '22/05/2021 - 30/05/2021',
      detail: 'Xem chi tiết',
      delete: 'Xóa',
     
    },
  ]
  
  const columns: ColumnsType<DataType> = [
      {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt'
      },
      {
        title: 'Tên lịch',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Thời gian phát',
        dataIndex: 'time',
        key: 'time'
      },
      {
        title: '',
        dataIndex: 'detail',
        key: 'detail',
        render: (_, {detail}) => {

          return <a>{detail}</a>
        }
      },
      {
        title: '',
        dataIndex: 'delete',
        key: 'delete',
        render: (_, ) => {

          return <a>Xóa</a>
        }
      },

  ]

  const featureProps = [
    {
      icon: MdPlaylistAdd,
      text: 'Thêm lịch phát'
    }
  ]
  return (
    <div className={root.createList}>
        <h3>Danh sách lịch phát</h3>
        <div>
            <CustomTable columns={columns} dataSrouce={dataSource} heightProps={70} />
        </div>
        <FeatureInPage featureProps={featureProps} />
    </div>
  )
}

export default CreateList