import { ColumnsType } from 'antd/es/table'
import { collection, onSnapshot } from 'firebase/firestore'
import React, {useEffect, useState} from 'react'
import { MdPlaylistAdd } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import FeatureInPage from '../../components/FeatureInPage'
import InputSearch from '../../components/InputSearch'
import CustomTable from '../../components/Table'
import { db } from '../../firebase/configfb'
import { DataTypePlaylist, fetchPlaylist } from '../../redux/slice/playlistSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import Topic from './components/Topic'
import root from './playlist.module.scss'


function PlayList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { playlist } = useAppSelector(state => state.playlist);
  const [ playlistStore, setPlaylistStore ] = useState<DataTypePlaylist[]>(playlist);

  useEffect(() => {
    const colRef = collection(db, "play-list")
    //real time update
    const unsub = onSnapshot(colRef, (snapshot: any) => {
        const items: DataTypePlaylist[] = []
        snapshot.docs.forEach((doc: any) => {
          items.push({...doc.data(), id: doc.id})
        })
        setPlaylistStore(items)
    })

    return () => {
      unsub()
    };
}, [])
  
  useEffect(() => {
    dispatch(fetchPlaylist())
  }, [dispatch])

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
      key: 'key'
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
    <div className={root.playlist}>
      <h3>Playlist</h3>
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