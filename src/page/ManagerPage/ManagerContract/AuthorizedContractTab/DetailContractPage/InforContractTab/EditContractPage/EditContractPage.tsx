import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Breadcrumbs from '../../../../../../../components/Breadcrumbs'
import CustomDatePicker from '../../../../../../../components/DatePicker'
import Input from '../../../../../../../components/Input'
import dayjs from 'dayjs';
import { Radio, RadioChangeEvent, Upload, UploadProps } from 'antd'
import Button from '../../../../../../../components/Button'
import { UploadOutlined } from '@ant-design/icons';


const ContainerStyled = styled.div`
    width: 96%;
    position: fixed;
    left: 45px;

    & .content {
        overflow: scroll;
        &>div {
            display: flex;
            justify-content: space-between;
            width: 90%;
        }
       
        & h4 {
            color: #FFAC69;
        }

        & span {
           display: flex;
           margin: 10px;
           & h5 {
            display: flex;
            align-items: center;
            min-width: 130px;
           }
            & p {
               padding-right: 10px;
            }

            & .h5-special {
                display: flex;
                align-items: center;
                height: 58px;
            }
            }
        }
    }
`

const props: UploadProps = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
    defaultFileList: [
      
    ],
  };

function EditContractPage() {
    const { id } = useParams()
    const [radio, setRadio] = React.useState(1);
    const breadcrumb = [
        {
          key: 1,
          path: '',
          namePage: 'Quản lý'
        },
        {
          key: 2,
          path: '../../manager/contract',
          namePage: 'Quản lý hợp đồng'
        },
        {
          key: 3,
          path: `../contract/detail/${id}`,
          namePage: 'Chi tiết'
        },
        {
            key: 4,
            path: '',
            namePage: 'Chỉnh sửa thông tin'
        },
      ]

      const onChangeRadio = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setRadio(e.target.value);
      };

  return (
    <ContainerStyled>
        <div>
            <Breadcrumbs crumbs={breadcrumb} />
        </div>
        <div>
            <h3>Hợp đồng uỷ quyền bài hát - BH123</h3>
        </div>
        <div className='content'>
            <div>
                <div>
                    <span>
                        <h5>Số hợp đồng:</h5>
                        <Input type='text' width={220} height={35} value={'1421566747'}  />
                    </span>
                    <span>
                        <h5>Tên hợp đồng:</h5>
                        <Input type='text' width={220} height={35} value={'Hợp đồng uỷ quyền tác phẩm âm nhạc'} />
                    </span>
                    <span>
                        <h5>Ngày hiệu lực:</h5>
                        <CustomDatePicker  type='mondath' defaultValue={dayjs('01/05/2021', 'DD/MM/YYYY')}  />
                    </span>
                    <span>
                        <h5>Ngày hết hạn:</h5>
                        <CustomDatePicker  type='mondath' defaultValue={dayjs('01/12/2021', 'DD/MM/YYYY')}  />
                    </span>
                    <span>
                        <h5>Tình trạng:</h5>
                        <Input type='text' width={220} height={35} value={'Đang hiệu lực'}  />
                    </span>
                </div>
                <div>
                    <span>
                        <h5 className='h5-special'>Đính kèm tệp:</h5>
                        <div style={{display: 'block'}}>
                            <Upload {...props}>
                                <Button heightProps={35} widthProps={120} type='primary' contentProps='Upload' icon={<UploadOutlined />} />
                            </Upload>
                            <p>hetthuongcannho.doc</p>
                            <p>hetthuongcannho.doc</p>
                        </div>
                    </span>      
                </div>
                <div>
                    <h4 style={{color: '#FFAC69'}}>Mức nhuận bút</h4>
                    <span>
                        <h5>Quyền tác giả:</h5>
                        <p>0%</p>
                    </span>
                    <span>
                        <h5>Quyền liên quan:</h5>
                    </span>
                    <span>
                        <p>Quyền của người biểu diễn:</p>
                        <p>50%</p>
                    </span>
                    <span>
                        <p>Quyền của nhà sản xuất:</p>
                        <p>50%</p>
                    </span>
                </div>
            </div>
            <div>
                {/* <h4>Thông tin pháp nhân uỷ quyền</h4> */}
                <div>
                    <span>
                        <h5>Pháp nhân ủy quyền:</h5>
                        <Radio.Group onChange={onChangeRadio} value={radio}>
                            <Radio value={1}>Cá nhân</Radio>
                            <Radio value={2}>Tổ chức</Radio>
                        </Radio.Group>
                    </span>
                    <span>
                        <h5>Tên người uỷ quyền::*</h5>
                        <Input type='text' width={220} height={35} value={'Nguyễn Văn A'}  />
                    </span>
                    <span>
                        <h5>Ngày sinh:*</h5>
                        <CustomDatePicker  type='month' defaultValue={dayjs('10/01/1984', 'DD/MM/YYYY')}  />
                    </span>
                    <span>
                        <h5>Giới tính:*</h5>
                        <Radio.Group onChange={onChangeRadio} value={radio}>
                            <Radio value={1}>Nam</Radio>
                            <Radio value={2}>Nữ</Radio>
                        </Radio.Group>
                    </span>
                    <span>
                        <h5>Quốc tịch:*</h5>
                        <p>Việt Nam</p>
                    </span>
                    <span>
                        <h5>Số điện thoại:*</h5>
                        <p>(+84) 345 678 901</p>
                    </span>
                </div>
                <div>
                    <span>
                        <h5>CMND/ CCCD:</h5>
                        <Input type='number' width={220} height={35} value={123456789012}  />  
                    </span>
                    <span>
                        <h5>Ngày cấp:</h5>
                        <CustomDatePicker  type='month' defaultValue={dayjs('10/01/2011', 'DD/MM/YYYY')}  />
                    </span>
                    <span>
                        <h5>Nơi cấp:</h5>
                        <Input type='text' width={220} height={35} value={'Tp.HCM, Việt Nam'}  />
                    </span>
                    <span>
                        <h5>Mã số thuế:</h5>
                        <Input type='number' width={220} height={35} value={92387489}  />
                    </span>
                    <span>
                        <h5>Nơi cư trú:</h5>
                        <textarea value='69/53, Nguyễn Gia Trí, phường 25, quận Bình Thạnh, thành phố Hồ Chí Minh' />
                    </span>
                </div>
                <div>
                    <span>
                        <h5>Email:</h5>
                        <Input type='text' width={220} height={35} value={'nguyenvana@gmail.com'}  />
                    </span>
                    <span>
                        <h5>Tên đăng nhập:</h5>
                        <Input type='text' width={220} height={35} value={'nguyenvana@gmail.com'}  />
                    </span>
                    <span>
                        <h5>Mật khẩu:</h5>
                        <Input type='password' width={220} height={35} value={1234564}  />
                    </span>
                    <span>
                        <h5>Số tài khoản:</h5>
                        <Input type='text' width={220} height={35} value={'1231123312211223'}  />
                    </span>
                    <span>
                        <h5>Ngân hàng:</h5>
                        <Input type='text' width={220} height={35} value={'ACB - Ngân hàng Á Châu'}  />
                    </span>
                </div>
            </div>
            <Button type='primary' heightProps={38} widthProps={148} contentProps="Hủy" />
            <Button type='secondary' heightProps={38} widthProps={148} contentProps="Lưu"/>
        </div>
    </ContainerStyled>
  )
}
 
export default EditContractPage