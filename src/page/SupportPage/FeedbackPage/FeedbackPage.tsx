import React, { useState } from 'react'
import styled from 'styled-components'
import Breadcrumbs from '../../../components/Breadcrumbs'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import CustomSelect from '../../../components/Select'


const ContainerDiv = styled.div`

    & .content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        & .form {
            margin-bottom: 20px;
            width: 500px;
            height: 450px;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: var(--violetLight);
            border-radius: 8px;
            padding: 12px;
            
            & div {
                margin: 10px 0;
            }
        }

    }
`

function FeedbackPage() {
    const [ valueSelect, setValueSelect ] = useState('Chọn vấn đề bạn cần được hỗ trợ');


    const select = {
        items: ['Cách sử dụng ứng dụng?', 'Các vấn đề về hợp đồng?', 'Các vấn đề về bản quyền?', 'Các vấn đề về bài hát, bản ghi?'],
        onChange: (value: string) => {
            setValueSelect(value)
        }
    }
    const breadcrumb = [
        {
            key: 1 ,
            path: '',
            namePage: 'Hỗ trợ' 
        },
        {
            key: 2,
            path: '',
            namePage: 'Feedback'
        }
      ]

  return (
    <ContainerDiv>
        <div>
            <Breadcrumbs crumbs={breadcrumb} />
        </div>
        <div>
            <h3>Feedback</h3>
        </div>
        <div className='content'>
            <div className='form'>
                <form action="">
                    <div>
                        <h5>Tên người dùng</h5>
                        <Input
                            type='text'
                            width={450}
                        />
                    </div>
                    <div>
                        <h5>Bạn muốn được hỗ trợ vấn đề gì?</h5>
                        <CustomSelect 
                            value={valueSelect}
                            items={select.items}
                            onChange={select.onChange}
                            width={450}
                        />
                    </div>
                    <div>
                        <h5>Nội dung</h5>
                        <textarea cols={58} rows={10} placeholder='Nhập nội dung'></textarea>
                    </div>
                </form>
            </div>
            <div className='button'>
                <Button type='secondary' heightProps={38} widthProps={148} contentProps="Gửi" />
            </div>
        </div>
    </ContainerDiv>
  )
}

export default FeedbackPage