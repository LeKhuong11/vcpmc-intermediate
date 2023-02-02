import React from 'react'
import InputSearch from '../../components/InputSearch'
import Table from '../../components/Table'
import root from './playlist.module.scss'


function PlayList() {
  const storeMusic = [
    {
      stt: 1,
      id: 1,
      nameMusic: 'Top ca khúc 2021',
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
    
  ]

  const columnMusic = ['STT', 'Tiêu đề', 'Số bản ghi', 'Thời lượng', 'Chủ đề', 'Ngày tạo', 'Người tạo']
  return (
    <div className={root.playlist}>
      <h2>Playlist</h2>
      <div>
        <InputSearch placehoder='Tên chủ đề, người tạo,...' />
      </div>
      <div>
        <Table columnMusic={columnMusic} storeMusic={storeMusic} />
      </div>
    </div>
  )
}

export default PlayList