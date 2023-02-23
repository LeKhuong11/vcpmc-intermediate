import { Avatar, message } from 'antd'
import React, {useState, useEffect} from 'react'
import { SlNote } from 'react-icons/sl'
import { RxLockClosed } from 'react-icons/rx'
import { MdOutlineLogout } from 'react-icons/md'
import Input from '../../components/Input'
import root from './dashboard.module.scss'
import FeatureInPage from '../../components/FeatureInPage'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/configfb'
import { useNavigate } from 'react-router-dom'
import { deleteUser } from '../../redux/slice/userSlice'
import Button from '../../components/Button'
import { updateDocConfig } from '../../hooks/useUpdateDoc'

function Dashboard() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { user } = useAppSelector((state) => state.user);
    const [ currentUser, setCurrentUser ] = useState(user)
    const [ updateUser, setUpdateUser ] = useState(false)
    const [ infoUser, setInfoUser ] = useState<any>({
        birthday: user.birthday,
        firstName: user.firstName,
        lastName: '',
        phone: user.phone,
    })

    useEffect(() => {
        setCurrentUser(user)
    }, [user])

    const onClickLogout = async (e: string) => {

        try {
            await signOut(auth);
            dispatch(deleteUser());
            navigate('login')
        } catch(err) {
            message.error("error")
        }
    }
    const featureProps = [
        {
            icon: SlNote,
            text: "Sửa thông tin",
            event: () => setUpdateUser(true)
        },
        {
            icon: RxLockClosed,
            text: 'Đổi mật khẩu',

        },
        {
            icon: MdOutlineLogout,
            text: 'Đăng xuất',
            event: onClickLogout
        }
    ]

    const handleChangeUpdateInfoUser = (e: any) => {
        const name = e.name;
        const value = e.value;

        setInfoUser({
            ...infoUser,
            [name]: value
        })
    }
    const handleClickUpdateUserToFireStore = async () => {
        const params = {
            documentName: 'user',
            id: user.id,
            data: infoUser
          }
          console.log(infoUser);
          
          const update = await updateDocConfig(params);
          if(update) {
            message.success("Chỉnh sửa thành công")
            return
          } 
          message.error("Chỉnh sửa thất bại")
    }

  return (
    <div className={root.dashboard}>
        <div>
            <h3>Thông tin cơ bản</h3>
        </div>
        <div className={root.info}>
            <div className={root.avatar}>
                <div>
                    <Avatar style={{ backgroundColor: '#f56a00', fontSize: 35}} size={170}>{currentUser.avatar ?? currentUser.lastName.charAt(0).toUpperCase()}</Avatar>
                </div>
                <h4>{currentUser.displayName}</h4>
            </div>
            <form className={root.infoUser}>
                <div>
                    <div>
                        <p>Họ: </p>
                        <Input 
                            type='text' 
                            width={274} 
                            value={currentUser.firstName} 
                            disabled={updateUser ? false : true} 
                            name="firstName"
                            setValue={handleChangeUpdateInfoUser}
                        />
                    </div>
                    <div>
                        <p>Tên: </p>
                        <Input 
                            type='text' 
                            width={274} 
                            value={currentUser.lastName} 
                            disabled={updateUser ? false : true} 
                            name="lastName"
                            setValue={handleChangeUpdateInfoUser}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <p>Ngày sinh: </p>
                        <Input 
                            type='text' 
                            width={274} 
                            value={currentUser.birthday} 
                            disabled={updateUser ? false : true}
                            name="birthday"
                            setValue={handleChangeUpdateInfoUser}
                        />
                    </div>
                    <div>
                        <p>Số điện thoại: </p>
                        <Input 
                            type='text' 
                            width={274} 
                            value={currentUser.phone} 
                            disabled={updateUser ? false : true}
                            name="phone"
                            setValue={handleChangeUpdateInfoUser}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <p>Email: </p>
                        <Input 
                            type="email" 
                            width={571} 
                            value={currentUser.email}
                            disabled={true}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <p>Tên đăng nhập: </p>
                        <Input 
                            type="email" 
                            width={571} 
                            value={currentUser.email}
                            disabled={true}
                            
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <p>Phân quyền: </p>
                        <Input 
                            type="text" 
                            width={274} 
                            value={user.isAdmin ? "admin" : 'Người dùng'}
                            disabled={true}
                        />
                    </div>
                </div>
            </form>
        </div>
        {updateUser && <div className={root.btn}>
            <Button type='primary' heightProps={38} widthProps={148} contentProps="Hủy" />
            <Button type='secondary' heightProps={38} widthProps={148} contentProps="Lưu" onClick={handleClickUpdateUserToFireStore} />
        </div>}
        <FeatureInPage featureProps={featureProps} />
    </div>
  )
}

export default Dashboard