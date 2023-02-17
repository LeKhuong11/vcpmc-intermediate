import { MenuProps, message, Modal } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../../components/Breadcrumbs'
import Button from '../../../components/Button'
import DropDown from '../../../components/DropDown'
import InputSearch from '../../../components/InputSearch'
import CustomTable from '../../../components/Table'
import { cancelTempPlaylist, tempPlaylist } from '../../../redux/slice/playlistSlice'
import { DataTypeStoreMusic } from '../../../redux/slice/storeSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import root from '../playlist.module.scss'
import { ExclamationCircleOutlined } from '@ant-design/icons';

function AddNewSongPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { store } = useAppSelector(state => state.storeMusic)
  const { tempStoreMusicAddToPlaylist } = useAppSelector(state => state.playlist) 
  const [ listSong, setListSong ] = React.useState<DataTypeStoreMusic[]>(tempStoreMusicAddToPlaylist)
  const [ storePlaylist, setStorePlaylist ] = React.useState<DataTypeStoreMusic[]>(store)


  const handleClickAddSongToPlaylist = (id: string) => {
      //remove item added to new playlist
      const newStoreMusicThenRemoveItem = storePlaylist.filter(item => item.id !== id);

      if(tempStoreMusicAddToPlaylist.length) {
        //check if the item is already in the new array
        const checkItem = listSong.filter(item => {
          return item.id.includes(id);
        });
        
        if(checkItem.length){
          message.warning("Bản ghi đã có trong danh sách!")
          return
        }
      }

      //choose item on list store music follow id 
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
        content: 'Bạn chưa lưu thay đổi!',
        onOk() {
          dispatch(cancelTempPlaylist());
          navigate('../play-list/add-new-playlist')
        },
      });
      return
    }
    navigate('../play-list/add-new-playlist')
  }

  const handleClickSaveListSongsToPlaylist = () => {
    dispatch(tempPlaylist(listSong))
    navigate('../play-list/add-new-playlist')
  }
  

  //area handle table storeMusic 
  const columns: ColumnsType<DataTypeStoreMusic> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (_, {key}) => {
        return <p>{key}</p>
      }
    },
    {
      title: 'Tên bản ghi',
      dataIndex: 'nameMusic',
      key: 'nameMusic'
    },
    {
      title: 'Ca sĩ',
      dataIndex: 'singer',
      key: 'singer'
    },
    {
      title: 'Tác giả',
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

        return <a href='#' onClick={() => handleClickAddSongToPlaylist(`${id}`)}>Thêm</a>
      }
    }
  ]
  const dataSource: DataTypeStoreMusic[] = storePlaylist


  //handle new Playlist 
  const columnsTableNewPlaylist: ColumnsType<DataTypeStoreMusic> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt'
    },
    {
      title: 'Tên bản ghi',
      dataIndex: 'nameMusic',
      key: 'nameMusic'
    },
    {
      title: 'Ca sĩ',
      dataIndex: 'singer',
      key: 'singer'
    },
    {
      title: 'Tác giả',
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

        return <a href='#' onClick={() => handleClickRemoveSongFromNewPlaylist(id)}>Gỡ</a>
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
      <Breadcrumbs />
      <div>
        <h3>Thêm bản ghi</h3>
      </div>
      <div className={root.container}>
          <div  className={root.storeMusic}>
            <h4>Kho bản ghi</h4>
            <div className={root.dropdown}>
              <div>
                <p>Thể loại </p>
                <DropDown menuProps={menuProps} orange />
              </div>
              <div>
                <p>Playlist mẫu </p>
                <DropDown menuProps={menuProps} orange />
              </div>
            </div>
            <form>
              <InputSearch placehoder='Tên bản ghi, ca sĩ...' />
            </form>
            <div className={root.table}>
              <CustomTable columns={columns} dataSrouce={dataSource} heightProps={48} />
            </div>
          </div>
          <div className={root.newListSong}>
              <h4>Danh sách bản ghi được thêm vào Playlist</h4>
              <div className={root.numberOfSongandTime}>
                <div>
                  <h5>Tổng số:</h5> 
                  <p>0 bản ghi</p>
                </div>
                <div>
                  <h5>Tổng thời lượng:</h5> 
                  <p>--:--:--</p>
                </div>
              </div>
              <form>
                <InputSearch placehoder='Tên bản ghi, ca sĩ...' />
              </form>
              <div className={root.table}>
                <CustomTable columns={columnsTableNewPlaylist} dataSrouce={dataSourceNewPlaylist} heightProps={48} />
              </div>
          </div>
      </div>
      <div className={root.btn}>
            <Button 
              type='primary' 
              heightProps={38} 
              widthProps={148} 
              contentProps="Hủy" 
              onClick={handleClickCancel} 
            />
            <Button 
              type='secondary' 
              heightProps={38} 
              widthProps={148} 
              contentProps="Lưu" 
              onClick={handleClickSaveListSongsToPlaylist}
            />
          </div>
    </div>
  )
}

export default AddNewSongPage