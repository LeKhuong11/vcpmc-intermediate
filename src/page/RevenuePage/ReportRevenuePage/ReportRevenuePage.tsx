import { message } from 'antd'
import React, { useState } from 'react'
import { BiDetail } from 'react-icons/bi'
import styled from 'styled-components'
import Breadcrumbs from '../../../components/Breadcrumbs'
import FeatureInPage from '../../../components/FeatureInPage'
import CustomSelect from '../../../components/Select'
import { useAppSelector } from '../../../redux/store'
const chart =  require('../../../image/chart.png');

const ContainerDiv = styled.div`
    
    & .content {
        width: 94%;
        &>div:first-child {
            display: flex;

            & h5 {
                display: flex;
                align-items: center;
            }
            &>span {
                margin: 0 10px;
            }
        }
        & .total {
            display: flex;
            background-color: var(--violetLight);
            border-radius: 8px;
            padding: 15px 0;
            width: 100%;
            margin: 17px 0;
            &>div {
                border-right: 2px solid #464658;
                width: 230px;
                height: 50px;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                & h5 {
                    color: #FFAC69;
                }
            }
            &>div:last-child {
                border: none;
            }
        }
        & .chart {

            & img {
                width 100%;
            }
        }
    }
`

function ReportRevenuePage() {
    const { user } = useAppSelector(state => state.user)
    const [ valueSelect, setValueSelect ] = useState('Theo Tháng')
    const [ valueSelectDate, setValueSelectDate ] = useState('Tháng 1')
    const breadcrumb = [
        {
            key: 1 ,
            path: '',
            namePage: 'Doanh thu' 
        },
        {
            key: 2,
            path: '',
            namePage: 'Báo cáo doanh thu'
        }
    ]

    //handle select role
    const select = {
        items: ['Theo tháng', 'Theo quý'],
        onChange: (value: string) => {
            setValueSelect(value)
        }
    }
    const selectDate = {
        items: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',],
        onChange: (value: string) => {
            setValueSelectDate(value)
        }
    }
    const featureProps = [
        {
            icon: BiDetail,
            text: 'Báo cáo chi tiết',
            event: () => {
                user.isAdmin || message.warning('Chức năng này chỉ dành cho người quản lý')
            },
            unActive: user.isAdmin ? false : true
        }
    ]
  return (
    <ContainerDiv>
        <div>
            <Breadcrumbs crumbs={breadcrumb} />
        </div>
        <div>
            <h3>Báo cáo doanh thu</h3>
        </div>
        <div className='content'>
            <div>
                <h5>Theo tháng:</h5>
                <span>
                    <CustomSelect 
                        value={valueSelect}
                        items={select.items}
                        onChange={select.onChange}
                        width={160}
                    />
                </span>
                <span>
                    <CustomSelect 
                        value={valueSelectDate}
                        items={selectDate.items}
                        onChange={selectDate.onChange}
                        width={160}
                    />
                </span>
            </div>
            <div className='total'>
                <div>
                    <p>Tổng số bài hát</p>
                    <h5>100</h5>
                </div>
                <div>
                    <p>Tổng số lượt phát</p>
                    <h5>32.000.000</h5>
                </div>
                <div>
                    <p>Doanh thu trên lượt phát</p>
                    <h5>1.564.745.000đ</h5>
                </div>
                <div>
                    <p>Doanh thu chưa phân phối</p>
                    <h5>164.745.000đ</h5>
                </div>
                <div>
                    <p>Hành chính phí</p>
                    <h5>3.253.000đ</h5>
                </div>
            </div>
            <div className='chart'>
                <h4>Biểu đồ theo dõi lượt phát - 29/06/2021</h4>
                <img src={chart} alt="" />
            </div>
        </div>
        <FeatureInPage featureProps={featureProps} />
    </ContainerDiv>
  )
}

export default ReportRevenuePage