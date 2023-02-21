import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Breadcrumbs from '../../../../../components/Breadcrumbs'
import TabControl from '../../../../../components/TabControl'
import InforContractTab from './InforContractTab/InforContractTab'
import ProductTab from './ProductTab/ProductTab'

const ContainerStyled = styled.div`
  position: fixed;
  left: 45px;
  width: 100%;
`

function DetailContractPage() {
  const { id } = useParams()

  const breadcrumb = [
    {
      key: 1,
      path: '',
      namePage: 'Quản lý'
    },
    {
      key: 2,
      path: '../contract',
      namePage: 'Quản lý hợp đồng'
    },
    {
      key: 3,
      path: '',
      namePage: 'Chi tiết'
    }
  ]

  const tabControl = {
    buttons: [
      {
        id: 1,
        text: 'Thông tin hợp đồng',
      },
      {
        id: 2,
        text: 'Tác phẩm ủy quyền'
      }
      
    ],
    items: [
      {
        id: 1,
        component: InforContractTab,
      },
      {
        id: 2,
        component: ProductTab,
      },
    ]
  }

  return (
    <ContainerStyled>
      <div>
          <Breadcrumbs crumbs={breadcrumb} />
      </div>
      <div>
        <h3>Chi tiết hợp đồng uỷ quyền bài hát - BH123</h3>
      </div>
      <div>
          <TabControl buttons={tabControl.buttons} items={tabControl.items} />
      </div>
    </ContainerStyled>
  )
}

export default DetailContractPage