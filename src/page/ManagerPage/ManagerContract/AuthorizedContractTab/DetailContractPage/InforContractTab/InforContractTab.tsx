import { Checkbox, message, Modal, Upload } from 'antd'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { GiNotebook } from 'react-icons/gi'
import { RxDotFilled } from 'react-icons/rx'
import { SlNote } from 'react-icons/sl'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../../../../../components/Button'
import FeatureInPage from '../../../../../../components/FeatureInPage'
import InputDate from '../../../../../../components/InputDate'
import Loading from '../../../../../../components/Loading'
import CustomModal from '../../../../../../components/Modal'
import { db } from '../../../../../../firebase/configfb'
import { updateDocConfig } from '../../../../../../hooks/updateDoc'
import { UploadOutlined } from '@ant-design/icons';
import Input from '../../../../../../components/Input'
import { useAppSelector } from '../../../../../../redux/store'

const ModalStyled = styled(Modal)`
    &&& {
        :where(.css-dev-only-do-not-override-1n7nwfa).ant-modal  {
            left: -100px;
        }
        .ant-modal-content {
            background-color: #3E3E5B;
            height: 60vh;
            width: 800px;
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
        .ant-checkbox-wrapper {
            display: flex;
            align-items: center;
            margin-top: 4px;
        }
        .ant-btn-primary {
            background-color: var(--orange);
            color: var(--white);
        }
        & textarea {
            width: 100%;
            height: 120px;
            background-color: #2B2B3F;
            color: var(--white);
            border-radius: 8px;
            border: none;
            font-family: 'Montserrat';
            padding: 12px;
        }
    }
    & .contentModal {
        display: flex;

        &>div {
            width: 50%;
            &>div {
                margin-bottom: 20px;
            }
            & p {
                margin: 6px 0;
                display: flex;
                align-items: center;
            }

            & .date {
                display: flex;

                &>p {
                    margin-right: 10px;
                }
            }
            & .upload {
                display: flex;
                
                & h5 {
                    margin-right: 15px;
                }
            }
            & .checkbox-child {
                margin-left: 20px;
                border-left: 2px solid #727288; 
                padding: 7px;
            }
            & .royalties {
                display: flex;
            }
            & p {
                display: flex;
                align-items: center;
            }
        }
    }

`

const ContainerStyled = styled.div`
    width: 86%;
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
                min-width: 150px;
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


function InforContractTab() {   
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAppSelector(state => state.user)
    const [ contract, setContract ] = useState<any>({})
    const [ loading, setLoading ] = useState(false)
    const [ openModalCancelContract, setOpenModalCancelContract ] = useState(false)
    const [ openModalContractExtension, setOpenModalContractExtension ] = useState(false)
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
            text: 'Ch???nh s???a h???p ?????ng',
            event: () => {
                user.isAdmin ? navigate('edit') : message.warning('Ch???c n??ng n??y ch??? d??nh cho ng?????i qu???n l??')
            },
            unActive: user.isAdmin ? false : true
            
        },
        {
            icon: GiNotebook,
            text: 'Gia h???n h???p ?????ng',
            event: () => {
                user.isAdmin ? setOpenModalContractExtension(true) : message.warning('Ch???c n??ng n??y ch??? d??nh cho ng?????i qu???n l??')
            },
            unActive: user.isAdmin ? false : true
        },
        {
            icon: FaTimes,
            text: 'H???y h???p ?????ng',
            event: () => {
                user.isAdmin ? handleClickSetOpenModalCancelContract() : message.warning('Ch???c n??ng n??y ch??? d??nh cho ng?????i qu???n l??')
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
        setOpenModalContractExtension(false);
    };

    const handleClickUpdateContractExtension = () => {

    }
    
  return (
    <>
        {loading ? <Loading /> : 
            <ContainerStyled>
            <div>
                <div>
                    <span>
                        <h5>S??? h???p ?????ng:</h5>
                        <p>{contract.contractID}</p>
                    </span>
                    <span>
                        <h5>T??n h???p ?????ng:</h5>
                        <p>{contract.contractName}</p>
                    </span>
                    <span>
                        <h5>Ng??y hi???u l???c:</h5>
                        <p>{contract.startDay}</p>
                    </span>
                    <span>
                        <h5>Ng??y h???t h???n:</h5>
                        <p>{contract.date}</p>
                    </span>
                    <span>
                        <h5>T??nh tr???ng:</h5>
                        <p>{statusobj[contract.status]}</p>
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
                    <h4 style={{color: '#FFAC69'}}>M???c nhu???n b??t</h4>
                    <span>
                        <h5>Quy???n t??c gi???:</h5>
                        <p>0%</p>
                    </span>
                    <span>
                        <h5>Quy???n li??n quan:</h5>
                    </span>
                    <span>
                        <p>Quy???n c???a ng?????i bi???u di???n:</p>
                        <p>50%</p>
                    </span>
                    <span>
                        <p>Quy???n c???a nh?? s???n xu???t:</p>
                        <p>50%</p>
                    </span>
                </div>
            </div>
            <div>
                <div className='authorized'>
                    <h4 style={{color: '#FFAC69', marginTop: -30}}>Th??ng tin ph??p nh??n u??? quy???n</h4>
                    <span>
                        <h5>Ph??p nh??n u??? quy???n:</h5>
                        <p>{contract.authorizedPerson === 'person' ? 'C?? nh??n' : 'T??? ch???c'}</p>
                    </span>
                    <span>
                        <h5>T??n ng?????i u??? quy???n:</h5>
                        <p>{contract.fullName}</p>
                    </span>
                    <span>
                        <h5>Ng??y sinh:</h5>
                        <p>{contract.birthDay}</p>
                    </span>
                    <span>
                        <h5>Gi???i t??nh:</h5>
                        <p>{contract.sex ? 'Nam' : 'N???'}</p>
                    </span>
                    <span>
                        <h5>Qu???c t???ch:</h5>
                        <p>{contract.nationality}</p>
                    </span>
                    <span>
                        <h5>S??? ??i???n tho???i:</h5>
                        <p>{contract.numberPhone}</p>
                    </span>
                </div>
                <div>
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
                        <h5>Email:</h5>
                        <p>{contract.email}</p>
                    </span>
                    <span>
                        <h5>T??i kho???n:</h5>
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
                title="H???y h???p ?????ng ???y quy???n"
                openModal={openModalCancelContract} 
                handleOk={handleOk} 
                handleCancel={handleCancel} 
                content={<textarea onChange={(e) => setCancelReason(e.target.value)} placeholder='Cho ch??ng t??i bi???t l?? do b???n mu???n hu??? h???p ?????ng u??? quy???n n??y...'></textarea>} 
            />
            <ModalStyled
                title="Gia h???n u??? quy???n t??c ph???m"
                open={openModalContractExtension} 
                onOk={handleClickUpdateContractExtension} 
                onCancel={handleCancel} 
            >
                <div className='contentModal'>
                    <div>
                        <div>
                            <h5>Th???i gian gia h???n<i>*</i></h5>
                            <p>T??? ng??y: 02/08/2021</p>
                            <div className='date'>
                                <p>?????n ng??y:</p> 
                                <InputDate width={120} name="date" onChange={() => {}} />
                            </div>
                            <p style={{fontSize: 12, color: '#FFD0AB'}}>L??u ??: Th???i gian b???t ?????u gia h???n h???p ?????ng m???i ???????c t??nh sau ng??y h???t h???n h???p ?????ng c?? m???t ng??y.</p>
                        </div>
                        <div className='upload'>
                            <h5 className='h5-special'>????nh k??m t???p:</h5>
                            <div style={{display: 'block'}}>
                                <Upload>
                                    <Button heightProps={35} widthProps={120} type='primary' contentProps='Upload' icon={<UploadOutlined />} />
                                </Upload>
                                <p>hetthuongcannho.doc</p>
                                <p>hetthuongcannho.doc</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h5>M???c nhu???n b??t<i>*</i></h5>
                        <div className='royalties'>
                            <Checkbox onChange={() => {}}>
                                <p>Quy???n t??c gi??? </p>
                            </Checkbox>
                            <Input 
                                type='text' 
                                width={70} 
                                height={28} 
                                name="contractName" 
                            /><p>%</p>
                        </div>
                        <div>
                            <Checkbox onChange={() => {}}>
                                <p>Quy???n li??n quan: </p>
                            </Checkbox>
                            <div className='checkbox-child'>
                               <div className='royalties'>
                                    <Checkbox onChange={() => {}}>
                                        <p>Quy???n c???a ng?????i bi???u di???n</p>
                                    </Checkbox>
                                    <Input 
                                        type='text' 
                                        width={70} 
                                        height={28} 
                                        name="contractName" 
                                    /> <p>%</p>
                               </div>
                               <div className='royalties'>
                                    <Checkbox onChange={() => {}}>
                                        <p>Quy???n c???a nh?? s???n xu???t</p>
                                    </Checkbox>
                                    <Input 
                                        type='text' 
                                        width={70} 
                                        height={28} 
                                        name="contractName" 
                                    /> <p>%</p>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalStyled>
        </ContainerStyled>
        }
    </>
  )
}

export default InforContractTab