import React from 'react'
import styled from 'styled-components'
import Breadcrumbs from '../../../components/Breadcrumbs'
import Button from '../../../components/Button';

const android = require('../../../image/android.png');
const windown = require('../../../image/window.png');
const upload = require('../../../image/upload.png');

const ContainerDiv = styled.div`

    & .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 50px;
        & .intro {
            margin-bottom: 50px;
            text-align: center;
            & span {
                color: var(--orange);
            }
        }

        & .download {
            display: flex;
            &>div {
                width: 230px;
                height: 250px;
                background-color: var(--violetLight);
                border-radius: 8px;
                padding: 10px;
                margin: 15px;
                display: flex;
                flex-direction: column;
                align-items: center;

                & .image {
                    height: 75%;
                    display: flex;
                    align-items: center;
                    & img {
                        height: 100px;
                        width: 120px;
                    }
                }
            }
        }
    }

`
function DownLoadPage() {

    const breadcrumb = [
        {
            key: 1 ,
            path: '',
            namePage: 'Hỗ trợ' 
        },
        {
            key: 2,
            path: '',
            namePage: 'Tải App'
        }
      ]
  return (
    <ContainerDiv>
        <div>
            <Breadcrumbs crumbs={breadcrumb} />
        </div>
        <div>
            <h3>Tải App</h3>
        </div>
        <div className='content'>
            <div className='intro'>
                <h2>ỨNG DỤNG <mark style={{color: "#FF7506", background: 'none'}}>VCPMC</mark></h2>
                <span>-----------------------------------------------</span>
                <p>Bạn vui lòng chọn <b>nền tảng</b> phù hợp để trải nghiệm</p>
            </div>
            <div className='download'>
                <div>
                    <div className='image'>
                        <img src={upload} alt="" />
                    </div>
                    <Button type='secondary' heightProps={45} widthProps={175} contentProps="Tool Upload" />
                </div>
                <div>
                    <div className='image'>
                        <img src={windown} alt="" />
                    </div>
                    <Button type='secondary' heightProps={45} widthProps={175} contentProps="Tải App Window" />
                </div>
                <div>
                    <div className='image'>
                        <img src={android} alt="" />
                    </div>
                    <Button type='secondary' heightProps={45} widthProps={175} contentProps="Tải App Android" />
                </div>
            </div>
        </div>
    </ContainerDiv>
  )
}

export default DownLoadPage