import React, { useEffect, useState } from 'react'
import FeatureInPage from '../../components/FeatureInPage';
import root from './createList.module.scss'
import { MdPlaylistAdd } from 'react-icons/md'
import { ColumnsType } from 'antd/es/table';
import CustomTable from '../../components/Table';
import { DataTypeCreateList,  fetchCreateList } from '../../redux/slice/createListSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { usePaymentsCollection } from '../../hooks/useSnapshot';
import Loading from '../../components/Loading';


function CreateList() {
  const dispatch = useAppDispatch()
  const { payments, loading} = usePaymentsCollection('create-list');
  const [ createLists, setCreateList ] = useState<DataTypeCreateList[]>(payments)

  // listen 
  // When data changes on firestore, we receive that update here in this
  // callback and then update the UI based on current state 
  useEffect(() => {
    setCreateList(payments)
    dispatch(fetchCreateList());
  }, [payments])

  const dataSource: DataTypeCreateList[] = createLists
  
  const columns: ColumnsType<DataTypeCreateList> = [
      {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',
        render: (_, {}, index) => (
          <p>{index + 1}</p>
        )
      },
      {
        title: 'Tên lịch',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Thời gian phát',
        dataIndex: 'time',
        key: 'time'
      },
      {
        render: (_, {id}) => {

          return <Link to={`detail/${id}`}>Xem chi tiết</Link>
        }
      },
      {
        title: '',
        dataIndex: 'delete',
        key: 'delete',
        render: (_, ) => {

          return <a>Xóa</a>
        }
      },

  ]

  const featureProps = [
    {
      icon: MdPlaylistAdd,
      text: 'Thêm lịch phát',
      unActive: true,
    }
  ]
  return (
    <>
      {loading ? <Loading /> : 
        <div className={root.createList}>
        <h3>Danh sách lịch phát</h3>
        <div>
            <CustomTable 
              columns={columns} 
              dataSrouce={dataSource} 
              heightProps={70} 
              pagination={{pageSize: 10}}
            />
        </div>
        <FeatureInPage featureProps={featureProps} />
    </div>
      }
    </>
  )
}

export default CreateList