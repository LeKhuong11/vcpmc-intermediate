import { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { GiNotebook } from 'react-icons/gi'
import { RxCountdownTimer, RxDotFilled } from 'react-icons/rx'
import { SlNote } from 'react-icons/sl'
import styled from 'styled-components'
import FeatureInPage from '../../../../../../components/FeatureInPage'
import InputSearch from '../../../../../../components/InputSearch'
import CustomSelect from '../../../../../../components/Select'
import CustomTable from '../../../../../../components/Table'
import { useAppSelector } from '../../../../../../redux/store'

const ContainerDiv = styled.div`
  width: 88%;

  &>div:first-child {
    display: flex;
    justify-content: space-between;
    width: 100%;
    & .selectAndSearch {
      display: flex;
      
      & h5{
        height: 40px;
        margin-right: 15px; 
        display: flex;
        align-items: center;
      }
    }
  }
`

interface DataType {
  nameSong: string, 
  IRCID: string,
  singer: string,
  author: string,
  downloadDate: string,
  status: string
}

function ProductTab() {
  const [ valueSelect, setValueSelect ] = useState('Tất cả')
  const { user } = useAppSelector(state => state.user)

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (_, {}, index ) => <p>{index + 1}</p>
    },
    {
      title: 'Tên bản ghi',
      dataIndex: 'nameSong',
      key: 'nameSong'
    },
    {
      title: 'Mã ISRC',
      dataIndex: 'IRCID',
      key: 'IRCID'
    },
    {
      title: 'Ca sĩ',
      dataIndex: 'singer',
      key: 'singer'
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author'
    },
    {
      title: 'Ngày tải',
      dataIndex: 'downloadDate',
      key: 'downloadDate'
    },
    {
      title: 'Tình trạng',
      dataIndex: 'active',
      key: 'active',
      render: (_, {status} ) => {

        const statusobj: any = {
          new: <p><RxDotFilled color="green" />Mới</p>,
          approved: <p><RxDotFilled color="blue" />Còn thời hạn</p>,
          cancel: <p><RxDotFilled color="gray" />Đã hết hạn</p>,
        }
        return <p>{statusobj[status]}</p>
      }
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      render: (_, ) => <a href="#">Nghe</a>
    },
  ]
  const dataSource: DataType[] = [
    {
      nameSong: 'Beautiful Girls', 
      IRCID: 'VNA6474758',
      singer: 'JustaTee',
      author: 'Đặng Công Minh',
      downloadDate: '01/12/2020',
      status: 'new'
    },
    {
      nameSong: 'Anh của ngày hôm qua', 
      IRCID: 'VNA2547569',
      singer: 'Mai Deadline',
      author: 'Đét Lai',
      downloadDate: '01/02/2020',
      status: 'new'
    },
    {
      nameSong: 'Gorgeous Wooden Bike', 
      IRCID: 'VNA1423525',
      singer: 'Vương Anh Tú',
      author: 'Vương Phong',
      downloadDate: '01/04/2021',
      status: 'approved'
    },
    {
      nameSong: 'Kings & Queens', 
      IRCID: 'VNA1423637',
      singer: 'Châu Đăng Khoa',
      author: 'Lê Loan',
      downloadDate: '14/03/2021',
      status: 'new'
    },
    {
      nameSong: 'On The Ground', 
      IRCID: 'VNA6474769',
      singer: 'Chillies',
      author: 'Nhã Lê',
      downloadDate: '20/12/2020',
      status: 'approved'
    },
  ]


  const featureProps = [
    {
      icon: SlNote,
      text: 'Chỉnh sửa tác phẩm'
    },
    {
      icon: GiNotebook,
      text: 'Gia hạn hợp đồng'
    },
    {
      icon: RxCountdownTimer,
      text: 'Hủy hợp đồng'
    },
    {
      icon: BiPlus,
      text: 'Thêm bản ghi'
    },
  ]

  //handle select role
  const select = {
    items: ['Theo tháng', 'Theo quý'],
    onChange: (value: string) => {
        setValueSelect(value)
    }
}
  return (
    <ContainerDiv>
      <div>
        <div className='selectAndSearch'>
          <h5>Tình trạng phê duyệt</h5>
          <CustomSelect 
            value={valueSelect}
            items={select.items}
            onChange={select.onChange}
            width={160}
          />
        </div>
        <InputSearch placehoder='Tên bản ghi, tên ca sĩ, tác giả,...' />
      </div>
      <CustomTable 
        widthProps={100}
        heightProps={63}
        columns={columns}
        dataSrouce={dataSource}
      />
      <FeatureInPage featureProps={featureProps} />
    </ContainerDiv>
  )
}

export default ProductTab