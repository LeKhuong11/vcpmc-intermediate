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
    const { user } = useAppSelector(state => state.user)
    const { unitUsed } = useAppSelector(state => state.unitUsed)
    const [ listUser, setListUser ] = useState<DataTypeUser[]>([]);
    const [ loading, setLoading ] = useState(true)
    const [ removeUser, setRemoveUser ] = useState<DataTypeUser[]>([]);
    const [ checkedUser, setCheckedUser ] = useState(0)
    const { payments } = usePaymentsCollection('unit-used');
    const getUser = unitUsed.filter(item => item.id === id)
    const [ search, setSearch ] = useSearch(getUser[0].listUser, 'fullName');
    

    //listen to 'search' change returned from useSearch();
    useEffect(() => {
        setListUser(search)
    }, [search])

    useEffect(() => {
      const getCurrentUnitUsed = payments.filter(item => {
        return item.id === id
      })
      setListUser(getCurrentUnitUsed[0]?.listUser);
      
    }, [payments])

    // Khi v???a v??o trang s??? l???y d??? li???u b???ng id ngu??i d??ng ???? ch???n
    useEffect(() => {
       const getData = async () => {
            const data: any = await getDocFireBase({id: id, name: 'unit-used'})
            if(data) {
                setListUser(data.listUser)
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
                //Khi tick v??o user n??o th?? s??? x??a user ???? ??i kh???i array ngay l???p t???c nh??ng ch??a c???p nh???t tr??n firestore
                //Khi nh???n button x??a  th?? s??? update l???i array m???i ???? lo???i b??? nh???ng user ???? tick
                const newListUser = removeUser.filter(item => {
                    return item.key !== selectedRowKeys[index]
                })

                setRemoveUser(newListUser);
            }
            else {
                setRemoveUser(listUser)
            }
        },
        
    };
    
    const handleClickRemoveUser = async () => {
       if(checkedUser) {
            confirm({
                title: 'X??a thi???t b???',
                icon: <ExclamationCircleOutlined />,
                content: <p>B???n c?? ch???c ch???n mu???n xo?? c??c thi???t b??? n??y? H??nh ?????ng n??y kh??ng th??? ho??n t??c.</p>,
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
                            message.success("X??a ng?????i d??ng th??nh c??ng")
                            setRemoveUser([])
                        }
                        else {
                            message.error("X??a ng?????i d??ng th???t b???i")
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
       message.warning("B???n ch??a ch???n ????n v??? s??? d???ng")
    }

    const dataSource: DataTypeUser[] = listUser
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
        title: 'T??n ng?????i d??ng',
        dataIndex: 'fullName',
        key: 'fullName',
    },
    {
        title: 'Vai tr??',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'T??n ????ng nh???p',
        dataIndex: 'userName',
        key: 'userName',
    },
    {
        title: 'C???p nh???t l???n cu???i',
        dataIndex: 'update',
        key: 'update',
    },
    {
        title: 'Tr???ng th??i',
        dataIndex: 'status',
        key: 'status',
        render: (_, {status}) => (
            <>
                {status ? 
                <p><RxDotFilled color='green' />??ang k??ch ho???t</p> : 
                <p><RxDotFilled color='red' />Ng???ng k??ch ho???t</p> }
            </>
        )
    },
    {
        key: '',
        render: (_, {key} ) => (
            <Link to={`detail-user/${key}`}>Xem chi ti???t</Link>
        )
    },
    ] 

    const breadcrumb = [
    {
        key: 1 ,
        path: '',
        namePage: 'Qu???n l??' 
    },
    {
        key: 2,
        path: '../unit-used',
        namePage: '????n v??? s??? d???ng'
    },
    {
        key: 3,
        path: '',
        namePage: 'Chi ti???t'
    }
    ]

    const featureProps = [
    {
        icon: HiPlus,
        text: 'Th??m ng?????i d??ng',
        event: () => {
            user.isAdmin ? navigate("add-user") : message.warning('Ch???c n??ng n??y ch??? d??nh cho ng?????i qu???n l??')
        },
        unActive: user.isAdmin ? false : true
    },
    {
        icon: FaTrashAlt,
        text: 'X??a', 
        event: () => {
            user.isAdmin ? handleClickRemoveUser() : message.warning('Ch???c n??ng n??y ch??? d??nh cho ng?????i qu???n l??')
        },
        unActive: user.isAdmin ? checkedUser ? false : true : true
    },
    {
        icon: FaUserFriends,
        text: 'Vai tr??', 
        unActive: user.isAdmin ? false : true
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
                    <h3>????n v??? s??? d???ng - {payments[0].userRoot}</h3>
                </div>
                <div>
                    <InputSearch 
                        placehoder='T??n ng?????i d??ng,...' 
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