import { useEffect } from 'react'
import Breadcrumbs from '../../../components/Breadcrumbs';
import TabControl from '../../../components/TabControl';
import { fetchUsers } from '../../../redux/slice/listUserSlice';
import { useAppDispatch } from '../../../redux/store';
import root from '../setting.module.scss'
import ListUserTab from './components/ListUserTab';
import RoleUserTab from './components/RoleUserTab';


function AuthenticationPage() {
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

    const tabControlItems = {
        buttons: [
          {
            id: 1,
            text: 'Danh sách người dùng',
          },
          {
            id: 2,
            text: 'Vai trò nguòi dùng'
          }
          
        ],
        items: [
          {
            id: 1,
            component: ListUserTab,
          },
          {
            id: 2,
            component: RoleUserTab,
          },
        ]
          
    
      }
      const breadcrumb = [
        {
            key: 1 ,
            path: '',
            namePage: 'Cài đặt' 
        },
        {
            key: 2,
            path: '',
            namePage: 'Phân quyền người dùng'
        },
      ]
    
  return (
    <div className={root.authentication}>
      <div>
        <Breadcrumbs crumbs={breadcrumb} />
      </div>
      <div>
      <h3>Danh sách người dùng</h3>
      </div>
      <div>
          <TabControl buttons={tabControlItems.buttons} items={tabControlItems.items} />
          {/* <InputSearch placehoder='Nhập tên người dùng' /> */}
      </div>
    </div>
  )
}

export default AuthenticationPage