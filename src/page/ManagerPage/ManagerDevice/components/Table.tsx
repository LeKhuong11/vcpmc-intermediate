import React from 'react'
import { Checkbox } from 'antd'
import { RxDotFilled } from "react-icons/rx";
import root from '../../../../components/table.module.scss'

interface Iprops {
    column: string[],
    store: any[],
    heightProp: number
}

function Table( {column, store, heightProp}: Iprops) {

  return (
    <div className={root.table} style={{height: `${heightProp}vh`}}>
        <table>
            <thead>
                <tr>
                {
                  column.map((item, index) => (
                      <th key={index}><p>{item}</p></th>
                  ))
                }
                </tr>
            </thead>
            <tbody>
                {
                    store.map(item => (
                      <tr key={item.id}>
                            <td><span><Checkbox /></span></td>
                            <td><p>{item.stt}</p></td>
                            <td><p>{item.nameDevice}</p></td>
                            <td>
                              {item.status ? 
                              (<p><RxDotFilled color='green' size={18} />Đang kích hoạt | Đang hoạt động </p>) : 
                              (<p><RxDotFilled color='red' size={18} />Ngừng kích hoạt </p>)}
                            </td>
                            <td><p>{item.address}</p></td>
                            <td><p>{item.duration}</p></td>
                            <td><p>{item.MacAddress}</p></td>
                            <td><p>{item.memory}</p></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table