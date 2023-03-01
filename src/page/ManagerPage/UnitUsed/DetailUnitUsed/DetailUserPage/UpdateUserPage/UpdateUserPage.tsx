import { message } from 'antd';
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import Breadcrumbs from '../../../../../../components/Breadcrumbs';
import Button from '../../../../../../components/Button';
import Input from '../../../../../../components/Input';
import Loading from '../../../../../../components/Loading';
import CustomSelect from '../../../../../../components/Select';
import { getDocFireBase } from '../../../../../../hooks/getDoc';
import { updateDocConfig } from '../../../../../../hooks/updateDoc';
import { DataTypeUser } from '../../../../../../redux/slice/unitUsedSlice';


const ContainerStyled = styled.div`
    position: fixed;
    left: 45px;
    width: 100%;
    & .content {
        display: flex;
        justify-content: space-between;
        width: 75%;

        & span {
            display: flex;
            margin: 7px 0;
            & h5 {
                display: flex;
                align-items: center;
                min-width: 140px;

                & i {
                    color: #FF4747;
                }
            }
        }
    }

    & .btn {
        display: flex;
        justify-content: center;
        margin-top: 50px;
    }
`

function UpdateUserPage() {
    const navigate = useNavigate();
    const { id, uid } = useParams();
    const [ currentListUser, setCurrenListUser ] = useState<DataTypeUser[]>([]);
    const [ currentUser, setCurrentUser ] = useState<DataTypeUser>();
    const [ updateUser, setUpdateUser ] = useState<any>();
    const [ valueSelect, setValueSelect ] = useState('');

    useEffect(() => {
        //lấy ra danh sách user theo id unit-used
        const getData = async () => {
            const data: any = await getDocFireBase({id: id, name: 'unit-used'})
            if(data) {
                setCurrenListUser(data.listUser)
            }
           }
            
           getData();
    }, [])

    useEffect(() => {
        const getUser = currentListUser.filter(item => {
            return item.key.toString() === uid
        })
        setCurrentUser(getUser[0])
        setUpdateUser(getUser[0])
        setValueSelect(getUser[0]?.role)
        
    }, [currentListUser])
    

    //handle onChange input
    const handleChangeSetUpdateUser = (e: any) => {
        const name = e.name;
        const value = e.value;

        setUpdateUser({
            ...updateUser,
            [name]: value
        })
    }

    const handleClickUpdateUser = async () => {
        //lấy danh sách user hiện tại trên db theo id unit-used 
        //trước khi thêm user vừa chỉnh sửa thì xóa user đó đi khỏi listUser
        //khi đã xóa thì thêm user vừa chỉnh sửa vào listUser
        //update lại listUser theo id vào firestore
        const newUser = currentListUser.filter(item => {
            return item.key.toString() !== uid
        })

        newUser.push(updateUser)

        const params = {
            documentName: 'unit-used',
            id: id,
            data: {
                listUser: newUser
            }
        }

        const update = await updateDocConfig(params)
        if(update) {
            message.success("Chỉnh sửa người dùng thành công")
            navigate(`../unit-used/detail/${id}/detail-user/${uid}`)
        }
        else {
            message.error("Chỉnh sửa người dùng thất bại")
        }
    }

    //handle select role
    const select = {
        items: ['QA', 'QC', 'Content Manager', 'Admin'],
        onChange: (value: string) => {
            setValueSelect(value)
            setUpdateUser({
                ...updateUser,
                role: value
            })
        }
    }
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
            path: `../unit-used/detail/${id}`,
            namePage: 'Chi tiết'
        },
        {
            key: 4,
            path: `../unit-used/detail/${id}/detail-user/${uid}`,
            namePage: 'Thông tin người dùng'
        },
        {
            key: 5 ,
            path: '',
            namePage: 'Chỉnh sửa thông tin' 
        },
      ]

      
  return (
    <>
        {currentUser ? 
            <ContainerStyled>
                <div>
                    <Breadcrumbs crumbs={breadcrumb} />
                </div>
                <div>
                    <h3>Thêm người dùng</h3>
                </div>
                <div className='content'>
                    <div>
                        <span>
                            <h5>Tên người dùng<i>*</i></h5>
                            <Input 
                                type='text' 
                                width={300} 
                                value={currentUser.fullName}
                                name="fullName"
                                setValue={handleChangeSetUpdateUser}
                            />
                        </span>
                        <span>
                            <h5>Email<i>*</i></h5>
                            <Input 
                                type='text' 
                                width={300} 
                                value={currentUser.email}
                                name="email"
                                setValue={handleChangeSetUpdateUser}
                            />
                        </span>
                        <span>
                            <h5>Vai trò<i>*</i></h5>
                            <CustomSelect 
                                value={valueSelect}
                                items={select.items}
                                onChange={select.onChange}
                                width={160}
                            />
                        </span>
                    </div>
                    <div>
                        <span>
                            <h5>Tên đăng nhập<i>*</i></h5>
                            <Input 
                                type='text'
                                width={300} 
                                value={currentUser.userName}
                                name="userName"
                                setValue={handleChangeSetUpdateUser}
                            />
                        </span>
                        <span>
                            <h5>Mật khẩu<i>*</i></h5>
                            <Input 
                                type='text' 
                                width={300} 
                                value={currentUser.password}
                                name="password"
                                setValue={handleChangeSetUpdateUser}
                            />
                        </span>
                        <span>
                            <h5>Nhập lại mật khẩu<i>*</i></h5>
                            <Input 
                                type='text' 
                                width={300} 
                                value={currentUser.password}
                                name="password"
                                setValue={handleChangeSetUpdateUser}
                            />
                        </span>
                    </div>
                </div>
                <div className='btn'>
                    <Button type='primary' heightProps={38} widthProps={148} contentProps="Hủy" onClick={() => navigate(`../unit-used/detail/${id}/detail-user/${uid}`)} />
                    <Button type='secondary' heightProps={38} widthProps={148} contentProps="Lưu" onClick={handleClickUpdateUser} />
                </div>
            </ContainerStyled> : <Loading /> 
        }
    </>
  )
}

export default UpdateUserPage