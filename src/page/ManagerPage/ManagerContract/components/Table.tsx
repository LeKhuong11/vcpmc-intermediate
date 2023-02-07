import React from 'react'
import { RxDotFilled } from 'react-icons/rx'
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
                            <td><p>{item.stt}</p></td>
                            <td><p>{item.contractID}</p></td>
                            <td><p>{item.contractName}</p></td>
                            <td><p>{item.authorized}</p></td>
                            <td><p>{item.autho}</p></td>
                            <td>
                              {item.timeActive ? 
                              (<p><RxDotFilled color='blue' size={18} />Còn thời hạn</p>) : 
                              (<p><RxDotFilled color='red' size={18} />Đã hủy</p>)}
                            </td>
                            <td><p>{item.created}</p></td>
                            <td><p>{item.status}</p></td>
                            {item.timeActive ? <td></td> : <td><p>Lý do hủy</p></td> }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table