import React, { useState } from 'react'
import { message, Modal, Select, SelectProps, UploadFile } from 'antd'
import root from '../playlist.module.scss'
import Input from '../../../components/Input';
import CustomTable from '../../../components/Table';
import { ColumnsType } from 'antd/es/table';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import FeatureInPage from '../../../components/FeatureInPage';
import Button from '../../../components/Button';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { cancelTempPlaylist, DataTypePlaylist, tempPlaylist } from '../../../redux/slice/playlistSlice';
import { DataTypeStoreMusic } from '../../../redux/slice/storeSlice';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/configfb';
import { PlaylistSVG } from '../../../image/playlist';


const { confirm } = Modal;

function EditPlaylistPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { tempStoreMusicAddToPlaylist } = useAppSelector(state => state.playlist)
    const { user } = useAppSelector(state => state.user)
    const { playlist } = useAppSelector(state => state.playlist);
    
    //filter song follow id get from URL
    //current, music is an array
    const playlistItem = playlist.filter(item => {
        return item.id === id
    }) 
    

    const [ tempPlaylistSong, setTempPlaylistSong ] = useState(tempStoreMusicAddToPlaylist)

    const [ newPlaylist, setNewPlaylist ] = useState({
        key: playlistItem[0].key,
        title: playlistItem[0].title,
        idSong: tempPlaylistSong,
        time: '05:35:00',
        topics: playlistItem[0].topics,
        desc: playlistItem[0].desc,
        createAt: playlistItem[0].createAt,
        author: playlistItem[0].createAt,
    });

    const fileList: UploadFile[] = [
        
    ];
    const optionsTopics: SelectProps['options'] = [
    {
        label: 'Pop',
        value: 'Pop',
    },
    {
        label: 'Chill',
        value: 'Chill',
    },
    {
        label: 'Lofi',
        value: 'Lofi',
    },
    {
        label: 'Songs',
        value: 'Songs',
    },
    {
        label: 'Trendding',
        value: 'Trendding',
    },
    {
        label: 'Dingga',
        value: 'Dingga',
    },
    {
        label: 'Hiphop',
        value: 'Hiphop',
    },
    ];

    const handleChangeSelectTopic = (value: string[]) => {
        setNewPlaylist(
            {
                ...newPlaylist,
                topics: value
            }
        )
    };

    const handleChangeSetValueTitle = (e: any) => {
        setNewPlaylist({...newPlaylist, title: e.value})
    } 

    //Button add and cancel playlist
    const handleClickEditPlaylist = async () => {

        const docRef = doc(db, "play-list", `${id}`)
        try {
            await updateDoc(docRef, newPlaylist);
            dispatch(cancelTempPlaylist());
            navigate(`../play-list/detail/${id}`);
            message.success("Sửa playlist thành công")
        } catch(err) {
            message.error("Sửa playlist thất bại")            
        }
        console.log(newPlaylist);
        
    }


    const handleClickRemoveASongFromNewPlaylist = (id: string) => {
        const newListSong = tempStoreMusicAddToPlaylist.filter(item => {
            return item.id !== id
        })
        setNewPlaylist(
            {
                ...newPlaylist,
                idSong: newListSong
            }
        )
        dispatch(tempPlaylist(newListSong))
        setTempPlaylistSong(newListSong)
    }

    const handleClickCancelPlaylist = () => {
        if(tempStoreMusicAddToPlaylist.length) {
            confirm({
                icon: <ExclamationCircleOutlined />,
                content: 'Bạn chưa lưu thay đổi!',
                onOk() {

                    //cancel playlist before exits
                    dispatch(cancelTempPlaylist())
                    navigate('../play-list')
                },
            });
            return
        }
        navigate('../play-list')
    }

    //table in AddNewPlaylistPage 
    const dataSource: DataTypeStoreMusic[] = tempPlaylistSong
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
    {
        title: '',
        dataIndex: '',
        key: '',
        render: (_, { id } ) => (
            <a href='#' onClick={() => handleClickRemoveASongFromNewPlaylist(id)}>Gỡ</a>
        )
    },
    ]



    const featureProps = [
        {
            icon: MdAdd,
            text: 'Thêm bản ghi',
            event: () => navigate('add-new-song')
        }
    ]
    
  return (
    <div className={root.addNewPlaylist}>
        <div>
            <h3>Playlist {playlistItem[0].title}</h3>
        </div>
        <div className={root.container}>
            <div className={root.addInfo}>
                <div>
                    <PlaylistSVG />
                </div>
                <div>
                    <h5>Tiêu đề :</h5>
                    <Input 
                        type='text' 
                        height={45} 
                        width={250} 
                        setValue={handleChangeSetValueTitle} 
                        value={playlistItem[0].title}
                    />
                </div>
                <div className={root.numberOfSongAndtime}>
                    <div>
                        <h5>Người tải lên:</h5>
                        <p>{playlistItem[0].author}</p>
                    </div>
                    <div>
                        <h5>Tổng số:</h5>
                        <p>{playlistItem[0].idSong.length} bản ghi</p>
                    </div>
                    <div>
                        <h5>Tổng thời lượng:</h5>
                        <p>00:03:12</p>
                    </div>
                </div>
                <div className={root.description}>
                    <h5>Mô tả: </h5>
                    <textarea typeof='text' value={playlistItem[0].desc} onChange={(e) => setNewPlaylist({...newPlaylist, desc: e.target.value})} />
                </div>
                <div>
                    <h5>Chủ đề:</h5>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Nhập chủ đề"
                        onChange={handleChangeSelectTopic}
                        options={optionsTopics}
                        value={playlistItem[0].topics}
                    />
                </div>
            </div>
            <div className={root.tablePlaylist}>
                <CustomTable columns={columns} dataSrouce={dataSource} heightProps={70} />
                <div className={root.btn}>
                    <Button type='primary' heightProps={38} widthProps={148} contentProps="Hủy" onClick={handleClickCancelPlaylist} />
                    <Button type='secondary' heightProps={38} widthProps={148} contentProps="Lưu" onClick={handleClickEditPlaylist} />
                </div>
            </div>
        </div>
        <FeatureInPage featureProps={featureProps} />
    </div>
  )
}

export default EditPlaylistPage