import React from 'react'
import InputSearch from '../../../components/InputSearch';
import TabControl from '../../../components/TabControl';
import root from '../setting.module.scss'
import TabIndex1 from './components/TabIndex1';
import TabIndex2 from './components/TabIndex2';


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
            component: TabIndex1,
          },
          {
            id: 2,
            component: TabIndex2,
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