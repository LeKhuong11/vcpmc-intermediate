import { RangePickerProps } from 'antd/es/date-picker';
import React from 'react'
import CustomDatePicker from '../../../components/DatePicker'
import InputSearch from '../../../components/InputSearch'
import dayjs from 'dayjs';
import root from '../revenue.module.scss'
import { ColumnsType } from 'antd/es/table';
import CustomTable from '../../../components/Table';
import FeatureInPage from '../../../components/FeatureInPage';
import { MdOutlineLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../redux/store';
import { message } from 'antd';


interface DataType{
    key: number,
    stt: number,
    contractID: string,
    authorizedPerson: string,
    numberOfSong: string,
    revenue: number,
    administrativeCosts: number,
    royalties: number,
    closingEnd: string,
    detailRevenue: string
}

function RevenueDistributionPage() {
    const { user } = useAppSelector(state => state.user)
    
    const disabledDateProps: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
      };
      const dataSource: DataType[] = [
        {
            key: 1,
            stt: 1,
            contractID: 'UQ789',
            authorizedPerson: 'Vương Anh Tú',
            numberOfSong: '15',
            revenue: 365000000,
            administrativeCosts: 365000000,
            royalties: 365000000,
            closingEnd: '21/07/2021',
            detailRevenue: 'Xem chi tiết'
        },
        {
            key: 2,
            stt: 2,
            contractID: 'UQ789',
            authorizedPerson: 'Vương Anh Tú',
            numberOfSong: '15',
            revenue: 365000000,
            administrativeCosts: 365000000,
            royalties: 365000000,
            closingEnd: '21/07/2021',
            detailRevenue: 'Xem chi tiết'
        },
        {
            key: 3,
            stt: 3,
            contractID: 'UQ789',
            authorizedPerson: 'Vương Anh Tú',
            numberOfSong: '15',
            revenue: 365000000,
            administrativeCosts: 365000000,
            royalties: 365000000,
            closingEnd: '21/07/2021',
            detailRevenue: 'Xem chi tiết'
        },
        {
            key: 4,
            stt: 4,
            contractID: 'UQ789',
            authorizedPerson: 'Vương Anh Tú',
            numberOfSong: '15',
            revenue: 365000000,
            administrativeCosts: 365000000,
            royalties: 365000000,
            closingEnd: '21/07/2021',
            detailRevenue: 'Xem chi tiết'
        },
        {
            key: 5,
            stt: 5,
            contractID: 'UQ789',
            authorizedPerson: 'Vương Anh Tú',
            numberOfSong: '15',
            revenue: 365000000,
            administrativeCosts: 365000000,
            royalties: 365000000,
            closingEnd: '21/07/2021',
            detailRevenue: 'Xem chi tiết'
        },
        {
            key: 6,
            stt: 6,
            contractID: 'UQ789',
            authorizedPerson: 'Vương Anh Tú',
            numberOfSong: '15',
            revenue: 365000000,
            administrativeCosts: 365000000,
            royalties: 365000000,
            closingEnd: '21/07/2021',
            detailRevenue: 'Xem chi tiết'
        },
        {
            key: 7,
            stt: 7,
            contractID: 'UQ789',
            authorizedPerson: 'Vương Anh Tú',
            numberOfSong: '15',
            revenue: 365000000,
            administrativeCosts: 365000000,
            royalties: 365000000,
            closingEnd: '21/07/2021',
            detailRevenue: 'Xem chi tiết'
        },

      ]

      const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt'
        },
        {
            title: 'Hợp đồng ủy quyền',
            dataIndex: 'contractID',
            key: 'contractID'
        },
        {
            title: 'Người ủy quyền',
            dataIndex: 'authorizedPerson',
            key: 'authorizedPerson'
        },
        {
            title: 'Số bài hát ủy quyền',
            dataIndex: 'numberOfSong',
            key: 'numberOfSong'
        },
        {
            title: 'Doanh thu (VNĐ)',
            dataIndex: 'revenue',
            key: 'revenue'
        },
        {
            title: 'Hành chính phí (VNĐ)',
            dataIndex: 'administrativeCosts',
            key: 'administrativeCosts'
        },
        {
            title: 'Mức nhuận bút (VNĐ)',
            dataIndex: 'royalties',
            key: 'royalties'
        },
        {
            title: 'Ngày chốt đối soát',
            dataIndex: 'closingEnd',
            key: 'closingEnd'
        },
        {
            title: 'Chi tiết doanh thu',
            dataIndex: 'detailRevenue',
            key: 'detailRevenue',
            render: (_, {detailRevenue}) => {
                return <Link to="detail/123">Xem chi tiết</Link>
            }
        },
      ]

      const featureProps = [
        {
          icon: MdOutlineLogout,
          text: 'Xuất file',
          event: () => {
            user.isAdmin || message.warning('Chức năng này chỉ dành cho người quản lý')
          },
          unActive:  user.isAdmin ? false : true
        }
      ]
  return (
    <div className={root.revenueDistribution}>
        <h3>Quản lý phân phối doanh thu</h3>
        <div className={root.timeAndSearch}>
            <div>
              <h5>Theo tháng: </h5>
              <CustomDatePicker disabledDate={disabledDateProps} />
            </div>
            <div>
              <InputSearch placehoder='Nhập tên tài khoản quản trị' />
            </div>
        </div>
        <div>
            <CustomTable 
                columns={columns} 
                dataSrouce={dataSource} 
                heightProps={70} 
                pagination={{pageSize: 9}}
            />
        </div>
        <FeatureInPage featureProps={featureProps} />
    </div>
  )
}

export default RevenueDistributionPage