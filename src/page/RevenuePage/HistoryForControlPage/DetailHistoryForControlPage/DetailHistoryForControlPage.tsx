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
            title: 'T??n b??i h??t',
            dataIndex: 'nameSong',
            key: 'nameSong',
        },
        {
            title: 'T???ng s??? l?????t ph??t',
            dataIndex: 'totalplays',
            key: 'totalplays',
        },
        {
            title: 'T???ng doanh thu',
            dataIndex: 'totalRevenue',
            key: 'totalRevenue',
        },
        {
            title: 'Quy???n bi???u di???n',
            dataIndex: 'show',
            key: 'show',
        },
        {
            title: 'Quy???n s???n xu???t',
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
            namePage: 'L???ch s??? ?????i so??t'
        },
        {
            key: 3,
            path: '',
            namePage: 'Chi ti???t'
        }
    ]
    const featureProps = [
        {
          icon: MdOutlineLogout,
          text: 'Xu???t file',
          unActive: true
        }
      ]
  return (
    <ContainerDiv>
        <div>
            <Breadcrumbs crumbs={breadcrumb} />
        </div>
        <div>
            <h3>Doanh thu theo h???p ?????ng - H??123 - K??? Th??ng 03/2021 </h3>
        </div>
        <div className='content'>
            <div>
                <div className='infor-contract'>
                    <h4>Th??ng tin h???p ?????ng</h4>
                    <span>
                        <h5>S??? h???p ?????ng:</h5>
                        <p>H??123</p>
                    </span>
                    <span>
                        <h5>????n v??? khai th??c:</h5>
                        <p>C??ng ty TNHH ABC</p>
                    </span>
                    <span>
                        <h5>Lo???i h???p ?????ng:</h5>
                        <p>Tr???n g??i</p>
                    </span>
                    <span>
                        <h5>Hi???u l???c t???:</h5>
                        <p>01/01/2020</p>
                    </span>
                    <span>
                        <h5>Ng??y h???t h???n:</h5>
                        <p>01/01/2022</p>
                    </span>
                    <span>
                        <h5>Gi?? tr??? h???p ?????ng:</h5>
                        <p>730.000.000 VN??</p>
                    </span>
                    <span>
                        <h5>Gi?? tr??? ph??n ph???i theo ng??y:</h5>
                        <p>365.000.000 VN??</p>
                    </span>
                </div>
                <div className='infor-for-control'>
                    <h4>Th??ng tin ?????i so??t</h4>
                    <span>
                        <h5>K?? ?????i so??t:</h5>
                        <p>01/01/2020</p>
                    </span>
                    <span>
                        <h5>S??? b??i h??t:</h5>
                        <p>13 b??i</p>
                    </span>
                    <span>
                        <h5>T???ng s??? l?????t ph??t:</h5>
                        <p>200.000 l?????t</p>
                    </span>
                    <span>
                        <h5>T???ng doanh thu:</h5>
                        <p>300.000.000 VN??  </p>
                    </span>
                    <span>
                        <h5>Doanh thu ch??a ph??n ph???i:</h5>
                        <p>1.000.000 VN??</p>
                    </span>
                    <span>
                        <h5>Tr???ng th??i ?????i so??t:</h5>
                        <p>Ch??a ?????i so??t</p>
                    </span>
                </div>
            </div>
            <div>
                <h4>Danh s??ch b???n ghi</h4>
                <div className='dateAndSearch'>
                    <div>
                        <h5>Xem theo ng??y/tu???n:</h5>
                        <InputDate name='time' width={150}  />
                    </div>
                    <InputSearch placehoder='Nh???p t??n b??i h??t' />
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