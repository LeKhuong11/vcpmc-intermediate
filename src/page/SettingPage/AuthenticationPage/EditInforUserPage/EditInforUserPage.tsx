import { useState } from 'react'
import { FiUserX } from 'react-icons/fi'
import { RiKey2Line } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import Button from '../../../../components/Button'
import CustomDatePicker from '../../../../components/DatePicker'
import FeatureInPage from '../../../../components/FeatureInPage'
import Input from '../../../../components/Input'
import CustomSelect from '../../../../components/Select'


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
    const [ valueSelect, setValueSelect ] = useState('')

    const handleChangeSetValueToAddUser = () => {

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
            event: () => navigate("add-user")
        },
        {
            icon: RiKey2Line,
            text: 'Khôi phục mật khẩu', 
        },
    ] 
    const select = {
        items: ['Group Admin', 'System Admin', 'Super Admin', 'Lisences', 'Account'],
        onChange: (value: string) => {
            setValueSelect(value)
        }
    }
  return (
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
                        name="fullName"
                        setValue={handleChangeSetValueToAddUser}
                    />
                </div>
                <div>
                    <h5>Số điện thoại:</h5>
                    <Input 
                        type='text'
                        width={330}
                        name="fullName"
                        setValue={handleChangeSetValueToAddUser}
                    />
                </div>
                <div>
                    <h5>Ngày hết hạn:</h5>
                    <CustomDatePicker />
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
            </div>
            <div>
                <div>
                    <h5>Email:<i>*</i></h5>
                    <Input 
                        type='text'
                        width={330}
                        name="fullName"
                        setValue={handleChangeSetValueToAddUser}
                    />
                </div>
                <div>
                    <h5>Tên đăng nhập:<i>*</i></h5>
                    <Input 
                        type='text'
                        width={330}
                        name="fullName"
                        setValue={handleChangeSetValueToAddUser}
                    />
                </div>
                <div>
                    <h5>Mật khẩu:<i>*</i></h5>
                    <Input 
                        type='password'
                        width={330}
                        name="fullName"
                        setValue={handleChangeSetValueToAddUser}
                    />
                </div>
                <div>
                    <h5>Trạng thái:<i>*</i></h5>
                    
                </div>
            </div>
        </div>
        <div className='btn'>
            <Button type='primary' heightProps={38} widthProps={148} contentProps="Hủy" onClick={() => navigate(``)} />
            <Button type='secondary' heightProps={38} widthProps={148} contentProps="Lưu"  />
        </div>
        <FeatureInPage featureProps={featureProps} />
    </ContaierStyled>
  )
}

export default EditInforUserPage