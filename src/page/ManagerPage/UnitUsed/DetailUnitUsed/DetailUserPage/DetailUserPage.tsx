import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { SlNote } from 'react-icons/sl';
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import Breadcrumbs from '../../../../../components/Breadcrumbs';
import FeatureInPage from '../../../../../components/FeatureInPage';
import Loading from '../../../../../components/Loading';
import { getDocFireBase } from '../../../../../hooks/getDoc';
import { DataTypeUser } from '../../../../../redux/slice/unitUsedSlice';
import { useAppSelector } from '../../../../../redux/store';


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
    const { user } = useAppSelector(state => state.user)
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
            text: 'Ch???nh s???a',
            event: () => {
                user.isAdmin ? navigate("update-user") : message.warning('Ch???c n??ng n??y ch??? d??nh cho ng?????i qu???n l??')
            },
            unActive: user.isAdmin ? false : true
        }
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
            path: `../unit-used/detail/${id}`,
            namePage: 'Chi ti???t'
        },
        {
            key: 4,
            path: '',
            namePage: 'Th??ng tin ng?????i d??ng'
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
                    <h3>Th??ng tin ng?????i d??ng</h3>
                </div>
                <div className='content'>
                    <div>
                        <span>
                            <h5>T??n ng?????i d??ng:</h5>
                            <p>{currentUser.fullName}</p>
                        </span>
                        <span>
                            <h5>Email:</h5>
                            <p>{currentUser.email}</p>
                        </span>
                        <span>
                            <h5>Vai tr??:</h5>
                            <p>{currentUser.role}</p>
                        </span>
                    </div>
                    <div>
                        <span>
                            <h5>T??n ????ng nh???p:</h5>
                            <p>{currentUser.userName}</p>
                        </span>
                        <span>
                            <h5>M???t kh???u:</h5>
                            <p>{currentUser.password}</p>
                        </span>
                        <span>
                            <h5>Tr???ng th??i thi???t b???:</h5>
                            <p>???? k??ch ho???t</p>
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