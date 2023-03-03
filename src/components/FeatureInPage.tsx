import React from 'react'
import styled from 'styled-components';

interface IFreature {
    featureProps: Iitems[]
}
interface Iitems {
    icon: Function;
    text: string;
    event?: any
    unActive?: boolean
}
const FreatureStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
    margin: 5px 0;
    gap: 10px;
    width: 95px;
    border-radius: 16px 0px 0px 16px;
    background: #2F2F41;
    position: fixed;
    right: 0;
    top: 100px;
    cursor: pointer;
    text-align: center;
    &>div {
        margin: 5px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p {
            font-size: 11px;
        }
        & .icon {
            border-radius: 50%;
            background-color: #727288;
            width: 43px;
            height: 43px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        & svg {
            
            :hover {
                color: #FF4747;
            }
        }
    }
`
function FeatureInPage( {featureProps}: IFreature) {
  return (
    <FreatureStyled>
        {
            featureProps.map((item: Iitems, index: number) => (
                <div key={index} onClick={item.event}>
                    <div className='icon'>
                        <item.icon color={item.unActive ? '#3333' : '#FF7506'} size={27} />
                    </div>
                    <p>{item.text}</p>
                </div>
            ))
        }
    </FreatureStyled>
  )
}

export default FeatureInPage