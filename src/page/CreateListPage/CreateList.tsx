import React from 'react'
import FeatureInPage from '../../components/FeatureInPage';
import Table from './components/Table'
import root from './createList.module.scss'
import { MdPlaylistAdd } from 'react-icons/md'

function CreateList() {

  const store = [
    {
      stt: 1,
      id: 1,
      name: 'Lịch phát số 1',
      time: '22/05/2021 - 30/05/2021',
      status: 'Xem chi tiết',
      status2: 'Xóa',
     
    },
    {
      stt: 2,
      id: 2,
      name: 'Lịch phát số 1',
      time: '22/05/2021 - 30/05/2021',
      status: 'Xem chi tiết',
      status2: 'Xóa',
     
    },
    {
      stt: 3,
      id: 3,
      name: 'Lịch phát số 1',
      time: '22/05/2021 - 30/05/2021',
      status: 'Xem chi tiết',
      status2: 'Xóa',
     
    },
    {
      stt: 4,
      id: 4,
      name: 'Lịch phát số 1',
      time: '22/05/2021 - 30/05/2021',
      status: 'Xem chi tiết',
      status2: 'Xóa',
     
    },
    {
      stt: 5,
      id: 5,
      name: 'Lịch phát số 1',
      time: '22/05/2021 - 30/05/2021',
      status: 'Xem chi tiết',
      status2: 'Xóa',
     
    },
    {
      stt: 6,
      id: 6,
      name: 'Lịch phát số 1',
      time: '22/05/2021 - 30/05/2021',
      status: 'Xem chi tiết',
      status2: 'Xóa',
     
    },
    {
      stt: 7,
      id: 7,
      name: 'Lịch phát số 1',
      time: '22/05/2021 - 30/05/2021',
      status: 'Xem chi tiết',
      status2: 'Xóa',
     
    },

  ]
  const column = ['STT', 'Tên lịch', 'Thời gian phát'];

  const featureProps = [
    {
      icon: MdPlaylistAdd,
      text: 'Thêm lịch phát'
    }
  ]
  return (
    <div className={root.createList}>
        <h2>Danh sách lịch phát</h2>
        <div>
            <Table store={store} column={column} heightProp={77} />
        </div>
        <FeatureInPage featureProps={featureProps} />
    </div>
  )
}

export default CreateList