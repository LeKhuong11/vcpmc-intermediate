import React from 'react'
import { Avatar, message, Upload, UploadFile } from 'antd'
import { FaTimes } from 'react-icons/fa'
import { RxDotFilled } from 'react-icons/rx'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../../components/Button'
import FeatureInPage from '../../../components/FeatureInPage'
import Input from '../../../components/Input'
import { useAppSelector } from '../../../redux/store'
import root from '../store.module.scss'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../firebase/configfb'
import { updateDocConfig } from '../../../hooks/updateDoc'


function UpdateInformationPage() {
    const { id } = useParams();
    const storeMusics = useAppSelector(state => state.storeMusic.store); 

    //filter song follow id get from URL
    //current, music is an array
    const music = storeMusics.filter(item => {
        return item.id === id
    })

    const navigate = useNavigate();

    const [ updateSong, setUpdateSong ] = React.useState({
        //initialState = song(id)
        key: music[0].key,
        nameMusic: music[0].nameMusic,
        IRCID: music[0].IRCID,
        time: music[0].time,
        singer: music[0].singer,
        author: music[0].author,
        type: music[0].type,
        format: music[0].format,
        status: music[0].status,
    })


    const handleClickRemoveSong = async () => {
        try {
            await deleteDoc(doc(db, "store-music", `${id}`));
            navigate('../../store');
            message.success("Xóa thành công")
        } catch(err) {
            message.error("Xóa thất bại")            
        }
    }

    const featureProps = [
        {
            icon: FaTimes,
            text: 'Xóa bản ghi',
            event: handleClickRemoveSong
        }
    ]

    const handleChangeUpdateSong = (e: any): void => {
        const name: string = e.name;
        const value: string = e.value;

        setUpdateSong(prev => {
            return {
                ...updateSong,
                [name]: value
            }
        })
    }

    const handleClickUpdateSong = async () => {
        const params = {
            documentName: 'store-music',
            id: id,
            data: updateSong
          }
          const update = await updateDocConfig(params);
          if(update) {
            navigate('../../store');
            message.success("Chỉnh sửa thành công")
            return
          } 
          message.error("Chỉnh sửa thất bại")
    }


    const handleInputAvt = () => {
        
    }

    //Click cancel update form
    const handleClickCancelUpdate = () => {
        navigate('../../store')
    }
  return (
    <div className={root.UpdateInformation}>
        <div>
            <h3>Bản ghi - {music[0].nameMusic}</h3>
        </div>
        <div className={root.container}>
            <div className={root.info}>
                <div>
                    <h4>Thông tin bản ghi</h4>
                    <Avatar style={{fontSize: 25}} size={130}>
                        <Upload 
                            onChange={handleInputAvt}
                            action={"http://localhost:3000/"}
                        >
                            
                        </Upload>
                    </Avatar>
                    <div>
                        <h5>Ngày thêm:</h5>
                        <p>07/04/2021</p>
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
                        <p>07/04/2021</p>
                    </div>
                </div>
                <div>
                    <h4>Thông tin ủy quyền</h4>
                    <div>
                        <h5>Số hợp đồng:</h5>
                        <p>{music[0].IRCID}</p>
                    </div>
                    <div>
                        <h5>Ngày nhận ủy quyền:</h5>
                        <p>{music[0].dateCreated}</p>
                    </div>
                    <div>
                        <h5>Ngày hết hạn:</h5>
                        <p>{music[0].date}</p>
                    </div>
                    <div>
                        <h5>Trạng thái:</h5>
                        {music[0].status ? <p><RxDotFilled color="blue" />Còn thời hạn</p> : <p><RxDotFilled color="gray" />Hết thời hạn</p>}
                    </div>
                </div>
            </div>
            <div className={root.updateInfo}>
                <h4>Chỉnh sửa thông tin</h4>
                <form action="">
                    <label htmlFor="">Tên bản ghi:</label> <br />
                    <Input type='text' width={410} height={32} value={music[0].nameMusic} name="nameMusic" setValue={handleChangeUpdateSong} /> <br />
                    <label htmlFor="">Mã ISRC:</label> <br />
                    <Input type='text' width={410} height={32} value={music[0].IRCID} name="IRCID" setValue={handleChangeUpdateSong}/> <br />
                    <label htmlFor="">Ca sĩ:</label> <br />
                    <Input type='text' width={410} height={32} value={music[0].singer} name="singer" setValue={handleChangeUpdateSong}/> <br />
                    <label htmlFor="">Tác giả:</label> <br />
                    <Input type='text' width={410} height={32} value={music[0].author} name="author" setValue={handleChangeUpdateSong}/> <br />
                    <label htmlFor="">Nhà sản xuất:</label> <br />
                    <Input type='text' width={410} height={32} value={music[0].author}/> <br />
                    <label htmlFor="">Thể loại:</label> <br />
                    <Input type='text' width={410} height={32} value={music[0].type} name="type" setValue={handleChangeUpdateSong}/> <br />
                    
                </form>
            </div>
            
        </div>
        <div className={root.button}>
            <Button type='primary' heightProps={38} widthProps={148} contentProps="Hủy" onClick={handleClickCancelUpdate} />
            <Button type='secondary' heightProps={38} widthProps={148} contentProps="Lưu" onClick={handleClickUpdateSong}/>
        </div>
        <FeatureInPage featureProps={featureProps} />
    </div>
  )
}

export default UpdateInformationPage