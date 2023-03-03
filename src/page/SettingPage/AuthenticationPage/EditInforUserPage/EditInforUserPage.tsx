import { async } from '@firebase/util'
import { message } from 'antd'
import { getAuth } from 'firebase/auth'
import { deleteDoc, doc } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { FiUserX } from 'react-icons/fi'
import { RiKey2Line } from 'react-icons/ri'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import Button from '../../../../components/Button'
import CustomDatePicker from '../../../../components/DatePicker'
import FeatureInPage from '../../../../components/FeatureInPage'
import Input from '../../../../components/Input'
import Loading from '../../../../components/Loading'
import CustomSelect from '../../../../components/Select'
import { db } from '../../../../firebase/configfb'
import { getDocFireBase } from '../../../../hooks/getDoc'
import { updateDocConfig } from '../../../../hooks/updateDoc'
import { DataTypeUsers } from '../../../../redux/slice/listUserSlice'


const ContaierStyled = styled.div`
    position: fixed;
    left: 45px;
    height: 90vh;
    width: 100%;
    position: relatieve;

    & .content {
        display: flex;
        justify-content: space-between;
        width: 55%;

        & span {
            margin: 5px 0;
        }
        &>div {
            
            &>div {
                margin: 10px 0;
            }
        }

        & i {
            color: #FF4747;
        }

        & form {
            & label {
                margin-right: 15px;
            }
        }
    }

    & .btn {
        width: 100%;
        display: flex;
        justify-content: center;
        position: absolute;   
        bottom: 30px; 
    }
`

function EditInforUserPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ valueSelect, setValueSelect ] = useState('')
    const [ detailUser, setDetailUser ] = useState<DataTypeUsers>();
    const [ updateUser, setUpdateUser] = useState<any>(null);
    const [ loading, setLoding ] = useState(false)

    useEffect(() => {
        setLoding(true)
        const getData = async () => {
             const data: any = await getDocFireBase({id: id, name: 'user'})
             if(data) {
                setDetailUser(data)
                setLoding(false)
                setValueSelect(data?.role)
             }
        }
         
        getData();
     }, [])

    const handleChangeSetValueToAddUser = (e: any) => {
        const name = e.name;
        const value = e.value;

        setUpdateUser({
            ...updateUser,
            [name]: value
        })
    }

    const onChangeRadio = (e: any) => {
        const value = e.target.value;
        value === 'true' ? 
        setUpdateUser({
            ...updateUser,
            status: true
        }) : 
        setUpdateUser({
            ...updateUser,
            status: false
        })
    }

    const handleClickUpdateUser = async () => {
        if(updateUser) {
            const params = {
                documentName: 'user',
                id: id,
                data: updateUser
            }
            
            const updateDoc = await updateDocConfig(params)
            if(updateDoc) {
                message.success('Chỉnh sửa thành công');
                navigate("../../setting/authentication")
                return 
            }
            message.error('Chỉnh sửa thất bại');
        }
        else {
            message.warning('Bạn chưa chỉnh sửa');
        }
    }

    const handleClickRemoveUser = async () => {
        // try {
        //     await deleteDoc(doc(db, "user", `${id}`));
        //     navigate('../../setting/authentication');
        //     message.success("Xóa người dùng thành công")
        // } catch(err) {
        //     message.error("Xóa người dùng thất bại")            
        // }
    }
   
    
    const breadcrumb = [
        {
            key: 1 ,
            path: '',
            namePage: 'Cài đặt' 
        },
        {
            key: 2,
            path: '../authentication',
            namePage: 'Phân quyền người dùng'
        },
        {
            key: 3,
            path: '',
            namePage: 'Chỉnh sửa'
        }
    ]

    const featureProps = [
        {
            icon: FiUserX,
            text: 'Xóa người dùng',
            event: handleClickRemoveUser,
            unActive: true
        },
        {
            icon: RiKey2Line,
            text: 'Khôi phục mật khẩu', 
            unActive: true
        },
    ] 
    const select = {
        items: ['Group Admin', 'System Admin', 'Super Admin', 'Lisences', 'Account'],
        onChange: (value: string) => {
            setValueSelect(value)
            setUpdateUser({
                ...updateUser,
                role: value
            })
        }
    }
    
  return (
    <>
        {loading ? <Loading /> : 
            <ContaierStyled>
                <div>
                    <Breadcrumbs crumbs={breadcrumb} />
                </div>
                <div>
                    <h3>Chỉnh sửa thông tin người dùng</h3>
                </div>
                <div className='content'>
                    <div>
                        <div>
                            <h5>Tên người dùng:<i>*</i></h5>
                            <Input 
                                type='text'
                                width={330}
                                name="displayName"
                                setValue={handleChangeSetValueToAddUser}
                                value={detailUser?.displayName}
                            />
                        </div>
                        <div>
                            <h5>Số điện thoại:</h5>
                            <Input 
                                type='text'
                                width={330}
                                name="phone"
                                setValue={handleChangeSetValueToAddUser}
                                value={detailUser?.phone}
                            />
                        </div>
                        <div>
                            <h5>Ngày hết hạn:</h5>
                            <CustomDatePicker />
                        </div>
                        <div>
                            <h5>Vai trò:<i>*</i></h5>
                            <CustomSelect 
                                items={select.items}
                                onChange={select.onChange}
                                width={330}
                                value={valueSelect}
                            />
                        </div>
                        <p><i>*</i>là những trường thông tin bắt buộc</p>
                    </div>
                    <div>
                        <div>
                            <h5>Email:<i>*</i></h5>
                            <Input 
                                type='text'
                                width={330}
                                name="email"
                                setValue={handleChangeSetValueToAddUser}
                                value={detailUser?.email}
                            />
                        </div>
                        <div>
                            <h5>Tên đăng nhập:<i>*</i></h5>
                            <Input 
                                type='text'
                                width={330}
                                name="userName"
                                setValue={handleChangeSetValueToAddUser}
                                value={detailUser?.userName}
                            />
                        </div>
                        <div>
                            <h5>Mật khẩu:<i>*</i></h5>
                            <Input 
                                type='password'
                                width={330}
                                name="password"
                                setValue={handleChangeSetValueToAddUser}
                                value={'password'}
                            />
                        </div>
                        <div>
                            <h5>Trạng thái:<i>*</i></h5>
                            <form action="">
                                    <input 
                                        type="radio" 
                                        value="true" 
                                        name="status" 
                                        id='active'
                                        onChange={onChangeRadio}
                                        
                                    />
                                    <label htmlFor="active">Đang hoạt động</label>
                                    <input 
                                        type="radio" 
                                        value="false" 
                                        name="status" 
                                        id='unActive'
                                        onChange={onChangeRadio}
                                    /> 
                                    <label htmlFor="unActive"> Ngừng hoạt động</label>
                                </form>
                        </div>
                    </div>
                </div>
                <div className='btn'>
                    <Button type='primary' heightProps={38} widthProps={148} contentProps="Hủy" onClick={() => navigate(`../../setting/authentication`)} />
                    <Button type='secondary' heightProps={38} widthProps={148} contentProps="Lưu" onClick={handleClickUpdateUser} />
                </div>
                <FeatureInPage featureProps={featureProps} />
            </ContaierStyled>
        }
    </>
  )
}

export default EditInforUserPage