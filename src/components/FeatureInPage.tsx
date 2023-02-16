import React from 'react'
import styled from 'styled-components';

interface IFreature {
    featureProps: Iitems[]
}
interface Iitems {
    icon: Function;
    text: string;
    event?: any
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
        p {
            font-size: 11px;
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
                    <div>
                        <item.icon color='#FF7506' size={27} />
                    </div>
                    <p>{item.text}</p>
                </div>
            ))
        }
    </FreatureStyled>
  )
}

export default FeatureInPage