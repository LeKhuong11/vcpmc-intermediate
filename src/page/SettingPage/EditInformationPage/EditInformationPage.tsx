import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import Button from '../../../components/Button'
import FeatureInPage from '../../../components/FeatureInPage'
import Input from '../../../components/Input'
import CustomTable from '../../../components/Table'
import root from '../setting.module.scss'

interface DataType {
    key: number,
    stt: number,
    type: string,
    description: string
}

function EditInformationPage() {
    const [ editingRow, setEditingRow ] = React.useState(0)
    const [ editValue, setEditValue ] = React.useState('');

    const dataSource: DataType[] = [
        {
            key: 1,
            stt: 1,
            type: 'Pop',
            description: 'Nhạc pop là một thể loại của nhạc đương đại và rất phổ biến trong làng nhạc đại chúng.'
        },
        {
            key: 2,
            stt: 2,
            type: 'Bolero',
            description: 'Quay về với một thời hoa bướm đầy mơ mộng khi nghe các tuyệt phẩm nhạc bolero trữ tình này.'
        },
        {
            key: 3,
            stt: 3,
            type: 'Ballad',
            description: 'Ballad là dòng nhạc nhẹ nhàng, trữ tình bắt nguồn từ dòng nhạc country và folk vì giai điệu chậm, thong thả. '
        },
        {
            key: 4,
            stt: 4,
            type: 'Lofi',
            description: 'Lo-fi là một thể loại nhạc trong đó có chứa các yếu tố không hoàn hảo trong quá trình ghi âm và trình diễn.'
        },
        {
            key: 5,
            stt: 5,
            type: 'Blues',
            description: 'Nhạc Blues có nguồn gốc từ những điệu hát của miền tây Phi Châu được các nô lệ da đen mang sang Bắc Mỹ.'
        },
        {
            key: 7,
            stt: 7,
            type: 'Country',
            description: 'Nhạc đồng quê là một thể loại nhạc pha trộn truyền thống được tìm thấy phổ biến ở Mỹ và Canada.'
        },
        {
            key: 8,
            stt: 8,
            type: 'Rock',
            description: 'Rock là một thể loại âm nhạc quần chúng được bắt nguồn từ cách gọi ngắn gọn của cụm từ "rock and roll" vào những năm 1950 ở Mỹ.'
        },
        {
            key: 9,
            stt: 9,
            type: 'Ballad',
            description: 'Ballad là dòng nhạc nhẹ nhàng, trữ tình bắt nguồn từ dòng nhạc country và folk vì giai điệu chậm, thong thả. '
        }
    ]

    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt'
        },
        {
            title: 'Tên thể loại',
            dataIndex: 'type',
            key: 'type',
            render: (_, items) => {

                if(editingRow === items.key){
                    return <form action="">
                        <Input type='text' width={123} setValue={setEditValue} value={items.type} />
                    </form>
                }
                else {
                    return <p onClick={() => setEditingRow(items.key)}>{items.type}</p>
                }
            }
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            render: (_, items) => {
                if(editingRow === items.key){
                    return <form action="">
                        <Input type='text' width={700} setValue={setEditValue} value={items.description} />
                    </form>
                }
                else {
                    return <p onClick={() => setEditingRow(items.key)}>{items.description}</p>
                }
            }
        },
        
    ]
    const featureProps = [
        {
            icon: AiOutlinePlus,
            text: 'Thêm mới'
        }
    ]

  return (
    <div className={root.editInformation}>
        <h3>Thông tin tác phẩm</h3>
        <div>
            <h4>Thể loại tác phẩm</h4>
            <CustomTable dataSrouce={dataSource} columns={columns} heightProps={65} />
        </div>
        <div className={root.buttons}>
            {editingRow ? 
            <>
                <Button type='primary' heightProps={38} widthProps={148} contentProps="Hủy" onClick={() => setEditingRow(0)}/>
                <Button type='secondary' heightProps={38} widthProps={148} contentProps="Lưu"/>
            </>: ''}
        </div>
        <FeatureInPage featureProps={featureProps} />
    </div>
  )
}

export default EditInformationPage