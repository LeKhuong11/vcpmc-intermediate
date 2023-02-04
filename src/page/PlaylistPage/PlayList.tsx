import React from 'react'
import { MdPlaylistAdd } from 'react-icons/md'
import FeatureInPage from '../../components/FeatureInPage'
import InputSearch from '../../components/InputSearch'
import Table from './components/Table'
import root from './playlist.module.scss'


function PlayList() {
  const storeMusic = [
    {
      stt: 1,
      id: 1,
      title: 'Top ca khúc 2021',
      quantity: 20,
      time: '01:04:27',
      topics: ['Pop', 'Chill', 'Dingga', 'Songs', 'Lofi'],
      date: '22/10/2020',
      auth: 'Cindy Cường',
      status: 'Chi tiết',
    },
    {
      stt: 2,
      id: 2,
      title: 'Top ca khúc 2022',
      quantity: 22,
      time: '01:04:27',
      topics: ['Pop', 'Chill', 'Dingga', 'Songs', 'Lofi', 'Hiphop'],
      date: '22/10/2020',
      auth: 'Cindy Cường',
      status: 'Chi tiết',
    },
    {
      stt: 3,
      id: 3,
      title: 'Top ca khúc 2022',
      quantity: 22,
      time: '01:04:27',
      topics: ['Pop', 'Chill', 'Dingga', 'Songs', 'Lofi', 'Hiphop'],
      date: '22/10/2020',
      auth: 'Cindy Cường',
      status: 'Chi tiết',
    },
    {
      stt: 4,
      id: 4,
      title: 'Top ca khúc 2022',
      quantity: 22,
      time: '01:04:27',
      topics: ['Pop', 'Chill', 'Dingga', 'Songs', 'Lofi', 'Hiphop'],
      date: '22/10/2020',
      auth: 'Cindy Cường',
      status: 'Chi tiết',
    },
    {
      stt: 5,
      id: 5,
      title: 'Top ca khúc 2022',
      quantity: 22,
      time: '01:04:27',
      topics: ['Pop', 'Chill', 'Dingga', 'Songs', 'Lofi', 'Hiphop'],
      date: '22/10/2020',
      auth: 'Cindy Cường',
      status: 'Chi tiết',
    },
    {
      stt: 6,
      id: 6,
      title: 'Top ca khúc 2022',
      quantity: 22,
      time: '01:04:27',
      topics: ['Pop', 'Chill', 'Dingga', 'Songs', 'Lofi', 'Hiphop'],
      date: '22/10/2020',
      auth: 'Cindy Cường',
      status: 'Chi tiết',
    },
    {
      stt: 7,
      id: 7,
      title: 'Top ca khúc 2022',
      quantity: 22,
      time: '01:04:27',
      topics: ['Pop', 'Chill', 'Dingga', 'Songs', 'Lofi', 'Hiphop'],
      date: '22/10/2020',
      auth: 'Cindy Cường',
      status: 'Chi tiết',
    },
  ]

  const featureProps = [
    {
      icon: MdPlaylistAdd,
      text: 'Thêm Playlist'
    }
  ]

  const columnMusic = ['STT', 'Tiêu đề', 'Số bản ghi', 'Thời lượng', 'Chủ đề', 'Ngày tạo', 'Người tạo']
  return (
    <div className={root.playlist}>
      <h2>Playlist</h2>
      <div>
        <InputSearch placehoder='Tên chủ đề, người tạo,...' />
      </div>
      <div>
        <Table columnMusic={columnMusic} storeMusic={storeMusic} heightProp={70} />
      </div>
      <FeatureInPage featureProps={featureProps} />
    </div>
  )
}

export default PlayList