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
                            <td><p>{item.customerName}</p></td>
                            <td><p>{item.created}</p></td>
                            <td><p>{item.startDay}</p></td>
                            <td><p>{item.date}</p></td>
                            <td><p>{item.timeActive}</p></td>
                            <td><p>{item.status}</p></td>
                            <td><p>{item.status2}</p></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table