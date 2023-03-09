import { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/es/table';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Breadcrumbs from '../../../../components/Breadcrumbs';
import FeatureInPage from '../../../../components/FeatureInPage';
import InputSearch from '../../../../components/InputSearch';
import CustomTable from '../../../../components/Table';
import {  DataTypeUser } from '../../../../redux/slice/unitUsedSlice';
import { HiPlus } from "react-icons/hi";
import { FaTrashAlt, FaUserFriends } from 'react-icons/fa';
import { getDocFireBase } from '../../../../hooks/getDoc';
import { RxDotFilled } from 'react-icons/rx';
import Loading from '../../../../components/Loading';
import { message, Modal } from 'antd';
import { updateDocConfig } from '../../../../hooks/updateDoc';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { usePaymentsCollection } from '../../../../hooks/useSnapshot';
import { useSearch } from '../../../../hooks/useSearch';
import { useAppSelector } from '../../../../redux/store';
const { confirm } = Modal;

function DetailUnitUsedPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { unitUsed } = useAppSelector(state => state.unitUsed)
    const [ user, setUser ] = useState<DataTypeUser[]>([]);
    const [ loading, setLoading ] = useState(true)
    const [ removeUser, setRemoveUser ] = useState<DataTypeUser[]>([]);
    const [ checkedUser, setCheckedUser ] = useState(0)
    const { payments } = usePaymentsCollection('unit-used');
    const getUser = unitUsed.filter(item => item.id === id)
    const [ search, setSearch ] = useSearch(getUser[0].listUser, 'fullName');
    

    //listen to 'search' change returned from useSearch();
    useEffect(() => {
        setUser(search)
    }, [search])

    useEffect(() => {
      const getCurrentUnitUsed = payments.filter(item => {
        return item.id === id
      })
      setUser(getCurrentUnitUsed[0]?.listUser);
      
    }, [payments])

    useEffect(() => {
       const getData = async () => {
            const data: any = await getDocFireBase({id: id, name: 'unit-used'})
            if(data) {
                setUser(data.listUser)
                setRemoveUser(data.listUser)
                setLoading(false)
            }
       }
        
       getData();
    }, [])

    const handleChangeSetSearchValue = (e: any) => {
        const value = e.value;

        setSearch(value)
    }
                              
    const rowSelection = {
        onChange: (selectedRowKeys: any, selectedRows: any) => {
            const index: number = selectedRowKeys.length - 1
            setCheckedUser(index + 1)
            if(selectedRows.length) {
                //Khi tick vào user nào thì sẽ xóa user đó đi khỏi array ngay lập tức nhưng chưa cập nhật trên firestore
                //Khi nhấn button xóa  thì sẽ update lại array mới đã loại bỏ những user đã tick
                const newListUser = removeUser.filter(item => {
                    return item.key !== selectedRowKeys[index]
                })

                setRemoveUser(newListUser);
            }
            else {
                setRemoveUser(user)
            }
        },
        
    };
    
    const handleClickRemoveUser = async () => {
       if(checkedUser) {
            confirm({
                title: 'Xóa thiết bị',
                icon: <ExclamationCircleOutlined />,
                content: <p>Bạn có chắc chắn muốn xoá các thiết bị này? Hành động này không thể hoàn tác.</p>,
                onOk() {
                    const params = {
                        documentName: 'unit-used',
                        id: id,
                        data: {
                            listUser: removeUser
                        }
                    }
            
                    const deleteUser = async () => {
                        const update = await updateDocConfig(params)
                        if(update) {
                            message.success("Xóa người dùng thành công")
                            setRemoveUser([])
                        }
                        else {
                            message.error("Xóa người dùng thất bại")
                        }
                    }
                    deleteUser();
                },
                onCancel() {
                    console.log('Cancel');
                },
            });

            return
       }
       message.warning("Bạn chưa chọn đơn vị sử dụng")
    }

    const dataSource: DataTypeUser[] = user
    const columns: ColumnsType<DataTypeUser> = [
    {
        title: 'STT',
        dataIndex: '',
        key: '',
        render: (_, {}, index) => (
            <p>{index + 1}</p>
        )
    },
    {
        title: 'Tên người dùng',
        dataIndex: 'fullName',
        key: 'fullName',
    },
    {
        title: 'Vai trò',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Tên đăng nhập',
        dataIndex: 'userName',
        key: 'userName',
    },
    {
        title: 'Cập nhật lần cuối',
        dataIndex: 'update',
        key: 'update',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (_, {status}) => (
            <>
                {status ? 
                <p><RxDotFilled color='green' />Đang kích hoạt</p> : 
                <p><RxDotFilled color='red' />Ngừng kích hoạt</p> }
            </>
        )
    },
    {
        key: '',
        render: (_, {key} ) => (
            <Link to={`detail-user/${key}`}>Xem chi tiết</Link>
        )
    },
    ] 

    const breadcrumb = [
    {
        key: 1 ,
        path: '',
        namePage: 'Quản lý' 
    },
    {
        key: 2,
        path: '../unit-used',
        namePage: 'Đơn vị sử dụng'
    },
    {
        key: 3,
        path: '',
        namePage: 'Chi tiết'
    }
    ]

    const featureProps = [
    {
        icon: HiPlus,
        text: 'Thêm người dùng',
        event: () => navigate("add-user")
    },
    {
        icon: FaTrashAlt,
        text: 'Xóa', 
        event: handleClickRemoveUser,
        unActive: checkedUser ? false : true
    },
    {
        icon: FaUserFriends,
        text: 'Vai trò', 
    },
    ] 
  return (
    <>
        {loading ? <Loading /> : 
            <div>
                <div>
                    <Breadcrumbs crumbs={breadcrumb} />
                </div>
                <div>
                    <h3>Đơn vị sử dụng - {payments[0].userRoot}</h3>
                </div>
                <div>
                    <InputSearch 
                        placehoder='Tên người dùng,...' 
                        setValue={handleChangeSetSearchValue}
                    />
                </div>
                <div>
                    <CustomTable 
                        dataSrouce={dataSource} 
                        columns={columns} 
                        heightProps={65} 
                        rowSelection={rowSelection} 
                        pagination={{pageSize: 9}}
                    />
                </div>
                <FeatureInPage featureProps={featureProps} />
            </div>
        }
    </>
  )
}

export default DetailUnitUsedPage