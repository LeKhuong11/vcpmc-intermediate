import { Avatar } from 'antd'
import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import Button from '../../../components/Button'
import FeatureInPage from '../../../components/FeatureInPage'
import Input from '../../../components/Input'
import { useAppSelector } from '../../../redux/store'
import root from '../store.module.scss'


function UpdateInformationPage() {
    const { id } = useParams();
    const storeMusics = useAppSelector(state => state.storeMusic.store); 

    const music = storeMusics.filter(item => {
        return item.id === id
    })

    
    const featureProps = [
        {
            icon: FaTimes,
            text: 'Xóa bản ghi'
        }
    ]
  return (
    <div className={root.UpdateInformation}>
        <div>
            <h3>Ban ghi - Mat em</h3>
        </div>
        <div className={root.container}>
            <div className={root.info}>
                <div>
                    <h4>Thông tin bản ghi</h4>
                    <Avatar style={{fontSize: 25}} size={130}>T</Avatar>
                    <div>
                        <h5>Ngày thêm:</h5>
                        <p>07/04/2021 - 17:45:30</p>
                    </div>
                    <div>
                        <h5>Người tải lên:</h5>
                        <p>Super Admin</p>
                    </div>
                    <div>
                        <h5>Người duyệt:</h5>
                        <p>Hệ thống</p>
                    </div>
                    <div>
                        <h5>Ngày phê duyệt:</h5>
                        <p>07/04/2021 - 17:45:50</p>
                    </div>
                </div>
                <div>
                    <h4>Thông tin ủy quyền</h4>
                    <div>
                        <h5>Số hợp đồng:</h5>
                        <p>BH123</p>
                    </div>
                    <div>
                        <h5>Ngày nhận ủy quyền:</h5>
                        <p>01/05/2021</p>
                    </div>
                    <div>
                        <h5>Ngày hết hạn:</h5>
                        <p>01/08/2025</p>
                    </div>
                    <div>
                        <h5>Trạng thái:</h5>
                        <p>Còn thời hạn</p>
                    </div>
                </div>
            </div>
            <div className={root.updateInfo}>
                <h4>Chỉnh sửa thông tin</h4>
                <form action="">
                    <label htmlFor="">Tên bản ghi:</label> <br />
                    <Input type='text' width={410} height={32} /> <br />
                    <label htmlFor="">Mã ISRC:</label> <br />
                    <Input type='text' width={410} height={32}/> <br />
                    <label htmlFor="">Ca sĩ:</label> <br />
                    <Input type='text' width={410} height={32}/> <br />
                    <label htmlFor="">Tác giả:</label> <br />
                    <Input type='text' width={410} height={32}/> <br />
                    <label htmlFor="">Nhà sản xuất:</label> <br />
                    <Input type='text' width={410} height={32}/> <br />
                    <label htmlFor="">Thể loại:</label> <br />
                    <Input type='text' width={410} height={32}/> <br />
                    
                </form>
            </div>
            
        </div>
        <div className={root.button}>
            <Button type='primary' heightProps={38} widthProps={148} contentProps="Hủy" />
            <Button type='secondary' heightProps={38} widthProps={148} contentProps="Lưu"/>
        </div>
        <FeatureInPage featureProps={featureProps} />
    </div>
  )
}

export default UpdateInformationPage