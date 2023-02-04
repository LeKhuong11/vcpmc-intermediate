import React from 'react'
import root from '../../../components/table.module.scss';
import Topic from './Topic';


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
                            <td><p>{item.title}</p></td>
                            <td><p>{item.quantity}</p></td>
                            <td><p>{item.time}</p></td>
                            <td><p><Topic texts={item.topics} /></p></td>
                            <td><p>{item.date}</p></td>
                            <td><p>{item.auth}</p></td>
                            <td><p><a href="">{item.status}</a></p></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table