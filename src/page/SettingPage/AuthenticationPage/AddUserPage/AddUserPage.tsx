import { message } from 'antd'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import Button from '../../../../components/Button'
import CustomDatePicker from '../../../../components/DatePicker'
import Input from '../../../../components/Input'
import InputDate from '../../../../components/InputDate'
import Loading from '../../../../components/Loading'
import CustomSelect from '../../../../components/Select'
import { auth, db } from '../../../../firebase/configfb'
import { logOut, signUp } from '../../../../firebase/userAuth'


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
interface IUser {
    avatar: any,
    firstName: string,
    lastName: string,
    displayName: string,
    phone: string,
    email: string,
    isAdmin: number,
    userName: string,
    birthday: string, 
    password: string
}

function AddUserPage() {
    const navigate = useNavigate();
    const [ valueSelect, setValueSelect ] = useState('Chọn vai trò')
    const [ oldEmail, setOldEmail ] = useState<any>();
    const [ loading, setLoading ] = useState(false);
    const [ addUser, setAddUser ] = useState<IUser>({
        avatar: null,
        firstName: '',
        lastName: '',
        displayName: '',
        phone: '',
        email: '',
        isAdmin: 0,
        userName: '',
        birthday: '',
        password: ''
    }); 

    const handleChangeSetValueToAddUser = (e: any) => {
        const name = e.name;
        const value = e.value;

        setAddUser({
            ...addUser,
            [name]: value
        })
    }

    const handleClickAddUser = async () => {
        // const auth = getAuth();
        // setOldEmail(auth.currentUser?.email);
        // setLoading(true)
        // createUserWithEmailAndPassword(auth, addUser.email, addUser.password)
        //     .then((response) => {
        //         const auth=getAuth();
        //         signInWithEmailAndPassword(auth, oldEmail, '123456')
        //         return response
        //     })
        //     .then(async (res) => {
        //         const user = res.user;
        //         const docRef = doc(db, 'user', user.uid)

        //         try {
        //             await setDoc(docRef, addUser)
        //             setLoading(false)
        //             navigate('../authentication')
        //             message.success("Thêm nguòi dùng thành công")
        //         } catch(err) {
        //             console.log(err);
        //         }
        //     })
        //     .catch(() => {
        //         message.error("Thêm nguòi dùng thất bại")
        //     })
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
            namePage: 'Thêm người dùng'
        }
    ]

    
    const select = {
        items: ['Group Admin', 'System Admin', 'Super Admin', 'Lisences', 'Account'],
        onChange: (value: string) => {
            setValueSelect(value)
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
                            />
                        </div>
                        <div>
                            <h5>Số điện thoại:<i>*</i></h5>
                            <Input 
                                type='text'
                                width={330}
                                name="phone"
                                setValue={handleChangeSetValueToAddUser}
                            />
                        </div>
                        <div>
                            <h5>Email:<i>*</i></h5>
                            <Input 
                                type='text'
                                width={330}
                                name="email"
                                setValue={handleChangeSetValueToAddUser}
                            />
                        </div>
                        <div>
                            <h5>Ngày sinh:</h5>
                            <InputDate 
                                name='birthday'
                                width={330}
                                onChange={handleChangeSetValueToAddUser}
                            />
                        </div>
                        <div>
                            <h5>Vai trò:<i>*</i></h5>
                            <CustomSelect 
                                value={valueSelect}
                                items={select.items}
                                onChange={select.onChange}
                                width={330}
                            />
                        </div>
                        <p><i>*</i>là những trường thông tin bắt buộc</p>
                    </div>
                    <div>
                        <div>
                            <h5>Họ:<i>*</i></h5>
                            <Input 
                                type='text'
                                width={330}
                                name="firstName"
                                setValue={handleChangeSetValueToAddUser}
                            />
                        </div>
                        <div>
                            <h5>Tên:<i>*</i></h5>
                            <Input 
                                type='text'
                                width={330}
                                name="lastName"
                                setValue={handleChangeSetValueToAddUser}
                            />
                        </div>
                        <div>
                            <h5>Tên đăng nhập:<i>*</i></h5>
                            <Input 
                                type='email'
                                width={330}
                                name="userName"
                                setValue={handleChangeSetValueToAddUser}
                            />
                        </div>
                        <div>
                            <h5>Mật khẩu:<i>*</i></h5>
                            <Input 
                                type='password'
                                width={330}
                                name="password"
                                setValue={handleChangeSetValueToAddUser}
                            />
                        </div>
                    </div>
                </div>
                <div className='btn'>
                    <Button type='primary' heightProps={38} widthProps={148} contentProps="Hủy" onClick={() => navigate(`../authentication`)} />
                    <Button type='secondary' heightProps={38} widthProps={148} contentProps="Lưu" onClick={handleClickAddUser} />
                </div>
            </ContaierStyled>
        }
    </>
  )
}

export default AddUserPage