import { Checkbox } from 'antd'
import React from 'react'
import { SlNote } from 'react-icons/sl'
import { useNavigate } from 'react-router-dom'
import { DataTypeStoreMusic } from '../../../redux/slice/storeSlice'
import { useAppSelector } from '../../../redux/store'
import root from '../store.module.scss'
const Image = require('../../../image/picture.png')


interface ISong {
    song: DataTypeStoreMusic
    displayRowSelection: boolean
}

function Card({ song, displayRowSelection = false }: ISong) {
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.user)
  const handleClickToEditSong = (id: string) => {
    navigate(`update-infomation/${id}`)
  }
  return (
    <div className={root.card}>
                  <div className={root.img}>
                    <img src={Image} alt="" /> 
                  </div>
                  <div className={root.infoSong}>
                    <div className={root.info}>
                      <h4>{song.nameMusic}</h4>
                      <div>
                        <span>
                          <h5>Ca sĩ:</h5>
                          <p>{song.singer}</p>
                        </span>
                        <span>
                          <h5>Sáng tác:</h5>
                          <p>{song.author}</p>
                        </span>
                        <span>
                          <h5>Số hợp đồng:</h5>
                          <p>{song.IRCID}</p>
                        </span>
                      </div>
                      <div className={root.type}>
                        <div>
                          <p>Thể loại</p>
                          <h5>{song.type}</h5>
                        </div>
                        <div>
                          <p>Định dạng</p>
                          <h5>{song.format}</h5>
                        </div>
                        <div>
                          <p>Thời lượng</p>
                          <h5>{song.time}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  {user.isAdmin && <div className={root.edit}>
                    {displayRowSelection ? 
                      <Checkbox /> : 
                      <span onClick={() => handleClickToEditSong(song.id)}>
                        <SlNote color='#FF7506' />
                      </span>  
                    }
                  </div>}
                  
                </div>
  )
}

export default Card