import { Button, Select, SelectProps, Upload, UploadFile } from 'antd'
import React from 'react'
import root from '../playlist.module.scss'
import { UploadOutlined } from '@ant-design/icons';
import Input from '../../../components/Input';
import CustomTable from '../../../components/Table';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import FeatureInPage from '../../../components/FeatureInPage';
import styled from 'styled-components';


interface DataType {
    key: number,
    stt: number,
    nameMusic: string,
    singer: string,
    author: string,
    listen?: string,
    del?: string
}

const SelectStyled = styled(Select)`
    &&& {
        :where(.css-dev-only-do-not-override-1n7nwfa).ant-select:not(.ant-select-customize-input) .ant-select-selector {
            background-color: #2B2B3F;
            color: var(--white);
            border: 1px solid var(--orange);

        }
        :where(.css-dev-only-do-not-override-1n7nwfa).ant-select:not(.ant-select-customize-input) .ant-select-focused {
            background-color: var(--violetLight);
            color: var(--white);
        }
        :where(.css-dev-only-do-not-override-1n7nwfa).ant-select-multiple .ant-select-selection-overflow-item {
            & svg {
                color: var(--white);
            }
        }
    }
`

function AddNewPlaylistPage() {

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
        console.log(`selected ${value}`);
      };

      const addSongToPlaylist: DataType[] = [
        {
            key: 1,
            stt: 1,
            nameMusic: 'Gorgeous Wooden Bike',
            singer: 'Tăng Phúc ft Mỹ Lệ',
            author: 'Origin'
        }
      ] 
      const dataSource: DataType[] = addSongToPlaylist
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
            dataIndex: 'del',
            key: 'del',
            render: (_, ) => (
                <Link to="">Gỡ</Link>
            )
        },
      ]

      const featureProps = [
        {
            icon: MdAdd,
            text: 'Thêm bản ghi'
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
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </div>
                <div>
                    <h5>Tiêu đề :</h5>
                    <Input type='text' height={45} width={250} />
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
                    <textarea typeof='text' />
                </div>
                <div>
                    <h5>Chủ đề:</h5>
                    <SelectStyled
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Nhập chủ đề"
                        onChange={() => handleChangeSelectTopic}
                        options={optionsTopics}
                    />
                </div>
            </div>
            <div className={root.addSong}>
                <CustomTable columns={columns} dataSrouce={dataSource} heightProps={70} />
            </div>
        </div>
        <FeatureInPage featureProps={featureProps} />
    </div>
  )
}

export default AddNewPlaylistPage