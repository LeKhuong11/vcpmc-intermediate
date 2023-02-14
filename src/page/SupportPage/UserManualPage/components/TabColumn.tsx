import React from 'react'
import { Tabs } from 'antd';
import styled from 'styled-components';



interface ITabs {
    tabData: any[]
}
const TabsStyled = styled(Tabs)`
    &&& {
        :where(.css-dev-only-do-not-override-1n7nwfa).ant-tabs {
            color: var(--white);
        }
        .ant-tabs-nav .ant-tabs-nav-list {
            background-color: var(--violetLight);
            height: 70vh;
            border-radius: 8px;
        }
        :where(.css-dev-only-do-not-override-1n7nwfa).ant-tabs .ant-tabs-tab-active .ant-tabs-tab-btn  {
            h5 {
                color: var(--orange);
            }
        }
        .ant-tabs-content-holder {
            background-color: var(--violetLight);
            border-radius: 8px;
            margin-left: 20px;
            padding: 10px;
            height: 70vh;
            border: none;
            overflow: auto;
        }
        :where(.css-dev-only-do-not-override-1n7nwfa).ant-tabs .ant-tabs-ink-bar {
            background-color: var(--orange);
            left: 0;
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
                    label: <h5>{order}. {item.title}</h5>,
                    key: item.key,
                    children: item.content
                }
            })}
        />
        </>
  )
}

export default TabColumn