import React, { useState } from 'react'
import { message, Modal, Select, SelectProps, Upload, UploadFile } from 'antd'
import root from '../playlist.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import Input from '../../../components/Input';
import CustomTable from '../../../components/Table';
import { ColumnsType } from 'antd/es/table';
import { Link, useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import FeatureInPage from '../../../components/FeatureInPage';
import Button from '../../../components/Button';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { cancelTempPlaylist, DataTypePlaylist, tempPlaylist } from '../../../redux/slice/playlistSlice';
import { DataTypeStoreMusic } from '../../../redux/slice/storeSlice';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase/configfb';


const { confirm } = Modal;

function AddNewPlaylistPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { tempStoreMusicAddToPlaylist } = useAppSelector(state => state.playlist)
    const { user } = useAppSelector(state => state.user)
    const { playlist } = useAppSelector(state => state.playlist);
    const [ tempPlaylistSong, setTempPlaylistSong ] = useState(tempStoreMusicAddToPlaylist)
    let today: any = new Date();
    today = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();

    const [ newPlaylist, setNewPlaylist ] = useState<DataTypePlaylist>({
        key: playlist.length + 1,
        title: '',
        idSong: tempPlaylistSong,
        time: '05:35:00',
        topics: [],
        desc: '',
        createAt: today,
        author: user.displayName,
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
    const handleClickAddPlaylistToStore = async () => {
        console.log(newPlaylist);
        
        const docRef = doc(collection(db, "play-list"))
        try {
            await setDoc(docRef, newPlaylist);
            dispatch(cancelTempPlaylist());
            navigate('../play-list');
            message.success("Thêm playlist thành công")
        } catch(err) {
            message.error("Thêm playlist thất bại")            
        }
        
    }


    const handleClickRemoveASongFromNewPlaylist = (id: string) => {
        const newListSong = tempStoreMusicAddToPlaylist.filter(item => {
            return item.id !== id
        })
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
            <h3>Thêm Playlist</h3>
        </div>
        <div className={root.container}>
            <div className={root.addInfo}>
                <div>
                    <h5>Ảnh bìa:</h5>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture"
                        defaultFileList={[...fileList]}
                        >
                        <Button heightProps={35} widthProps={100} type='primary' contentProps='Upload' icon={<UploadOutlined />} />
                    </Upload>
                </div>
                <div>
                    <h5>Tiêu đề :</h5>
                    <Input type='text' height={45} width={250} setValue={handleChangeSetValueTitle} />
                </div>
                <div className={root.numberOfSongAndtime}>
                    <div>
                        <h5>Tổng số:</h5>
                        <p>1 bản ghi</p>
                    </div>
                    <div>
                        <h5>Tổng thời lượng:</h5>
                        <p>00:03:12</p>
                    </div>
                </div>
                <div className={root.description}>
                    <h5>Mô tả: </h5>
                    <textarea typeof='text' onChange={(e) => setNewPlaylist({...newPlaylist, desc: e.target.value})} />
                </div>
                <div>
                    <h5>Chủ đề:</h5>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Nhập chủ đề"
                        onChange={handleChangeSelectTopic}
                        options={optionsTopics}
                    />
                </div>
            </div>
            <div className={root.tablePlaylist}>
                <CustomTable columns={columns} dataSrouce={dataSource} heightProps={70} />
                <div className={root.btn}>
                    <Button type='primary' heightProps={38} widthProps={148} contentProps="Hủy" onClick={handleClickCancelPlaylist} />
                    <Button type='secondary' heightProps={38} widthProps={148} contentProps="Lưu" onClick={handleClickAddPlaylistToStore} />
                </div>
            </div>
        </div>
        <FeatureInPage featureProps={featureProps} />
    </div>
  )
}

export default AddNewPlaylistPage