import React, { useEffect, useState } from 'react'
import { SlNote } from 'react-icons/sl';
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import Breadcrumbs from '../../../../../components/Breadcrumbs';
import FeatureInPage from '../../../../../components/FeatureInPage';
import Loading from '../../../../../components/Loading';
import { getDocFireBase } from '../../../../../hooks/getDoc';
import { DataTypeUser } from '../../../../../redux/slice/unitUsedSlice';


const ContainerStyled = styled.div`
    position: fixed;
    left: 45px;
    width: 100%;
    & .content {
        display: flex;
        justify-content: space-between;
        width: 60%;

        & span {
            display: flex;
            margin: 15px 0;
            & h5 {
                min-width: 150px;
            }
            & p {
                display: flex;
                align-items: center;
            }
        }
    }

    & .btn {
        display: flex;
        justify-content: center;
        margin-top: 50px;
    }
`

function DetailUserPage() {
    const navigate = useNavigate();
    const { id, uid } = useParams();
    const [ currentUnitUsed, setCurrentUnitUsed ] = useState<DataTypeUser[]>([]);
    const [ currentUser, setCurrentUser ] = useState<DataTypeUser>();

    
    useEffect(() => {
        const getData = async () => {
            const data: any = await getDocFireBase({id: id, name: 'unit-used'})
            if(data) {
                setCurrentUnitUsed(data.listUser)
            }
           }
            
           getData();
    }, [])

    useEffect(() => {
        const getUser = currentUnitUsed.filter(item => {
            return item.key.toString() === uid
        })
        getUser.length && setCurrentUser(getUser[0]);
        
    }, [currentUnitUsed])
    
    const featureProps = [
        {
            icon: SlNote,
            text: 'Chỉnh sửa',
            event: () => navigate("update-user")
        }
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
            path: `../unit-used/detail/${id}`,
            namePage: 'Chi tiết'
        },
        {
            key: 4,
            path: '',
            namePage: 'Thông tin người dùng'
        }
    ]
  return (
    <ContainerStyled>
        {currentUser ?
            <>
                <div>
                    <Breadcrumbs crumbs={breadcrumb} />
                </div>
                <div>
                    <h3>Thông tin người dùng</h3>
                </div>
                <div className='content'>
                    <div>
                        <span>
                            <h5>Tên người dùng:</h5>
                            <p>{currentUser.fullName}</p>
                        </span>
                        <span>
                            <h5>Email:</h5>
                            <p>{currentUser.email}</p>
                        </span>
                        <span>
                            <h5>Vai trò:</h5>
                            <p>{currentUser.role}</p>
                        </span>
                    </div>
                    <div>
                        <span>
                            <h5>Tên đăng nhập:</h5>
                            <p>{currentUser.userName}</p>
                        </span>
                        <span>
                            <h5>Mật khẩu:</h5>
                            <p>{currentUser.password}</p>
                        </span>
                        <span>
                            <h5>Trạng thái thiết bị:</h5>
                            <p>Đã kích hoạt</p>
                        </span>
                    </div>
                </div>
                <FeatureInPage featureProps={featureProps} />
            </> : <Loading />
        }
    </ContainerStyled>
  )
}

export default DetailUserPage