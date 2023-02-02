import { Avatar } from 'antd'
import React from 'react'
import { SlNote } from 'react-icons/sl'
import { RxLockClosed } from 'react-icons/rx'
import { MdOutlineLogout } from 'react-icons/md'
import Input from '../../components/Input'
import root from './dashboard.module.scss'
import FeatureInPage from '../../components/FeatureInPage'

function Dashboard() {

    const featureProps = [
        {
            icon: SlNote,
            text: "Sửa thông tin"
        },
        {
            icon: RxLockClosed,
            text: 'Đổi mật khẩu' 
        },
        {
            icon: MdOutlineLogout,
            text: 'Đăng xuất'
        }
    ]
  return (
    <div className={root.dashboard}>
        <div>
            <h2>Thong tin co ban</h2>
        </div>
        <div className={root.info}>
            <div className={root.avatar}>
                <div>
                    <Avatar size={170}>T</Avatar>
                </div>
                <h4>Tuyet Nguyen</h4>
            </div>
            <form className={root.infoUser}>
                <div>
                    <div>
                        <p>Ho: </p>
                        <Input type='text' width={274} />
                    </div>
                    <div>
                        <p>Ten: </p>
                        <Input type='text' width={274} />
                    </div>
                </div>
                <div>
                    <div>
                        <p>Ngay sinh: </p>
                        <Input type='data' width={274} />
                    </div>
                    <div>
                        <p>So dien thoai: </p>
                        <Input type='number' width={274} />
                    </div>
                </div>
                <div>
                    <div>
                        <p>Email: </p>
                        <Input 
                            type="email" 
                            width={571} 
                            value="tuyetnguyenngoc@alta.com"
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <p>Ten dang nhap: </p>
                        <Input 
                            type="email" 
                            width={571} 
                            value="tuyetnguyenngoc@alta.com"
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <p>Phan quyen: </p>
                        <Input 
                            type="text" 
                            width={274} 
                            value="admin"
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