import { message } from 'antd'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { RxDotFilled } from 'react-icons/rx'
import { SlNote } from 'react-icons/sl'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { db } from '../../../../../firebase/configfb'
import { updateDocConfig } from '../../../../../hooks/updateDoc'
import Loading from '../../../../../components/Loading'
import FeatureInPage from '../../../../../components/FeatureInPage'
import CustomModal from '../../../../../components/Modal'
import Breadcrumbs from '../../../../../components/Breadcrumbs'
import { useAppSelector } from '../../../../../redux/store'


const ContentStyled = styled.div`
    width: 95%;
    &>div {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
    }
    &>div:nth-child(1) {
        & h5 {
            margin-right: 20px;
            min-width: 100px;
            font-size: 13px;
        }
    }
    &>div:nth-child(2) {
        margin-top: 60px;

        & h5 {
            margin-right: 20px;
            min-width: 110px;
            font-size: 13px;
        }
        & .authorized {
            & h5 {
                min-width: 135px;
            }
        }
    }
    & span {
        display: flex;
        padding-bottom: 7px;
        max-width: 350px;
       
        & p {
            display: flex;
            align-items: center;
            font-size: 13px;
        }
    }
`
const ContainerStyled = styled.div`
    width: 90%;
    position: fixed;
    left: 45px;
`

function DetailMiningContract() {   
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAppSelector(state => state.user)
    const [ contract, setContract ] = useState<any>({})
    const [ loading, setLoading ] = useState(false)
    const [ openModalCancelContract, setOpenModalCancelContract ] = useState(false)
    const [ cancelReason, setCancelReason ] = useState('');


    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            const docRef = doc(db, "contract", `${id}`);
            try {
                //get a document follow uid
                await getDoc(docRef)            
                .then((res) => {
                    setContract(res.data())
                    setLoading(false)
                })
                
            } catch(err) {
                console.log(err);
            }
        }
        getData()
    }, [])
 
    const handleClickSetOpenModalCancelContract = () => {
        if(contract.status === 'canceled') {
            setOpenModalCancelContract(false)
            message.warning("H???p ?????ng ???? ???????c h???y")
            return
        }
        setOpenModalCancelContract(true)
    }   
    
    const featureInPage = [
        {
            icon: SlNote,
            text: 'Ch???nh s???a',
            event: () => {
                return user.isAdmin ? '' : message.warning('Ch???c n??ng n??y ch??? d??nh cho ng?????i qu???n l??')
            },
            unActive: user.isAdmin ? false : true
        },
        {
            icon: FaTimes,
            text: 'H???y h???p ?????ng',
            event: () => {
                return user.isAdmin ? handleClickSetOpenModalCancelContract : message.warning('Ch???c n??ng n??y ch??? d??nh cho ng?????i qu???n l??')
            },
            unActive: user.isAdmin ? false : true
        },
    ]

    const statusobj: any = {
        new: <p><RxDotFilled color="green" />M???i</p>,
        active: <p><RxDotFilled color="blue" />C??n th???i h???n</p>,
        expired: <p><RxDotFilled color="gray" />???? h???t h???n</p>,
        canceled: <p><RxDotFilled color="red" />???? h???y</p>
    }

    const handleOk = async () => {
        setOpenModalCancelContract(false);
        const status = {
            status: 'canceled',
            reason: cancelReason
        }
        const params = {
            documentName: 'contract',
            id: id,
            data: status
        }
        const updateDoc = await updateDocConfig(params)
        if(updateDoc) {
            navigate('../../manager/contract')
            message.success("H???y h???p ?????ng th??nh c??ng")
            return
        }
        message.success("H???y h???p ?????ng th???t b???i")
    };
    
    const handleCancel = () => {
        setOpenModalCancelContract(false);
    };

    const breadcrumb = [
        {
          key: 1,
          path: '',
          namePage: 'Qu???n l??'
        },
        {
          key: 2,
          path: '../contract',
          namePage: 'Qu???n l?? h???p ?????ng'
        },
        {
          key: 3,
          path: '',
          namePage: 'Chi ti???t'
        }
      ]
    
  return (
    <>
        {loading ? <Loading /> : 
            <ContainerStyled>
                <div>
                    <Breadcrumbs crumbs={breadcrumb} />
                </div>
                <div>
                    <h3>H???p ?????ng khai th??c - HD123 </h3>
                </div>
                <ContentStyled>
                    <div>
                        <div>
                            <span>
                                <h5>T??n h???p ?????ng:</h5>
                                <p>{contract.contractName}</p>
                            </span>
                            <span>
                                <h5>S??? h???p ?????ng:</h5>
                                <p>{contract.contractID}</p>
                            </span>
                            
                            <span>
                                <h5>Ng??y hi???u l???c:</h5>
                                <p>{contract.startDay}</p>
                            </span>
                            <span>
                                <h5>Ng??y h???t h???n:</h5>
                                <p>{contract.date}</p>
                            </span>
                        </div>
                        <div>
                            <span>
                                <h5>????nh k??m t???p:</h5>
                                <div style={{display: 'block'}}>
                                    <p>hetthuongcannho.doc</p>
                                    <p>hetthuongcannho.doc</p>
                                </div>
                            </span>                
                        </div>
                        <div>
                            <span>
                                <h5>Lo???i h???p ?????ng:</h5>
                                <p>Tr???n g??i</p>
                            </span>
                            <span>
                                <h5>Gi?? tr??? h???p ?????ng (VN??):</h5>
                                <p>365.000.000</p>
                            </span>
                            <span>
                                <h5>Gi?? tr??? ph??n ph???i (VN??/ng??y):</h5>
                                <p>1.000.000</p>
                            </span>
                            <span>
                                <h5>T??nh tr???ng:</h5>
                                <p>{statusobj[contract.status]}</p>
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className='authorized'>
                            <span>
                                <h5>T??n ????n v??? s??? d???ng:</h5>
                                <p>C??ng ty TNHH MTV  ??u L???c</p>
                            </span>
                            <span>
                                <h5>Ng?????i ?????i di???n:</h5>
                                <p>{contract.fullName}</p>
                            </span>
                            <span>
                                <h5>Ch???c v???:</h5>
                                <p>Gi??m ?????c</p>
                            </span>
                            <span>
                                <h5>Ng??y sinh:</h5>
                                <p>{contract.birthDay}</p>
                            </span>
                            <span>
                                <h5>Qu???c t???ch:</h5>
                                <p>{contract.nationality}</p>
                            </span>
                            <span>
                                <h5>S??? ??i???n tho???i:</h5>
                                <p>{contract.numberPhone}</p>
                            </span>
                            <span> 
                                <h5>Email:</h5>
                                <p>{contract.email}</p>
                            </span>
                        </div>
                        <div>
                            <span>
                                <h5>Gi???i t??nh:</h5>
                                <p>{contract.sex ? 'Nam' : 'N???'}</p>
                            </span>
                            <span>
                                <h5>S??? CMND/ CCCD:</h5>
                                <p>{contract.personID}</p>
                            </span>
                            <span>
                                <h5>Ng??y c???p:</h5>
                                <p>{contract.dateOfIssue}</p>
                            </span>
                            <span>
                                <h5>N??i c???p:</h5>
                                <p>{contract.place}</p>
                            </span>
                            <span>
                                <h5>M?? s??? thu???:</h5>
                                <p>{contract.taxID}</p>
                            </span>
                            <span>
                                <h5>N??i c?? tr??:</h5>
                                <p>{contract.address}</p>
                            </span>
                        </div>
                        <div>   
                            
                            <span>
                                <h5>T??n ????ng nh???p:</h5>
                                <p>{contract.userName}</p>
                            </span>
                            <span>
                                <h5>M???t kh???u:</h5>
                                <p>{contract.pasword}</p>
                            </span>
                            <span>
                                <h5>S??? t??i kho???n:</h5>
                                <p>{contract.accountNumber}</p>
                            </span>
                            <span>
                                <h5>Ng??n h??ng:</h5>
                                <p>{contract.bank}</p>
                            </span>
                        </div>
                    </div>
                    <FeatureInPage featureProps={featureInPage} />
                    <CustomModal 
                        title="H???y h???p ?????ng khai th??c"
                        openModal={openModalCancelContract} 
                        handleOk={handleOk} 
                        handleCancel={handleCancel} 
                        content={<textarea onChange={(e) => setCancelReason(e.target.value)} placeholder='Cho ch??ng t??i bi???t l?? do b???n mu???n hu??? h???p ?????ng u??? quy???n n??y...'></textarea>} 
                    />
                </ContentStyled>
            </ContainerStyled>
        }
    </>
  )
}

export default DetailMiningContract