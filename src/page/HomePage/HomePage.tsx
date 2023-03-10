import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router';
import Sidebar from '../../layout/Sidebar';
import Avatar from 'antd/es/avatar';
import Typography from 'antd/es/typography';
import { MenuProps, message } from 'antd';
import DropDown from '../../components/DropDown';
import root from './home.module.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { auth } from '../../firebase/configfb';
import { fetchUser } from '../../redux/slice/userSlice';



function HomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user)
  const { pathname } = useLocation();
  
  //authenticaton current user 
  //if don't user redirect to login
  useEffect(()=> {
    const unSub = auth.onAuthStateChanged((currentUser) => {
        if(currentUser) {
          const { uid } = currentUser;
          dispatch(fetchUser({uid: uid}))
          return
        }
        navigate('login')        
    })

    //cleanup function
    return () => {
        unSub();
    }
}, [])

  // useEffect(() => {
  //   if(user === false) {
  //     navigate('login')
  //   }
  // }, [])

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };

  const items: MenuProps['items'] = [
    {
      label: 'Tiếng Việt',
      key: '1'
    },
    {
      label: 'Tiếng Anh',
      key: '2'
    },
    {
      label: 'Tiếng Nhật',
      key: '3',
    },
    {
      label: 'Tiếng Hàn',
      key: '4',
    },
  ];
  useEffect(() => {
    if(pathname === '/')
      navigate('store')
  }, [])
  

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  
  return (
    <>
      {user && <div className={root.home}>
        <Sidebar />
        <div className={root.homeContentMain}>
          <div className={root.homeHeader}>
              <DropDown menuProps={menuProps} />
            <div className={root.avatar}>
              <Link to="dashboard">
                <Avatar style={{ backgroundColor: '#f56a00', marginRight: 5 }}>{user.avatar ?? user?.lastName.charAt(0).toUpperCase()}</Avatar>
                <Typography style={{color: '#C8C8DB'}}>{user?.displayName}</Typography>
              </Link>
            </div>
          </div>
          <Outlet />
        </div>
      </div>}
    </>
  )
}

export default HomePage