import React, { useState, useEffect } from 'react'
import { message, Modal, Select, SelectProps } from 'antd'
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
import { cancelTempPlaylist, tempPlaylist } from '../../../redux/slice/playlistSlice';
import { DataTypeStoreMusic } from '../../../redux/slice/storeSlice';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/configfb';
import { PlaylistSVG } from '../../../image/playlist';
import { updateDocConfig } from '../../../hooks/useUpdateDoc';
import Breadcrumbs from '../../../components/Breadcrumbs';

type Playlist = {
    key: number,
    title: string,
    id?: string,
    idSong: DataTypeStoreMusic[],
    time: string,
    topics: string[],
    desc: string
    createAt: string,
    author: string,
}

const { confirm } = Modal;

function EditPlaylistPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { tempStoreMusicAddToPlaylist } = useAppSelector(state => state.playlist)

    const [ playlist, setPlaylist ] = useState<any>(false)
    const [ tempPlaylistSong, setTempPlaylistSong ] = useState(tempStoreMusicAddToPlaylist)

    const [ newPlaylist, setNewPlaylist ] = useState<any>(null);
 

    //khi nhân vào button "xem chi tiết" sẽ chuyển vào trang detail cùng với id ở URL
    //Vào trang detail get id trên store bằng useEffect
    useEffect(() => {
        const getData = async () => {
            const docRef = doc(db, "play-list", `${id}`);
            try {
                //get a document follow uid
                await getDoc(docRef)            
                .then((res) => {
                    setPlaylist(res.data())
                    setNewPlaylist(res.data()) 
                })
                
            } catch(err) {
                console.log(err);
            }
        }
        getData()
    }, [])

    useEffect(() => {
        setNewPlaylist(() => {
            return {
                ...newPlaylist,
                idSong: tempPlaylist
            }
        })
    }, [])


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

    //Button edit playlist to store and cancel playlist
    const handleClickEditPlaylist = async () => {
        const params = {
            documentName: 'play-list',
            id: id,
            data: newPlaylist
        }
        
        const update = await updateDocConfig(params)

        if(update) {
            navigate(`../play-list/detail/${id}`);
            dispatch(cancelTempPlaylist());
            message.success("Sửa playlist thành công")
        }
        else {
            message.success("Sửa playlist thất bại")
        }
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

    const breadcrumb = [
        {
          key: 1,
          path: '../../play-list',
          namePage: 'Playlist'
        },
        {
          key: 2,
          path: `../play-list/detail/${id}`,
          namePage: 'Chi tiết playlist'
        },
        {
            key: 1,
            path: '',
            namePage: 'Chỉnh sửa '
          },
      ]
    
  return (
    <div className={root.addNewPlaylist}>
        <div>
            <Breadcrumbs crumbs={breadcrumb} /> 
        </div>
        <div>
            <h3>Playlist {playlist.title}</h3>
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
                        value={playlist.title}
                    />
                </div>
                <div className={root.numberOfSongAndtime}>
                    <div>
                        <h5>Người tải lên:</h5>
                        <p>{playlist.author}</p>
                    </div>
                    <div>
                        <h5>Tổng số:</h5>
                        <p>{playlist ? playlist.idSong.length : 0} bản ghi</p>
                    </div>
                    <div>
                        <h5>Tổng thời lượng:</h5>
                        <p>--:--:--</p>
                    </div>
                </div>
                <div className={root.description}>
                    <h5>Mô tả: </h5>
                    <textarea typeof='text' value={playlist.desc} onChange={(e) => setNewPlaylist({...newPlaylist, desc: e.target.value})} />
                </div>
                <div>
                    <h5>Chủ đề:</h5>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Nhập chủ đề"
                        onChange={handleChangeSelectTopic}
                        options={optionsTopics}
                        value={playlist.topics}
                    />
                </div>
            </div>
            <div className={root.tablePlaylist}>
                <CustomTable 
                    columns={columns} 
                    dataSrouce={dataSource} 
                    heightProps={70} 
                    pagination={{pageSize: 10}}
                />
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