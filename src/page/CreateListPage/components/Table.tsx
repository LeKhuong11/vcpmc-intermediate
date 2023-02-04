import React from 'react'
import root from '../../../components/table.module.scss';


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
                            <td><p>{item.name}</p></td>
                            <td><p>{item.time}</p></td>
                            <td><p><a href="">{item.status}</a></p></td>
                            <td><p><a href="">{item.status2}</a></p></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table