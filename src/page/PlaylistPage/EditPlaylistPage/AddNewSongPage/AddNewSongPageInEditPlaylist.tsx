import { MenuProps, message, Modal } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import Button from '../../../../components/Button'
import DropDown from '../../../../components/DropDown'
import InputSearch from '../../../../components/InputSearch'
import CustomTable from '../../../../components/Table'
import { cancelTempPlaylist, tempPlaylist } from '../../../../redux/slice/playlistSlice'
import { DataTypeStoreMusic } from '../../../../redux/slice/storeSlice'
import { useAppDispatch, useAppSelector } from '../../../../redux/store'
import root from '../../playlist.module.scss'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../firebase/configfb'
import { updateDocConfig } from '../../../../hooks/updateDoc'

function AddNewSongInEditPlaylistPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { store } = useAppSelector(state => state.storeMusic)
  const { tempStoreMusicAddToPlaylist } = useAppSelector(state => state.playlist) 
  const [ listSong, setListSong ] = React.useState<DataTypeStoreMusic[]>(tempStoreMusicAddToPlaylist)
  const [ storePlaylist, setStorePlaylist ] = React.useState<DataTypeStoreMusic[]>(store)
  const [ playlist, setPlaylist ] = useState<any>({})


  useEffect(() => {
    const getData = async () => {
        const docRef = doc(db, "play-list", `${id}`);
        try {
            //get a document follow uid
            await getDoc(docRef)            
            .then((res) => {
                setPlaylist(res.data())
            })
            
        } catch(err) {
            console.log(err);
        }
    }
    getData()
}, [])

  const handleClickAddSongToPlaylist = (id: string) => {
      //remove item added to new playlist
      const newStoreMusicThenRemoveItem = storePlaylist.filter(item => item.id !== id);

      if(tempStoreMusicAddToPlaylist.length) {
        //check if the item is already in the new array
        const checkItem = listSong.filter(item => {
          return item.id.includes(id);
        });
        
        if(checkItem.length){
          message.warning("B???n ghi ???? c?? trong danh s??ch!")
          return
        }
      }

      //get item on list store music follow id in URL
      const addSongToNewPlaylist = store.filter(item =>  item.id === id);
      setListSong(prev => [
        ...prev,
        addSongToNewPlaylist[0]
      ]);
      setStorePlaylist(newStoreMusicThenRemoveItem)
  }
  

  const handleClickRemoveSongFromNewPlaylist = (id: string) => {
    
    const newListSong = listSong.filter(item => {
      return item.id !== id
    })
      setListSong(newListSong);

    if(storePlaylist.length) {
      //check item in storeMusic has or not
      const checkItem = storePlaylist.filter(item => {
        return item.id.includes(id);
      });
      
      if(checkItem.length)
        return
    } 
    //get a song removed in list song add to storeMusic
    const song = store.filter(item => item.id === id)

    setStorePlaylist(prev => [
      ...prev,
      song[0]
    ])
  }

  //area cancel and save new list songs
  const handleClickCancel = () => {
    if(tempStoreMusicAddToPlaylist.length) {
      Modal.confirm({
        icon: <ExclamationCircleOutlined />,
        content: 'B???n ch??a l??u thay ?????i!',
        onOk() {
          dispatch(cancelTempPlaylist());
          navigate(`../play-list/detail/${id}/edit`)
        },
      });
      return
    }
    navigate(`../play-list/detail/${id}/edit`)
  }

  const handleClickSaveListSongsToPlaylist = async () => {
    const params = {
      documentName: 'play-list',
      id: id,
      data: {
        idSong: listSong
      }
    }
    const update = await updateDocConfig(params);
    if(update) {
      navigate(`../play-list/detail/${id}/edit`)
      dispatch(tempPlaylist(listSong))
      return
    } 
    message.error("S???a playlist th???t b???i")            
  }
  

  //area handle table storeMusic 
  const columns: ColumnsType<DataTypeStoreMusic> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (_, {}, index) => {

        return <p>{index + 1}</p>
      }
    },
    {
      title: 'T??n b???n ghi',
      dataIndex: 'nameMusic',
      key: 'nameMusic'
    },
    {
      title: 'Ca s??',
      dataIndex: 'singer',
      key: 'singer'
    },
    {
      title: 'T??c gi???',
      dataIndex: 'author',
      key: 'author'
    },
    {
      title: '',
      dataIndex: 'listen',
      key: 'listen',
      render: (_, ) => {

        return <a>Nghe</a>
      }
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      render: (_, { id }) => {

        return <a href='#' onClick={() => handleClickAddSongToPlaylist(`${id}`)}>Th??m</a>
      }
    }
  ]
  const dataSource: DataTypeStoreMusic[] = storePlaylist


  //handle new Playlist 
  const columnsTableNewPlaylist: ColumnsType<DataTypeStoreMusic> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (_, {}, index) => {

        return <p>{index + 1}</p>
      }
    },
    {
      title: 'T??n b???n ghi',
      dataIndex: 'nameMusic',
      key: 'nameMusic'
    },
    {
      title: 'Ca s??',
      dataIndex: 'singer',
      key: 'singer'
    },
    {
      title: 'T??c gi???',
      dataIndex: 'author',
      key: 'author'
    },
    {
      title: '',
      dataIndex: 'listen',
      key: 'listen',
      render: (_, ) => {

        return <a>Nghe</a>
      }
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      render: (_, { id }) => {

        return <a href='#' onClick={() => handleClickRemoveSongFromNewPlaylist(id)}>G???</a>
      }
    }
  ] 
  const dataSourceNewPlaylist: DataTypeStoreMusic[] = listSong


  //area handle dropdown
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };
  const items: MenuProps['items'] = [
    {
      label: '1st menu item',
      key: '1'
    },
    {
      label: '2nd menu item',
      key: '2'
    },
    {
      label: '3rd menu item',
      key: '3',
    },
    {
      label: '4rd menu item',
      key: '4',
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  
  return (
    <div className={root.addNewSong}>
      
      <div>
        <h3>Th??m b???n ghi</h3>
      </div>
      <div className={root.container}>
          <div  className={root.storeMusic}>
            <h4>Kho b???n ghi</h4>
            <div className={root.dropdown}>
              <div>
                <p>Th??? lo???i </p>
                <DropDown menuProps={menuProps} orange />
              </div>
              <div>
                <p>Playlist m???u </p>
                <DropDown menuProps={menuProps} orange />
              </div>
            </div>
            <form>
              <InputSearch placehoder='T??n b???n ghi, ca s??...' />
            </form>
            <div className={root.table}>
              <CustomTable 
                pagination={{pageSize: 6}} 
                columns={columns} 
                dataSrouce={dataSource} 
                heightProps={48} 
                widthProps={97}
              />
            </div>
          </div>
          <div className={root.newListSong}>
              <h4>Danh s??ch b???n ghi ???????c th??m v??o Playlist</h4>
              <div className={root.numberOfSongandTime}>
                <div>
                  <h5>T???ng s???:</h5> 
                  <p>{listSong.length} b???n ghi</p>
                </div>
                <div>
                  <h5>T???ng th???i l?????ng:</h5> 
                  <p>--:--:--</p>
                </div>
              </div>
              <form>
                <InputSearch placehoder='T??n b???n ghi, ca s??...' />
              </form>
              <div className={root.table}>
                <CustomTable 
                  columns={columnsTableNewPlaylist} 
                  dataSrouce={dataSourceNewPlaylist} 
                  heightProps={48} 
                  pagination={{pageSize: 6}}
                />
              </div>
          </div>
      </div>
      <div className={root.btn}>
            <Button 
              type='primary' 
              heightProps={38} 
              widthProps={148} 
              contentProps="H???y" 
              onClick={handleClickCancel} 
            />
            <Button 
              type='secondary' 
              heightProps={38} 
              widthProps={148} 
              contentProps="L??u" 
              onClick={handleClickSaveListSongsToPlaylist}
            />
          </div>
    </div>
  )
}

export default AddNewSongInEditPlaylistPage