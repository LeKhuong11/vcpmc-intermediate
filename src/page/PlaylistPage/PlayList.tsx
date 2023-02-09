import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { MdPlaylistAdd } from 'react-icons/md'
import FeatureInPage from '../../components/FeatureInPage'
import InputSearch from '../../components/InputSearch'
import CustomTable from '../../components/Table'
import Topic from './components/Topic'
import root from './playlist.module.scss'


interface DataType {
    stt: number,
    key: number,
    title: string,
    quantity: number,
    time: string,
    topics: string[],
    createAt: string,
    author: string,
    detail: string,
    
}

function PlayList() {

  const featureProps = [
    {
      icon: MdPlaylistAdd,
      text: 'Thêm Playlist'
    }
  ]


  const dataSource: DataType[] = [
    {
      stt: 1,
      key: 1,
      title: 'Top ca khúc 2021',
      quantity: 20,
      time: '01:04:27',
      topics: ['Pop', 'Chill', 'Dingga', 'Songs', 'Lofi'],
      createAt: '22/10/2020',
      author: 'Cindy Cường',
      detail: 'Chi tiết',
    },
    {
      stt: 2,
      key: 2,
      title: 'Top ca khúc 2022',
      quantity: 22,
      time: '01:04:27',
      topics: ['Pop', 'Chill', 'Dingga', 'Songs', 'Lofi', 'Hiphop'],
      createAt: '22/10/2020',
      author: 'Cindy Cường',
      detail: 'Chi tiết',
    },
    {
      stt: 3,
      key: 3,
      title: 'Top ca khúc 2022',
      quantity: 22,
      time: '01:04:27',
      topics: ['Pop', 'Chill', 'Dingga', 'Songs', 'Lofi', 'Hiphop'],
      createAt: '22/10/2020',
      author: 'Cindy Cường',
      detail: 'Chi tiết',
    },
    {
      stt: 4,
      key: 4,
      title: 'Top ca khúc 2022',
      quantity: 22,
      time: '01:04:27',
      topics: ['Pop', 'Chill', 'Dingga', 'Songs', 'Lofi', 'Hiphop'],
      createAt: '22/10/2020',
      author: 'Cindy Cường',
      detail: 'Chi tiết',
    },
    {
      stt: 5,
      key: 5,
      title: 'Top ca khúc 2022',
      quantity: 22,
      time: '01:04:27',
      topics: ['Pop', 'Chill', 'Dingga', 'Songs', 'Lofi', 'Hiphop'],
      createAt: '22/10/2020',
      author: 'Cindy Cường',
      detail: 'Chi tiết',
    },
    {
      stt: 6,
      key: 6,
      title: 'Top ca khúc 2022',
      quantity: 22,
      time: '01:04:27',
      topics: ['Pop', 'Chill', 'Dingga', 'Songs', 'Lofi', 'Hiphop'],
      createAt: '22/10/2020',
      author: 'Cindy Cường',
      detail: 'Chi tiết',
    },
    {
      stt: 7,
      key: 7,
      title: 'Top ca khúc 2022',
      quantity: 22,
      time: '01:04:27',
      topics: ['Pop', 'Chill', 'Dingga', 'Songs', 'Lofi', 'Hiphop'],
      createAt: '22/10/2020',
      author: 'Cindy Cường',
      detail: 'Chi tiết',
    },
  ]
  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt'
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Số bản ghi',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Thời lượng',
      dataIndex: 'time',
      key: 'time'
    },
    {
      title: 'Chủ đề',
      dataIndex: 'topic',
      key: 'topic',
      render: (_, {topics}) => {

        return <Topic topics={topics} />
      }
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createAt',
      key: 'createAt'
    },
    {
      title: 'Người tạo',
      dataIndex: 'author',
      key: 'author'
    },
    {
      title: '',
      dataIndex: 'detail',
      key: 'detail',
      render: (_, {detail}) => {

        return <a>{detail}</a>
      }
    },
  ] 
  return (
    <div className={root.playlist}>
      <h2>Playlist</h2>
      <div>
        <InputSearch placehoder='Tên chủ đề, người tạo,...' />
      </div>
      <div>
        <CustomTable columns={columns} dataSrouce={dataSource} heightProps={70} /> 
      </div>
      <FeatureInPage featureProps={featureProps} />
    </div>
  )
}

export default PlayList