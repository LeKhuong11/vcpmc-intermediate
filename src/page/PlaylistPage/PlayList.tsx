import { ColumnsType } from 'antd/es/table'
import React, {useEffect, useState} from 'react'
import { MdPlaylistAdd } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import FeatureInPage from '../../components/FeatureInPage'
import InputSearch from '../../components/InputSearch'
import Loading from '../../components/Loading'
import CustomTable from '../../components/Table'
import { removeSymbol } from '../../function/removeSpecialKeyWord'
import { usePaymentsCollection } from '../../hooks/useSnapshot'
import { DataTypePlaylist, fetchPlaylist } from '../../redux/slice/playlistSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import Topic from './components/Topic'
import root from './playlist.module.scss'


function PlayList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { playlist } = useAppSelector(state => state.playlist);
  const [ playlistStore, setPlaylistStore ] = useState<DataTypePlaylist[]>(playlist);
  const { payments, loading } = usePaymentsCollection('play-list');
  


  //set lại dữ liệu ngay khi dữ liệu trên store thay đổi
  useEffect(() => {
    dispatch(fetchPlaylist())
    setPlaylistStore(payments)
  }, [payments])



  const handleChangeSetSearchValue = (e: any) => {
    // keyword search
    const search = removeSymbol( e.value);

    //if remove all keyword is will asign setPlaylistStore = all item 
    if(search.length) {
      const newSearchStore = playlistStore.filter(item => {

        //remove special characters
        //convert to lowercase
        //compare keyword search and title playlist
        const itemRemoveSymbol = removeSymbol(item.title)
        return itemRemoveSymbol.toLowerCase().includes(search.toLowerCase())
      })

      setPlaylistStore(newSearchStore)
      return
    }
    setPlaylistStore(payments)
  }
  
  const handleClickAddNewPlaylist = () => {
    navigate('add-new-playlist')
  }
  const featureProps = [
    {
      icon: MdPlaylistAdd,
      text: 'Thêm Playlist',
      event: handleClickAddNewPlaylist
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

        return <p>{idSong.length}</p>
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
              placehoder='Tên chủ đề,...' 
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