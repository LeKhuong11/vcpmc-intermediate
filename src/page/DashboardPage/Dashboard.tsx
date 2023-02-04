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

function Dashboard() {
    const user = useAppSelector((state) => state.user.user);
    const [ currentUser, setCurrentUser ] = useState(user)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

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
  return (
    <div className={root.dashboard}>
        <div>
            <h2>Thông tin cơ bản</h2>
        </div>
        <div className={root.info}>
            <div className={root.avatar}>
                <div>
                    <Avatar size={170}>{currentUser.lastName.charAt(0).toUpperCase()}</Avatar>
                </div>
                <h4>{currentUser.displayName}</h4>
            </div>
            <form className={root.infoUser}>
                <div>
                    <div>
                        <p>Ho: </p>
                        <Input type='text' width={274} value={currentUser.fristName} />
                    </div>
                    <div>
                        <p>Ten: </p>
                        <Input type='text' width={274} value={currentUser.lastName} />
                    </div>
                </div>
                <div>
                    <div>
                        <p>Ngay sinh: </p>
                        <Input type='data' width={274} value={currentUser.birthday} />
                    </div>
                    <div>
                        <p>So dien thoai: </p>
                        <Input type='number' width={274} value={currentUser.phone} />
                    </div>
                </div>
                <div>
                    <div>
                        <p>Email: </p>
                        <Input 
                            type="email" 
                            width={571} 
                            value={currentUser.email}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <p>Ten dang nhap: </p>
                        <Input 
                            type="email" 
                            width={571} 
                            value={currentUser.email}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <p>Phan quyen: </p>
                        <Input 
                            type="text" 
                            width={274} 
                            value={user.isAdmin ? "admin" : 'Người dùng'}
                        />
                    </div>
                </div>
            </form>
        </div>
        <FeatureInPage featureProps={featureProps} />
    </div>
  )
}

export default Dashboard