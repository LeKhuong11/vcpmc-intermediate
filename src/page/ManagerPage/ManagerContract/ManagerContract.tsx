
import React, { useEffect } from 'react'
import root from '../manager.module.scss'
import FeatureInPage from '../../../components/FeatureInPage';
import { MdAdd } from 'react-icons/md';
import TabControl from '../../../components/TabControl';
import MiningContractTab from './MiningContractTab/MiningContractTab';
import AuthorizedContractTab from './AuthorizedContractTab/AuthorizedContractTab';
import { useAppDispatch} from '../../../redux/store';
import {  fetchContract } from '../../../redux/slice/contractSlice';




function ManagerContract() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContract())
  }, [dispatch])

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
        component: AuthorizedContractTab,
      },
      {
        id: 2,
        component: MiningContractTab,
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