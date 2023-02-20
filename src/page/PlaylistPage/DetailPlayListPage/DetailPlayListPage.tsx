import React, { useEffect, useState } from 'react'
import { message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { deleteDoc, doc, getDoc} from 'firebase/firestore';
import { FaTrashAlt } from 'react-icons/fa';
import { SlNote } from 'react-icons/sl';
import { Link, useNavigate, useParams } from 'react-router-dom'
import FeatureInPage from '../../../components/FeatureInPage';
import CustomTable from '../../../components/Table';
import { db } from '../../../firebase/configfb';
import {  PlaylistSVG } from '../../../image/playlist';
import { tempPlaylist } from '../../../redux/slice/playlistSlice';
import { DataTypeStoreMusic } from '../../../redux/slice/storeSlice';
import { useAppDispatch} from '../../../redux/store';
import root from '../playlist.module.scss'
import Loading from '../../../components/Loading';
import { isArray } from 'util';


function DetailPlayListPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const [ playlistId, setPlaylist ] = useState<any>({})
    const [ loading, setLoading ] = useState<Boolean>(false)

    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            const docRef = doc(db, "play-list", `${id}`);
            try {
                //get a document follow uid
                await getDoc(docRef)            
                .then((res) => {
                    setPlaylist(res.data())
                    setLoading(false)
                })
                
            } catch(err) {
                console.log(err);
            }
        }
        getData()
    }, [])
 
  
    const dataSource: DataTypeStoreMusic[] = playlistId.idSong
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
        dispatch(tempPlaylist(playlistId.idSong))
    }
    console.log(playlistId.idSong);
    
    
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
        {loading ? <Loading /> : 
        <>
            <div>
            <h3>Playlist {playlistId.title}</h3>
            </div>
            <div className={root.container}>
                <div className={root.infoPlaylist}>
                    <div>
                        <PlaylistSVG />
                        <h4>{playlistId.title}</h4>
                    </div>
                    <div>
                        <div>
                            <h5>Người tải lên:</h5> 
                            <p>Super Admin</p>
                        </div>
                        <div>
                            <h5>Tổng số:</h5> 
                            <p>{0} bản ghi</p>
                        </div>
                        <div>
                            <h5>Tổng thời lượng:</h5> 
                            <p>{playlistId.time}</p>
                        </div>
                    </div>
                    <div>
                        <p>{playlistId.desc}</p>
                    </div>
                </div>
                <div className={root.tablePlaylist}>
                    <CustomTable columns={columns} dataSrouce={dataSource} heightProps={70} /> 
                </div>
            </div>
            <FeatureInPage featureProps={featureProps} />
        </>}
    </div>
  )
}

export default DetailPlayListPage