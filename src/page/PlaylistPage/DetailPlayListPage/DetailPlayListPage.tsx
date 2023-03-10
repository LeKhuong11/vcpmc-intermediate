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
import { tempPlaylist } from '../../../redux/slice/playlistSlice';
import { DataTypeStoreMusic } from '../../../redux/slice/storeSlice';
import { useAppDispatch, useAppSelector} from '../../../redux/store';
import root from '../playlist.module.scss'
import Loading from '../../../components/Loading';
import Breadcrumbs from '../../../components/Breadcrumbs';
const playlistImg = require('../../../image/playlist.png')

function DetailPlayListPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.user)
    const { id } = useParams();
    const [ playlistId, setPlaylist ] = useState<any>(false)
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
 
    
    const dataSource: DataTypeStoreMusic[] = playlistId && playlistId.idSong
    const columns: ColumnsType<DataTypeStoreMusic> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (_, {}, index) => {

                return <p>{index + 1}</p>
              }
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
        if(user.isAdmin) {
            try {
                await deleteDoc(doc(db, "play-list", `${id}`));
                navigate('../../play-list');
                message.success("Xóa Playlist thành công")
            } catch(err) {
                message.error("Xóa Playlist thất bại")            
            }
        }
        else 
            message.warning('Chức năng này chỉ dành cho người quản lý')
    }

    const handleClickMoveToEditPage = () => {
        if(user.isAdmin) {
            navigate(`edit`); 
            dispatch(tempPlaylist(playlistId.idSong))
        } 
        else 
            message.warning('Chức năng này chỉ dành cho người quản lý')
    }
    
    
    const featureProps = [
        {
            icon: SlNote,
            text: 'Chỉnh sửa',
            event: handleClickMoveToEditPage,
            unActive: user.isAdmin ? false : true
        },
        {
            icon: FaTrashAlt,
            text: 'Xóa Playlist',
            event: handleClickRemovePlaylist,
            unActive: user.isAdmin ? false : true
        },
    ]

    const breadcrumb = [
        {
          key: 1,
          path: '../play-list',
          namePage: 'Playlist'
        },
        {
          key: 2,
          path: '',
          namePage: 'Chi tiết playlist'
        },
      ]
  return (
    <div className={root.detailPlaylist}>
        {loading ? <Loading /> : 
        <>
            <div>
                <Breadcrumbs crumbs={breadcrumb} />
            </div>
            <div>
                <h3>Playlist {playlistId.title}</h3>
            </div>
            <div className={root.container}>
                <div className={root.infoPlaylist}>
                    <div>
                        <img src={playlistImg} alt="" width={200} height={200} />
                        <h4>{playlistId.title}</h4>
                    </div>
                    <div>
                        <div>
                            <h5>Người tải lên:</h5> 
                            <p>Super Admin</p>
                        </div>
                        <div>
                            <h5>Tổng số:</h5> 
                            <p>{playlistId ? playlistId.idSong.length : 0} bản ghi</p>
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
                    <CustomTable  
                        columns={columns} 
                        dataSrouce={dataSource} 
                        heightProps={70} 
                        pagination={{pageSize: 10}}
                    /> 
                </div>
            </div>
            <FeatureInPage featureProps={featureProps} />
        </>}
    </div>
  )
}

export default DetailPlayListPage