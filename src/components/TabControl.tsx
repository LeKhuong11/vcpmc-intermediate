import React, { useState } from 'react'
import styled from 'styled-components'

const TabStyled = styled.div`
    & .blockTabs {
        display: flex;
        margin: 10px 0;
        width: 100%;

        & button {
            width: 205px;
            border-radius: 15px;
            border: 1px solid var(--orange);
            color: var(--white);
            background-color: var(--violet);
            height: 34px;
            cursor: pointer;
        }
        & .active {
            background-color: var(--orange);
            z-index: 99;
        }
        
        & button:nth-child(2) {
            margin-left: -22px;
        }
        
    }
    & .contentTabs {

        & .dropdownAndSearch {
            display: flex;
            justify-content: space-between;
            width: 93%;

            &>div {
                display: flex;
                
                &>div {
                    margin-right: 25px;
                    display: flex;
                    align-items: center;
                }
            }
        }
    }
    & .content {
        display: none;
    }
    & .activeContent {
        display: block;
    }
`
interface IButton {
    id: number,
    text: string
}

interface Iitem {
    id: number,
    component: any
}

interface ITabProps {
    buttons: IButton[],
    items: Iitem[]
}

function TabControl({buttons, items} :ITabProps) {
    const [toggleState, setToggleState] = useState(1);

  return (
    <TabStyled>
        <div className='blockTabs'>
            {buttons.map(item => (
                <button key={item.id} className={toggleState === item.id ? 'active' : ''} onClick={() => setToggleState(item.id)}>{item.text}</button>
            ))}
        </div>
        <div className='contentTabs' >
            {items.map(item => {
                const Page = item.component;
                return <div key={item.id} className={toggleState === item.id ? 'activeContent' : 'content'} >
                    <Page />
                </div>
            })}
        </div>
    </TabStyled>
  )
}

export default TabControl