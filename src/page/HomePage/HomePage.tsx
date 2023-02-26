import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router';
import Sidebar from '../../layout/Sidebar';
import styled from 'styled-components';
import Avatar from 'antd/es/avatar';
import Typography from 'antd/es/typography';
import { MenuProps, message } from 'antd';
import DropDown from '../../components/DropDown';
import root from './home.module.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { auth } from '../../firebase/configfb';
import { fetchUser } from '../../redux/slice/userSlice';

const TypographyStyled = styled(Typography.Text)`
&&& {
  :where(.css-dev-only-do-not-override-1n7nwfa).ant-typography {
    color: #fff;
  }
}
`

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [ user, setUser ] = React.useState(false);

  //authenticaton current user 
  //if don't user redirect to login
  useEffect(()=> {
    const unSub = auth.onAuthStateChanged((currentUser) => {
        if(currentUser) {
          const { uid } = currentUser;
          dispatch(fetchUser({uid: uid}))
          setUser(true)
          return
        }
        navigate('login')        
    })

    //cleanup function
    return () => {
        unSub();
    }
}, [navigate])

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
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

  useEffect(() => {
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
          <div>
            <Link to="dashboard">
              <Avatar style={{ backgroundColor: '#f56a00', marginRight: 5 }}>T</Avatar>
              <TypographyStyled>Tuyết Nguyễn</TypographyStyled>
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