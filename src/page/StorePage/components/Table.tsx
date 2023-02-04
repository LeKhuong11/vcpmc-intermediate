import React from 'react'
import root from '../../../components/table.module.scss'

interface Iprops {
    columnMusic: string[],
    storeMusic: any[],
    heightProp: number
}
function Table( {columnMusic, storeMusic, heightProp}: Iprops) {

  return (
    <div className={root.table} style={{height: `${heightProp}vh`}}>
        <table>
            <thead>
                <tr>
                {
                    columnMusic.map((item, index) => (
                        <th key={index}><p>{item}</p></th>
                    ))
                }
                </tr>
            </thead>
            <tbody>
                {
                    storeMusic.map(item => (
                        <tr key={item.id}>
                            <td><p>{item.stt}</p></td>
                            <td><p>{item.nameMusic}</p></td>
                            <td><p>{item.IRCId}</p></td>
                            <td><p>{item.time}</p></td>
                            <td><p>{item.singer}</p></td>
                            <td><p>{item.auth}</p></td>
                            <td><p>{item.type}</p></td>
                            <td><p>{item.format}</p></td>
                            <td><p>{item.date}</p></td>
                            <td><p><a href="">{item.status}</a></p></td>
                            <td><p><a href="">{item.status2 ? item.status2 : ''}</a></p></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table