import React from 'react'
import { Tabs } from 'antd';
import styled from 'styled-components';



interface ITabs {
    tabData: any[]
}
const TabsStyled = styled(Tabs)`
    &&& {
        .TabData {
            color: var(--white);
        }
    }
`

function TabColumn({tabData}: ITabs) {
  return (
    <>
        <TabsStyled
            tabPosition={'left'}
            items={tabData.map((item, index) => {
                const order = index + 1;
                return {
                    label: `${order}. ${item.title}`,
                    key: item.key,
                    children: item.content
                }
            })}
        />
        </>
  )
}

export default TabColumn