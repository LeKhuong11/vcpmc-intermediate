import { message } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, {useEffect, useState} from 'react'
import { MdPlaylistAdd } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import FeatureInPage from '../../components/FeatureInPage'
import InputSearch from '../../components/InputSearch'
import Loading from '../../components/Loading'
import CustomTable from '../../components/Table'
import { useSearch } from '../../hooks/useSearch'
import { usePaymentsCollection } from '../../hooks/useSnapshot'
import { DataTypePlaylist, fetchPlaylist } from '../../redux/slice/playlistSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import Topic from './components/Topic'
import root from './playlist.module.scss'


function PlayList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.user)
  const { playlist } = useAppSelector(state => state.playlist);
  const [ playlistStore, setPlaylistStore ] = useState<DataTypePlaylist[]>(playlist);
  const { payments, loading } = usePaymentsCollection('play-list');
  const [ search, setSearch ] = useSearch(playlist, 'title');

  //listen to 'search' change returned from useSearch();
  useEffect(() => {
    setPlaylistStore(search)
  }, [search])
  

  //set lại dữ liệu ngay khi dữ liệu trên store thay đổi
  useEffect(() => {
    dispatch(fetchPlaylist())
    setPlaylistStore(payments)
  }, [payments])



  const handleChangeSetSearchValue = (e: any) => {
    const value = e.value;

    setSearch(value)
  }
  
  const handleClickAddNewPlaylist = () => {
    user.isAdmin ? navigate('add-new-playlist') : message.warning('Chức năng này chỉ dành cho người quản lý')
  }
  
  const featureProps = [
    {
      icon: MdPlaylistAdd,
      text: 'Thêm Playlist',
      event: handleClickAddNewPlaylist,
      unActive: user.isAdmin ? false : true
    }
  ]


  //colums and dataSource of component Table
  const dataSource: DataTypePlaylist[] = playlistStore
  const columns: ColumnsType<DataTypePlaylist> = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
      render: (_, {}, index) => {

        return <p>{index + 1}</p>
      }
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Số bản ghi',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, {idSong}) => {

        return <p>{idSong?.length}</p>
      }
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
      render: (_, {id}) => {

        return <Link to={`detail/${id}`}>Chi tiết</Link>
      }
    },
  ] 
  return (
    <>
      {loading ? <Loading /> : 
        <div className={root.playlist}>
          <h3>Playlist</h3>
          <div>
            <InputSearch 
              placehoder='Tìm kiếm theo tên chủ đề,...' 
              setValue={handleChangeSetSearchValue}  
            />
          </div>
          <div>
            <CustomTable pagination={{pageSize: 10}} columns={columns} dataSrouce={dataSource} heightProps={70} /> 
          </div>
          <FeatureInPage featureProps={featureProps} />
        </div>
      }
    </>
  )
}

export default PlayList