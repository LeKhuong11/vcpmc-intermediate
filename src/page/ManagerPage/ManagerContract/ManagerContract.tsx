
import React from 'react'
import root from '../manager.module.scss'
import FeatureInPage from '../../../components/FeatureInPage';
import { MdAdd } from 'react-icons/md';
import TabControl from '../../../components/TabControl';
import TabIndex1 from './components/TabIndex1';
import TabIndex2 from './components/TabIndex2';




function ManagerContract() {

  const featureProp = [
    {
      icon: MdAdd,
      text: 'Thêm hợp đồng'
    }
  ]

 
  const tabControlItems = {
    buttons: [
      {
        id: 1,
        text: 'Hợp đồng ủy quyền',
      },
      {
        id: 2,
        text: 'Hợp đồng khai thác'
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
    <div className={root.managerContract}>
        <h3>Danh sách hợp đồng</h3>
        <div>
            <TabControl buttons={tabControlItems.buttons} items={tabControlItems.items} />
        </div>
        <FeatureInPage featureProps={featureProp} />
    </div>
  )
}

export default ManagerContract