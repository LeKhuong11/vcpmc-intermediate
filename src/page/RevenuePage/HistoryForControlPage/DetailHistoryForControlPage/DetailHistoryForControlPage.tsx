import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { MdOutlineLogout } from 'react-icons/md'
import styled from 'styled-components'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import FeatureInPage from '../../../../components/FeatureInPage'
import InputDate from '../../../../components/InputDate'
import InputSearch from '../../../../components/InputSearch'
import CustomTable from '../../../../components/Table'

const ContainerDiv = styled.div`
    position: fixed;
    left: 45px;
    width: 95%; 
    & .content {
        display: flex;

        &>div:first-child {
            width: 32%;
            & div {
                width: 400px;
                border-radius: 8px;
                background-color: var(--violetLight);
                margin: 0 15px 15px 0;
                padding: 15px;
                & h4 {
                    color: var(--orange);
                }

                & span {
                    display: flex;
                    margin: 5px 0;
                    & h5 {
                        min-width: 210px;
                    }
                    & p {
                        display: flex;
                        align-items: center;
                    }
                }
            }
        }
        &>div:nth-child(2) {
            width: 61%;
            & .dateAndSearch {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                & div {
                    display: flex;
                    & h5 {
                        height: 40px;
                        margin-right: 10px;
                        display: flex;
                        align-items: center;
                    }
                }
            }
        }
        
    }
`

interface DataType {
    nameSong: string,
    totalplays: number,
    totalRevenue: string,
    show: string,
    production: string,
    vcpmc: string
}

function DetailHistoryForControlPage() {


    const colums: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (_, {}, index) => <p>{index + 1}</p>
        },
        {
            title: 'Tên bài hát',
            dataIndex: 'nameSong',
            key: 'nameSong',
        },
        {
            title: 'Tổng số lượt phát',
            dataIndex: 'totalplays',
            key: 'totalplays',
        },
        {
            title: 'Tổng doanh thu',
            dataIndex: 'totalRevenue',
            key: 'totalRevenue',
        },
        {
            title: 'Quyền biểu diễn',
            dataIndex: 'show',
            key: 'show',
        },
        {
            title: 'Quyền sản xuất',
            dataIndex: 'production',
            key: 'production',
        },
        {
            title: 'VCPMC',
            dataIndex: 'vcpmc',
            key: 'vcpmc',
        },
    ]
    const dataSource: DataType[] = [
        {
            nameSong: 'Let Us Be',
            totalplays: 365,
            totalRevenue: '365.000.000',
            show: '36.266',
            production: '36.266',
            vcpmc: '36.200'
        },
        {
            nameSong: 'Let Us Be',
            totalplays: 365,
            totalRevenue: '365.000.000',
            show: '36.266',
            production: '36.266',
            vcpmc: '36.200'
        },
        {
            nameSong: 'Let Us Be',
            totalplays: 365,
            totalRevenue: '365.000.000',
            show: '36.266',
            production: '36.266',
            vcpmc: '36.200'
        },
        {
            nameSong: 'Let Us Be',
            totalplays: 365,
            totalRevenue: '365.000.000',
            show: '36.266',
            production: '36.266',
            vcpmc: '36.200'
        },
        {
            nameSong: 'Let Us Be',
            totalplays: 365,
            totalRevenue: '365.000.000',
            show: '36.266',
            production: '36.266',
            vcpmc: '36.200'
        },
        {
            nameSong: 'Let Us Be',
            totalplays: 365,
            totalRevenue: '365.000.000',
            show: '36.266',
            production: '36.266',
            vcpmc: '36.200'
        },
        {
            nameSong: 'Let Us Be',
            totalplays: 365,
            totalRevenue: '365.000.000',
            show: '36.266',
            production: '36.266',
            vcpmc: '36.200'
        },
        {
            nameSong: 'Let Us Be',
            totalplays: 365,
            totalRevenue: '365.000.000',
            show: '36.266',
            production: '36.266',
            vcpmc: '36.200'
        },
        {
            nameSong: 'Let Us Be',
            totalplays: 365,
            totalRevenue: '365.000.000',
            show: '36.266',
            production: '36.266',
            vcpmc: '36.200'
        },
        {
            nameSong: 'Let Us Be',
            totalplays: 365,
            totalRevenue: '365.000.000',
            show: '36.266',
            production: '36.266',
            vcpmc: '36.200'
        },
        {
            nameSong: 'Let Us Be',
            totalplays: 365,
            totalRevenue: '365.000.000',
            show: '36.266',
            production: '36.266',
            vcpmc: '36.200'
        },
    ]
    const breadcrumb = [
        {
            key: 1 ,
            path: '',
            namePage: 'Doanh thu' 
        },
        {
            key: 2,
            path: '../history-for-control',
            namePage: 'Lịch sử đối soát'
        },
        {
            key: 3,
            path: '',
            namePage: 'Chi tiết'
        }
    ]
    const featureProps = [
        {
          icon: MdOutlineLogout,
          text: 'Xuất file',
          unActive: true
        }
      ]
  return (
    <ContainerDiv>
        <div>
            <Breadcrumbs crumbs={breadcrumb} />
        </div>
        <div>
            <h3>Doanh thu theo hợp đồng - HĐ123 - Kỳ Tháng 03/2021 </h3>
        </div>
        <div className='content'>
            <div>
                <div className='infor-contract'>
                    <h4>Thông tin hợp đồng</h4>
                    <span>
                        <h5>Số hợp đồng:</h5>
                        <p>HĐ123</p>
                    </span>
                    <span>
                        <h5>Đơn vị khai thác:</h5>
                        <p>Công ty TNHH ABC</p>
                    </span>
                    <span>
                        <h5>Loại hợp đồng:</h5>
                        <p>Trọn gói</p>
                    </span>
                    <span>
                        <h5>Hiệu lực từ:</h5>
                        <p>01/01/2020</p>
                    </span>
                    <span>
                        <h5>Ngày hết hạn:</h5>
                        <p>01/01/2022</p>
                    </span>
                    <span>
                        <h5>Giá trị hợp đồng:</h5>
                        <p>730.000.000 VNĐ</p>
                    </span>
                    <span>
                        <h5>Giá trị phân phối theo ngày:</h5>
                        <p>365.000.000 VNĐ</p>
                    </span>
                </div>
                <div className='infor-for-control'>
                    <h4>Thông tin đối soát</h4>
                    <span>
                        <h5>Ký đối soát:</h5>
                        <p>01/01/2020</p>
                    </span>
                    <span>
                        <h5>Số bài hát:</h5>
                        <p>13 bài</p>
                    </span>
                    <span>
                        <h5>Tổng số lượt phát:</h5>
                        <p>200.000 lượt</p>
                    </span>
                    <span>
                        <h5>Tổng doanh thu:</h5>
                        <p>300.000.000 VNĐ  </p>
                    </span>
                    <span>
                        <h5>Doanh thu chưa phân phối:</h5>
                        <p>1.000.000 VNĐ</p>
                    </span>
                    <span>
                        <h5>Trạng thái đối soát:</h5>
                        <p>Chưa đối soát</p>
                    </span>
                </div>
            </div>
            <div>
                <h4>Danh sách bản ghi</h4>
                <div className='dateAndSearch'>
                    <div>
                        <h5>Xem theo ngày/tuần:</h5>
                        <InputDate name='time' width={150}  />
                    </div>
                    <InputSearch placehoder='Nhập tên bài hát' />
                </div>
                <div>
                    <CustomTable 
                        widthProps={100}
                        columns={colums} 
                        dataSrouce={dataSource} 
                        heightProps={65} 
                        pagination={{pageSize: 9}}
                    />
                </div>
            </div>
        </div>
        <FeatureInPage featureProps={featureProps} />
    </ContainerDiv>
  )
}

export default DetailHistoryForControlPage