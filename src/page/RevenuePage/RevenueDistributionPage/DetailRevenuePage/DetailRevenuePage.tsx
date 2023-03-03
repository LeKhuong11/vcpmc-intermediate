import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { TbFileExport } from 'react-icons/tb'
import styled from 'styled-components'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import FeatureInPage from '../../../../components/FeatureInPage'
import InputSearch from '../../../../components/InputSearch'
import CustomTable from '../../../../components/Table'

interface DataTypeListSong {
    song: string,
    plays: number,
    revenue: string,
    AdministrativeFee: string,
    royalties: string,
}
interface DataTypeRevenueSong {
    miningUnit: string,
    plays: number,
    revenue: string
}

const ContainerDiv = styled.div`
    width: 95%;
    position: fixed;
    left: 45px;

    & .content {
        width: 95%%;
        display: flex;

        &>div:first-child {
            width: 58%;
        }
        &>div:nth-child(2) {
            width: 38%;
        }
    }
`

function DetailRevenuePage() {


    const columnsRevenueSong: ColumnsType<DataTypeRevenueSong> = [
        {
            title: 'Đơn vị khai thác',
            dataIndex: 'miningUnit',
            key: 'miningUnit'
        },
        {
            title: 'Số lượt phát',
            dataIndex: 'plays',
            key: 'plays'
        },
        {
            title: 'Doanh thu (VNĐ)',
            dataIndex: 'revenue',
            key: 'revenue'
        },
    ]

    const dataSourceRevenueSong: DataTypeRevenueSong[] = [
        {
            miningUnit: 'CTy TNHH A',
            plays: 200,
            revenue: '2.500.000'
        },
        {
            miningUnit: 'CTy TNHH A',
            plays: 200,
            revenue: '2.500.000'
        },
        {
            miningUnit: 'CTy TNHH A',
            plays: 200,
            revenue: '2.500.000'
        },
        {
            miningUnit: 'string',
            plays: 200,
            revenue: '2.500.000'
        },
        {
            miningUnit: 'string',
            plays: 200,
            revenue: '2.500.000'
        },
        {
            miningUnit: 'string',
            plays: 200,
            revenue: '2.500.000'
        },
        {
            miningUnit: 'string',
            plays: 200,
            revenue: '2.500.000'
        },
    ]

    const columnsListSong: ColumnsType<DataTypeListSong> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (_, {}, index) => (
                <p>{index + 1}</p>
            )
        },
        {
            title: 'Bài hát',
            dataIndex: 'song',
            key: 'song'
        },
        {
            title: 'Số lượt phát',
            dataIndex: 'plays',
            key: 'plays'
        },
        {
            title: 'Doanh thu (VNĐ)',
            dataIndex: 'revenue',
            key: 'revenue'
        },
        {
            title: 'Hành chính phí (VNĐ)',
            dataIndex: 'AdministrativeFee',
            key: 'AdministrativeFee'
        },
        {
            title: 'Nhuận bút (VNĐ)',
            dataIndex: 'royalties',
            key: 'royalties'
        },
    ]
    const dataSourceListSong: DataTypeListSong[] = [
        {
            song: 'Hết thương cạn nhớ ',
            plays: 1200,
            revenue: '12.000.000',
            AdministrativeFee: '2.500.000',
            royalties: '2.500.000',
        },
        {
            song: 'Hết thương cạn nhớ ',
            plays: 1200,
            revenue: '12.000.000',
            AdministrativeFee: '2.500.000',
            royalties: '2.500.000',
        }, 
        {
            song: 'Hết thương cạn nhớ ',
            plays: 1200,
            revenue: '12.000.000',
            AdministrativeFee: '2.500.000',
            royalties: '2.500.000',
        },
        {
            song: 'Hết thương cạn nhớ ',
            plays: 1200,
            revenue: '12.000.000',
            AdministrativeFee: '2.500.000',
            royalties: '2.500.000',
        },
        {
            song: 'Hết thương cạn nhớ ',
            plays: 1200,
            revenue: '12.000.000',
            AdministrativeFee: '2.500.000',
            royalties: '2.500.000',
        },
        {
            song: 'Hết thương cạn nhớ ',
            plays: 1200,
            revenue: '12.000.000',
            AdministrativeFee: '2.500.000',
            royalties: '2.500.000',
        },
        {
            song: 'Hết thương cạn nhớ ',
            plays: 1200,
            revenue: '12.000.000',
            AdministrativeFee: '2.500.000',
            royalties: '2.500.000',
        }
    ]
    const breadcrumb = [
        {
          key: 1,
          path: '',
          namePage: 'Doanh thu'
        },
        {
          key: 2,
          path: '../revenue-distribution',
          namePage: 'Phân phối doanh thu'
        },
        {
            key: 3,
            path: '',
            namePage: 'Chi tiết doanh thu'
          }
      ]

    const featureProps = [
        {
            icon: TbFileExport,
            text: 'Xuất dữ liệu',
            unActive: true,
        }
    ]
  return (
    <ContainerDiv>
        <div>
            <Breadcrumbs crumbs={breadcrumb} /> 
        </div>
        <div>
            <h3>Hợp đồng Ủy quyền UQ123 - Quý 1</h3>
        </div>
        <div className='content'>
            <div>
                <h4>Danh sách bản ghi</h4>
                <InputSearch placehoder='Nhập tên bài hát' />
                <CustomTable 
                    heightProps={65} 
                    columns={columnsListSong} 
                    dataSrouce={dataSourceListSong} 
                    widthProps={97}
                />
            </div>
            <div>
                <h4>Doanh thu bản ghi</h4>
                <h4 style={{color: '#FFAC69', marginBottom: 25, fontSize: 20}}>Cuộc gọi nhỡ</h4>
                <CustomTable 
                    columns={columnsRevenueSong} 
                    dataSrouce={dataSourceRevenueSong}  
                    heightProps={65}
                    widthProps={92}    
                />
            </div>
        </div>
        <FeatureInPage featureProps={featureProps} />
    </ContainerDiv>
  )
}

export default DetailRevenuePage