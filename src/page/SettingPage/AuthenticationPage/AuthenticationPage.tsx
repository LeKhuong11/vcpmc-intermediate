import React from 'react'
import TabControl from '../../../components/TabControl';
import root from '../setting.module.scss'
import ListUserTab from './components/ListUserTab';
import RoleUserTab from './components/RoleUserTab';


function AuthenticationPage() {

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
    
  return (
    <div className={root.authentication}>
        <h3>Danh sách người dùng</h3>
        <div>
            <TabControl buttons={tabControlItems.buttons} items={tabControlItems.items} />
            {/* <InputSearch placehoder='Nhập tên người dùng' /> */}
        </div>
    </div>
  )
}

export default AuthenticationPage