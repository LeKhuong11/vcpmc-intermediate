import { Switch } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InputSearch from '../../../components/InputSearch'
import Loading from '../../../components/Loading'
import CustomTable from '../../../components/Table'
import { useSearch } from '../../../hooks/useSearch'
import { usePaymentsCollection } from '../../../hooks/useSnapshot'
import { DataTypeAuthorizedPartner, fetchAuthorizedPertnerList } from '../../../redux/slice/authorizedPartnerSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import root from '../manager.module.scss'


function Authorized() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user)
  const { authorizedPertnerList } = useAppSelector(state => state.authorizedPartner)
  const [ authorizedPartner, setAuthorizedPartner ] = useState<DataTypeAuthorizedPartner[]>(authorizedPertnerList);
  const { payments, loading } = usePaymentsCollection('authorized-partner');
  const [ search, setSearch ] = useSearch(payments, 'fullName');

  //listen to 'search' change returned from useSearch();
  useEffect(() => {
    setAuthorizedPartner(search)
  }, [search])


  //set lại dữ liệu ngay khi dữ liệu trên store thay đổi
  useEffect(() => {
    dispatch(fetchAuthorizedPertnerList())
    setAuthorizedPartner(payments)
  }, [payments])

  const handleChangeSetSearchValue = (e: any) => {
    const value = e.value;

    setSearch(value)
  }
  
  const dataSoure: DataTypeAuthorizedPartner[] = authorizedPartner
  
  const columns: ColumnsType<DataTypeAuthorizedPartner> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (_, {}, index ) => (
        <p>{index + 1}</p>
      )
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName'
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'numberPhone',
      key: 'numberPhone'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, {status}) => {
        return <>
          {status ? 
            <p><Switch defaultChecked />Đang kích hoạt</p> : 
            <p><Switch />Ngừng kích hoạt</p> }
        </>
      }
    },
    {
      title: '',
      dataIndex: 'update',
      key: 'update',
      render: (_, {id}) => {
        return <>
          {user.isAdmin ? <Link to={`detail/${id}`}>Cập nhật</Link> : ''}
        </>
      }
    }
  ]
  
  return (
    <>
      {loading ? <Loading /> : 
        <div className={root.authorized}>
        <h3>Danh sách đối tác ủy quyền</h3>
          <div>
            <InputSearch 
              placehoder='Tìm kiếm họ tên đổi tác ủy quyền,...' 
              setValue={handleChangeSetSearchValue}
            />
          </div>
          <div>
            <CustomTable 
              columns={columns} 
              dataSrouce={dataSoure} 
              heightProps={70} 
              pagination={{pageSize: 8}}
            />
          </div>
      </div>
      }
    </>
  )
}

export default Authorized