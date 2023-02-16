import { ColumnsType } from 'antd/es/table';
import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import { SlNote } from 'react-icons/sl';
import { Link, useParams } from 'react-router-dom'
import FeatureInPage from '../../../components/FeatureInPage';
import CustomTable from '../../../components/Table';
import {  PlaylistSVG } from '../../../image/playlist';
import { useAppSelector } from '../../../redux/store';
import root from '../playlist.module.scss'


interface DataType {
    key: number,
    stt: number,
    nameMusic: string,
    singer: string,
    author: string,
}

function DetailPlayListPage() {
    const { id } = useParams();
    const { playlist } = useAppSelector(state => state.playlist);

     //filter song follow id get from URL
    //current, music is an array
    const playlistItem = playlist.filter(item => {
        return item.id === id
    }) 

    const dataSource: DataType[] = [
        {
            key: 1,
            stt: 1,
            nameMusic: 'Small Concrete Fish',
            singer: 'Nguyên Hà',
            author: 'Akilier',
        },
        {
            key: 2,
            stt: 2,
            nameMusic: 'Gorgeous Wooden Bike',
            singer: 'Tăng Phúc ft Mỹ Lệ',
            author: 'Origin',
        },
        {
            key: 3,
            stt: 3,
            nameMusic: 'Kings & Queens',
            singer: 'Đinh Hương',
            author: 'Mondaro',
        },
        {
            key: 4,
            stt: 4,
            nameMusic: 'Clap',
            singer: 'Minh Khôi',
            author: 'Multy Field',
        },
        {
            key: 5,
            stt: 5,
            nameMusic: 'Small Concrete Fish',
            singer: 'Nguyên Hà',
            author: 'Akilier',
        },
        {
            key: 6,
            stt: 6,
            nameMusic: 'Small Concrete Fish',
            singer: 'Nguyên Hà',
            author: 'Akilier',
        },
        {
            key: 7,
            stt: 7,
            nameMusic: 'Small Concrete Fish',
            singer: 'Nguyên Hà',
            author: 'Akilier',
        },
    ]
    const columns: ColumnsType<DataType> = [
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
            render: (_, ) => (
                <Link to="">Gỡ</Link>
            )
        },
    ]

    const featureProps = [
        {
            icon: SlNote,
            text: 'Chỉnh sửa'
        },
        {
            icon: FaTrashAlt,
            text: 'Xóa Playlist'
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
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam molestias sapiente, ipsum minus</p>
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