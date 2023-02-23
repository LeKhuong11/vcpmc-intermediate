import { message } from 'antd'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { RxDotFilled } from 'react-icons/rx'
import { SlNote } from 'react-icons/sl'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { db } from '../../../../../firebase/configfb'
import { updateDocConfig } from '../../../../../hooks/useUpdateDoc'
import Loading from '../../../../../components/Loading'
import FeatureInPage from '../../../../../components/FeatureInPage'
import CustomModal from '../../../../../components/Modal'
import Breadcrumbs from '../../../../../components/Breadcrumbs'


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
            message.warning("Hợp đồng đã được hủy")
            return
        }
        setOpenModalCancelContract(true)
    }   
    
    const featureInPage = [
        {
            icon: SlNote,
            text: 'Chỉnh sửa',
            event: () => navigate('edit')
            
        },
        {
            icon: FaTimes,
            text: 'Hủy hợp đồng',
            event: handleClickSetOpenModalCancelContract
        },
    ]

    const statusobj: any = {
        new: <p><RxDotFilled color="green" />Mới</p>,
        active: <p><RxDotFilled color="blue" />Còn thời hạn</p>,
        expired: <p><RxDotFilled color="gray" />Đã hết hạn</p>,
        canceled: <p><RxDotFilled color="red" />Đã hủy</p>
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
            message.success("Hủy hợp đồng thành công")
            return
        }
        message.success("Hủy hợp đồng thất bại")
    };
    
    const handleCancel = () => {
        setOpenModalCancelContract(false);
    };

    const breadcrumb = [
        {
          key: 1,
          path: '',
          namePage: 'Quản lý'
        },
        {
          key: 2,
          path: '../contract',
          namePage: 'Quản lý hợp đồng'
        },
        {
          key: 3,
          path: '',
          namePage: 'Chi tiết'
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
                    <h3>Hợp đồng khai thác - HD123 </h3>
                </div>
                <ContentStyled>
                    <div>
                        <div>
                            <span>
                                <h5>Tên hợp đồng:</h5>
                                <p>{contract.contractName}</p>
                            </span>
                            <span>
                                <h5>Số hợp đồng:</h5>
                                <p>{contract.contractID}</p>
                            </span>
                            
                            <span>
                                <h5>Ngày hiệu lực:</h5>
                                <p>{contract.startDay}</p>
                            </span>
                            <span>
                                <h5>Ngày hết hạn:</h5>
                                <p>{contract.date}</p>
                            </span>
                        </div>
                        <div>
                            <span>
                                <h5>Đính kèm tệp:</h5>
                                <div style={{display: 'block'}}>
                                    <p>hetthuongcannho.doc</p>
                                    <p>hetthuongcannho.doc</p>
                                </div>
                            </span>                
                        </div>
                        <div>
                            <span>
                                <h5>Loại hợp đồng:</h5>
                                <p>Trọn gói</p>
                            </span>
                            <span>
                                <h5>Giá trị hợp đồng (VNĐ):</h5>
                                <p>365.000.000</p>
                            </span>
                            <span>
                                <h5>Giá trị phân phối (VNĐ/ngày):</h5>
                                <p>1.000.000</p>
                            </span>
                            <span>
                                <h5>Tình trạng:</h5>
                                <p>{statusobj[contract.status]}</p>
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className='authorized'>
                            <span>
                                <h5>Tên đơn vị sử dụng:</h5>
                                <p>Công ty TNHH MTV  Âu Lạc</p>
                            </span>
                            <span>
                                <h5>Người đại diện:</h5>
                                <p>{contract.fullName}</p>
                            </span>
                            <span>
                                <h5>Chức vụ:</h5>
                                <p>Giám đốc</p>
                            </span>
                            <span>
                                <h5>Ngày sinh:</h5>
                                <p>{contract.birthDay}</p>
                            </span>
                            <span>
                                <h5>Quốc tịch:</h5>
                                <p>{contract.nationality}</p>
                            </span>
                            <span>
                                <h5>Số điện thoại:</h5>
                                <p>{contract.numberPhone}</p>
                            </span>
                            <span> 
                                <h5>Email:</h5>
                                <p>{contract.email}</p>
                            </span>
                        </div>
                        <div>
                            <span>
                                <h5>Giới tính:</h5>
                                <p>{contract.sex ? 'Nam' : 'Nữ'}</p>
                            </span>
                            <span>
                                <h5>Số CMND/ CCCD:</h5>
                                <p>{contract.personID}</p>
                            </span>
                            <span>
                                <h5>Ngày cấp:</h5>
                                <p>{contract.dateOfIssue}</p>
                            </span>
                            <span>
                                <h5>Nơi cấp:</h5>
                                <p>{contract.place}</p>
                            </span>
                            <span>
                                <h5>Mã số thuế:</h5>
                                <p>{contract.taxID}</p>
                            </span>
                            <span>
                                <h5>Nơi cư trú:</h5>
                                <p>{contract.address}</p>
                            </span>
                        </div>
                        <div>   
                            
                            <span>
                                <h5>Tên đăng nhập:</h5>
                                <p>{contract.userName}</p>
                            </span>
                            <span>
                                <h5>Mật khẩu:</h5>
                                <p>{contract.pasword}</p>
                            </span>
                            <span>
                                <h5>Số tài khoản:</h5>
                                <p>{contract.accountNumber}</p>
                            </span>
                            <span>
                                <h5>Ngân hàng:</h5>
                                <p>{contract.bank}</p>
                            </span>
                        </div>
                    </div>
                    <FeatureInPage featureProps={featureInPage} />
                    <CustomModal 
                        title="Hủy hợp đồng khai thác"
                        openModal={openModalCancelContract} 
                        handleOk={handleOk} 
                        handleCancel={handleCancel} 
                        content={<textarea onChange={(e) => setCancelReason(e.target.value)} placeholder='Cho chúng tôi biết lý do bạn muốn huỷ hợp đồng uỷ quyền này...'></textarea>} 
                    />
                </ContentStyled>
            </ContainerStyled>
        }
    </>
  )
}

export default DetailMiningContract