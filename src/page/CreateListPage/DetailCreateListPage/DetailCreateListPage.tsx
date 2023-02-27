import { ColumnsType } from 'antd/es/table'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { SlNote } from 'react-icons/sl'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../../../components/Breadcrumbs'
import FeatureInPage from '../../../components/FeatureInPage'
import CustomTable from '../../../components/Table'
import { db } from '../../../firebase/configfb'

function DetailCreateListPage() {
    const { id } = useParams();
    const [ createList, setCreateList ] = useState<any>();
    
    useEffect(() => {
        const getData = async () => {
            const docRef = doc(db, "create-list", `${id}`);
            try {
                //get a document follow uid
                await getDoc(docRef)            
                .then((res) => {
                    setCreateList(res.data())
                })
                
            } catch(err) {
                console.log(err);
            }
        }
        getData()
    }, [])


    const data: any[] = createList && createList.listSong
    const columns: ColumnsType<any> = [
        {
            title: 'STT',
            dataIndex: '',
            key: '',
            render: (_, {}, index) => (
                <p>{index + 1}</p>
              )
        },
        {
            title: 'Tên Playlist',
            dataIndex: 'namePlaylist',
            key: 'namePlaylist',
        },
        {
            title: 'Ngày phát Playlist',
            dataIndex: 'startDay',
            key: 'startDay',
        },
        {
            title: 'Bắt đầu - Kết thúc',
            dataIndex: 'start',
            key: 'start',
            render: (_, {start, end} ) => {
                
                return <p>{start}-{end}</p>
            }
        },
        {
            title: 'Chu kỳ phát',
            dataIndex: 'cycle',
            key: 'cycle',
        },
        {
            title: 'Thiết bị',
            dataIndex: 'device',
            key: 'device',
        },
    ]

    const featureProps = [
        {
            icon: SlNote,
            text: 'Chỉnh sửa lịch phát'
        }
    ]

    const breadcrumb = [
        {
          key: 1,
          path: '../create-list',
          namePage: 'Lập lịch phát'
        },
        {
          key: 2,
          path: '',
          namePage: 'Chi tiết'
        }
      ]
  return (
    <div>
        <div>
            <Breadcrumbs crumbs={breadcrumb} />
        </div>
        <div>
            <h3>{'Lịch phát số 1'}</h3>
            <h4>Danh sách Playlist</h4>
        </div>
        <div>
            <CustomTable 
                columns={columns} 
                dataSrouce={data} 
                heightProps={70} 
                pagination={{pageSize: 10}}
            />
        </div>
        <FeatureInPage featureProps={featureProps} />
    </div>
  )
}

export default DetailCreateListPage