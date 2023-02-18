import { message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import { SlNote } from 'react-icons/sl';
import { Link, useNavigate, useParams } from 'react-router-dom'
import FeatureInPage from '../../../components/FeatureInPage';
import CustomTable from '../../../components/Table';
import { db } from '../../../firebase/configfb';
import {  PlaylistSVG } from '../../../image/playlist';
import { tempPlaylist } from '../../../redux/slice/playlistSlice';
import { DataTypeStoreMusic } from '../../../redux/slice/storeSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import root from '../playlist.module.scss'


function DetailPlayListPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { playlist } = useAppSelector(state => state.playlist);

     //filter song follow id get from URL
    //current, music is an array
    const playlistItem = playlist.filter(item => {
        return item.id === id
    }) 
    
    const dataSource: DataTypeStoreMusic[] = playlist[0].idSong
    const columns: ColumnsType<DataTypeStoreMusic> = [
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
            title: '',
            dataIndex: 'listen',
            key: 'listen',
            render: (_, ) => (
                <Link to="">Nghe</Link>
            )
        },
    ]


    const handleClickRemovePlaylist = async () => {
        try {
            await deleteDoc(doc(db, "play-list", `${id}`));
            navigate('../../play-list');
            message.success("Xóa Playlist thành công")
        } catch(err) {
            message.error("Xóa Playlist thất bại")            
        }
    }

    const handleClickMoveToEditPage = () => {
        navigate(`edit`); 
        dispatch(tempPlaylist(playlistItem[0].idSong))
    }

    const featureProps = [
        {
            icon: SlNote,
            text: 'Chỉnh sửa',
            event: handleClickMoveToEditPage
        },
        {
            icon: FaTrashAlt,
            text: 'Xóa Playlist',
            event: handleClickRemovePlaylist
        },
    ]

  return (
    <div className={root.detailPlaylist}>
        <div>
            <h3>Playlist {playlistItem[0].title}</h3>
        </div>
        <div className={root.container}>
            <div className={root.infoPlaylist}>
                <div>
                    <PlaylistSVG />
                    <h4>{playlistItem[0].title}</h4>
                </div>
                <div>
                    <div>
                        <h5>Người tải lên:</h5> 
                        <p>Super Admin</p>
                    </div>
                    <div>
                        <h5>Tổng số:</h5> 
                        <p>{playlistItem[0].idSong.length} bản ghi</p>
                    </div>
                    <div>
                        <h5>Tổng thời lượng:</h5> 
                        <p>{playlistItem[0].time}</p>
                    </div>
                </div>
                <div>
                    <p>{playlistItem[0].desc}</p>
                </div>
            </div>
            <div className={root.tablePlaylist}>
                <CustomTable columns={columns} dataSrouce={dataSource} heightProps={70} /> 
            </div>
        </div>
        <FeatureInPage featureProps={featureProps} />
    </div>
  )
}

export default DetailPlayListPage