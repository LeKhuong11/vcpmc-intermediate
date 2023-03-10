import { Avatar, message, Modal } from 'antd'
import React, {useState} from 'react'
import { SlNote } from 'react-icons/sl'
import { RxLockClosed } from 'react-icons/rx'
import { MdOutlineLogout } from 'react-icons/md'
import Input from '../../components/Input'
import root from './dashboard.module.scss'
import FeatureInPage from '../../components/FeatureInPage'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { getAuth, updatePassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { deleteUser } from '../../redux/slice/userSlice'
import Button from '../../components/Button'
import { updateDocConfig } from '../../hooks/updateDoc'
import styled from 'styled-components'
import { logOut } from '../../firebase/userAuth'


const ModalStyled = styled(Modal)`
    &&& {
        .ant-modal-content {
            background-color: #3E3E5B;
            height: 50vh;
        }
        .ant-modal-title {
            text-align: center;
            color: var(--white);
            background-color: #3E3E5B;
            font-size: 23px;
        }
        .ant-modal-footer {
            display: flex;
            justify-content: center;
        }
        .ant-btn {
            width: 100px;
            border: 1.5px solid var(--orange);
            color: var(--orange);
            background-color: #3E3E5B;
        }
        .ant-btn-primary {
            background-color: var(--orange);
            color: var(--white);
        }
    }
`

function Dashboard() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const auth = getAuth();
    const currentUser: any = auth.currentUser;
    const { user } = useAppSelector((state) => state.user);
    const [ updateUser, setUpdateUser ] = useState(false)
    const [ openModal, setOpenModal ] = useState(false)
    const [ updatePasswd, setUpdatePasswd ] = useState({
        newPassword: '',
        confirmPassword: '',
    })
    const [ infoUser, setInfoUser ] = useState<any>({
        birthday: user.birthday,
        firstName: user.firstName,
        lastName: '',
        phone: user.phone,
    })
    

    const onClickLogout = async (e: string) => {

        try {
            await logOut();
            dispatch(deleteUser());
            navigate('../login')
        } catch(err) {
            message.error("error")
        }
    }
    const featureProps = [
        {
            icon: SlNote,
            text: "S???a th??ng tin",
            event: () => setUpdateUser(true)
        },
        {
            icon: RxLockClosed,
            text: '?????i m???t kh???u',
            event: () => setOpenModal(true)

        },
        {
            icon: MdOutlineLogout,
            text: '????ng xu???t',
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
          
          const update = await updateDocConfig(params);
          if(update) {
            message.success("Ch???nh s???a th??nh c??ng")
            setUpdateUser(false)
            return
          } 
          message.error("Ch???nh s???a th???t b???i")
    }


    //Change password to firebase
    const handleClickOnOkModal = async () => {
        if(updatePasswd.newPassword === updatePasswd.confirmPassword){
            try{
                await updatePassword(currentUser, updatePasswd.newPassword)
                    .then(res => {
                        setOpenModal(false)
                        message.success('?????i m???t kh???u th??nh c??ng')
                    })
            } catch(err) {
                console.log(err);
                message.error("?????i m???t kh???u th???t b???i")
            }
            return
        }
        message.error("?????i m???t kh???u th???t b???i")
    }
    const handleChangeValuePassword = (e: any) => {
        const name = e.name;
        const value = e.value;
        setUpdatePasswd({
            ...updatePasswd,
            [name]: value
        })
    }
    
  return (
    <div className={root.dashboard}>
        <div>
            <h3>Th??ng tin c?? b???n</h3>
        </div>
        <div className={root.info}>
            <div className={root.avatar}>
                <div>
                    <Avatar style={{ backgroundColor: '#f56a00', fontSize: 35}} size={170}>{user.avatar ?? user?.lastName.charAt(0).toUpperCase()}</Avatar>
                </div>
                <h4>{user.displayName}</h4>
            </div>
            <form className={root.infoUser}>
                <div>
                    <div>
                        <p>H???: </p>
                        <Input 
                            type='text' 
                            width={274} 
                            value={user.firstName} 
                            disabled={updateUser ? false : true} 
                            name="firstName"
                            setValue={handleChangeUpdateInfoUser}
                        />
                    </div>
                    <div>
                        <p>T??n: </p>
                        <Input 
                            type='text' 
                            width={274} 
                            value={user.lastName} 
                            disabled={updateUser ? false : true} 
                            name="lastName"
                            setValue={handleChangeUpdateInfoUser}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <p>Ng??y sinh: </p>
                        <Input 
                            type='text' 
                            width={274} 
                            value={user.birthday} 
                            disabled={updateUser ? false : true}
                            name="birthday"
                            setValue={handleChangeUpdateInfoUser}
                        />
                    </div>
                    <div>
                        <p>S??? ??i???n tho???i: </p>
                        <Input 
                            type='text' 
                            width={274} 
                            value={user.phone} 
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
                            value={user.email}
                            disabled={true}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <p>T??n ????ng nh???p: </p>
                        <Input 
                            type="email" 
                            width={571} 
                            value={user.email}
                            disabled={true}
                            
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <p>Ph??n quy???n: </p>
                        <Input 
                            type="text" 
                            width={274} 
                            value={user.isAdmin ? "admin" : 'Ng?????i d??ng'}
                            disabled={true}
                        />
                    </div>
                </div>
            </form>
        </div>
        {updateUser && <div className={root.btn}>
            <Button type='primary' heightProps={38} widthProps={148} contentProps="H???y" onClick={() => setUpdateUser(false)} />
            <Button type='secondary' heightProps={38} widthProps={148} contentProps="L??u" onClick={handleClickUpdateUserToFireStore} />
        </div>}
        <ModalStyled
            title="Thay ?????i m???t kh???u"
            open={openModal}
            onOk={handleClickOnOkModal}
            onCancel={() => setOpenModal(false)}
        >
            <form action="">
                <div>
                    <p>M???t kh???u hi???n t???i: </p>
                    <Input width={471} type="password" value={'password'} setValue={handleChangeValuePassword} name="password" />
                </div>
                <div>
                    <p>M???t kh???u m???i:</p>
                    <Input width={471} require type="password" setValue={handleChangeValuePassword} name="newPassword"/>
                </div>
                <div>
                    <p>Nh???p l???i m???t kh???u m???i:</p>
                    <Input width={471} require type="password" setValue={handleChangeValuePassword} name="confirmPassword"/>
                </div>
            </form>
        </ModalStyled>
        <FeatureInPage featureProps={featureProps} />
    </div>
  )
}

export default Dashboard