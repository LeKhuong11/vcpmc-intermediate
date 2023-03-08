import { Avatar, message } from 'antd'
import { collection, doc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Breadcrumbs from '../../../components/Breadcrumbs'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import CustomSelect from '../../../components/Select'
import { db } from '../../../firebase/configfb'
import { usePaymentsCollection } from '../../../hooks/useSnapshot'
import { useAppSelector } from '../../../redux/store'
const noMessage = require('../../../image/no-message.png')

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

    & .content-admin {
        display: flex;
        
        &>div {
            border-radius: 8px;
            background-color: var(--violetLight);
            height: 75vh;
        }

        & .message-feedback {
            width: 33%;
            margin-right: 15px;
            overflow: auto;
            & .message {
                width: 100%;
                display: flex;
                align-items: center;
                padding: 7px 10px;
                cursor: pointer;
                position: relative;
                & img {
                    margin-right: 10px;
                    width: 50px;
                    height: 50px;
                }
                & .date {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 11px;
                }

            }
            & :hover {
                background-color: rgba(64, 64, 83, 0.7);
                transition: all .2s linear;
            }
        }

        & .content-message-feedback {
            width: 60%;

            & .detail-feedback {
                padding: 15px;

                &>div:first-child {
                    display: flex;
                    position: relative;
                    & img {
                        margin: 0 15px 15px 0;
                    }

                    & .date {
                        position: absolute;
                        right: 15px;
                    }
                }
            }

            & .no-message {
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
`

interface IFeedback {
    id?: number,
    avatar: any,
    date: string,
    userName: string,
    topic: string,
    content: string
}

let today: any = new Date();
today = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();

function FeedbackPage() {
    const { user } = useAppSelector(state => state.user)
    const [ valueSelect, setValueSelect ] = useState('Chọn vấn đề bạn cần được hỗ trợ');
    const [ openFeedbackMessage, setOpenFeedbackMessage ] = useState<any>(false);
    const [ listMessageFeedback, setListMessageFeedback ] = useState<any[]>([])
    const [ addFeedback, setAddFeedback ] = useState<IFeedback>({
        id: Math.floor(Math.random() * 10000),
        avatar: null,
        date: today,
        userName: user.displayName,
        topic: '',
        content: ''
    })
    const { payments } = usePaymentsCollection('feedback');

    //real time database
    //If the data on firestorm changes, it will be updated immediately
    useEffect(() => {
        setListMessageFeedback(payments)
    }, [payments])

    const handleChangeSetValueFeedBack = (e: any) => {
        const name = e.name;
        const value = e.value;

        setAddFeedback({
            ...addFeedback,
            [name]: value
        })
    }

    const handleClickAddFeedback = async () => {
        if(addFeedback.content) {
            const docRef = doc(collection(db, "feedback"))
            try {
                await setDoc(docRef, addFeedback);
                setValueSelect('Chọn vấn đề bạn cần được hỗ trợ')
                setAddFeedback({
                    ...addFeedback,
                    topic: '',
                    content: ''
                })
                message.success("Cảm ơn bạn đã góp ý cho chúng tôi")
            } catch(err) {
            }
            return
        }
        message.warning("Bạn chưa góp ý cho chúng tôi")
    }

    const select = {
        items: ['Cách sử dụng ứng dụng?', 'Các vấn đề về hợp đồng?', 'Các vấn đề về bản quyền?', 'Các vấn đề về bài hát, bản ghi?'],
        onChange: (value: string) => {
            setValueSelect(value)
            setAddFeedback({
                ...addFeedback,
                topic: value
            })
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
        {user.isAdmin ? 
            //UI of admin
            <div className='content-admin'>
                <div className='message-feedback'>
                    {listMessageFeedback.map(item => (
                        <div key={item.id} onClick={() => setOpenFeedbackMessage(item)} className='message'>
                            <Avatar size={50} style={{ backgroundColor: '#f56a00', margin: '5px 12px 0 0' }}>{item.avatar ?? item.userName.charAt(0).toUpperCase()}</Avatar>
                            <div>
                                <h5>{item.userName}</h5>
                                <p>Chủ đề: {item.topic}</p>
                            </div>
                            <p className='date'>{item.date}</p>
                        </div>
                    ))}
                </div>
                <div className='content-message-feedback'>
                    {openFeedbackMessage ? 
                        <div className='detail-feedback'>
                            <div>
                                <Avatar size={50} style={{ backgroundColor: '#f56a00', margin: '0 12px 15px 0' }}>{openFeedbackMessage.avatar ?? openFeedbackMessage.userName.charAt(0).toUpperCase()}</Avatar>
                                <div>
                                    <h5>{openFeedbackMessage?.userName}</h5>
                                    <p>Chủ đề: {openFeedbackMessage?.topic}?</p>
                                </div>
                                <p className='date'>{openFeedbackMessage?.date}</p>
                            </div>
                            <p>{openFeedbackMessage?.content}</p>
                        </div> : 
                        <div className='no-message'>
                            <img width={450} src={noMessage} alt="" />
                        </div>    
                    }
                </div>
            </div> : 
            //UI of user 
            <div className='content'>
                <div className='form'>
                    <form action="">
                        <div>
                            <h5>Tên người dùng</h5>
                            <Input
                                type='text'
                                value={user.displayName}
                                width={450}
                                name='userName'
                                setValue={handleChangeSetValueFeedBack}
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
                            <textarea 
                                cols={58} rows={10} 
                                placeholder='Nhập nội dung'
                                name='content'
                                defaultValue={addFeedback.content}
                                onChange={(e: any) => setAddFeedback({...addFeedback, content: e.target.value})}
                            ></textarea>
                        </div>
                    </form>
                </div>
                <div className='button'>
                    <Button type='secondary' heightProps={38} widthProps={148} contentProps="Gửi" onClick={handleClickAddFeedback} />
                </div>
            </div>    
        }
    </ContainerDiv>
  )
}

export default FeedbackPage