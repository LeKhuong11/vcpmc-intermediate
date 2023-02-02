import React from 'react'
import styled from 'styled-components'
import root from './table.module.scss'

function Table() {

  return (
    <div>
        <table className={root.table}>
            <thead>
                <tr>
                    <th><p>STT</p></th>
                    <th><p>Tên bản ghi</p></th>
                    <th><p>Ma ISRC</p></th>
                    <th><p>Thời lượng</p></th>
                    <th><p>Ca sĩ</p></th>
                    <th><p>Tác giả</p></th>
                    <th><p>Thể loại</p></th>
                    <th><p>Định dạng</p></th>
                    <th><p>Thời hạn sử dụng</p></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><p>1</p></td>
                    <td><p>Mất em</p></td>
                    <td><p>KRA40105463</p></td>
                    <td><p>04:27</p></td>
                    <td><p>Phan Mạnh Quỳnh</p></td>
                    <td><p>Phan Mạnh Quỳnh</p></td>
                    <td><p>Ballad</p></td>
                    <td><p>Audio</p></td>
                    <td><p>Còn thời hạn</p></td>
                    <td><p><a href="">Cập nhật</a></p></td>
                    <td><p><a href="">Nghe</a></p></td>
                </tr>
                <tr>
                    <td><p>1</p></td>
                    <td><p>Mất em</p></td>
                    <td><p>KRA40105463</p></td>
                    <td><p>04:27</p></td>
                    <td><p>Phan Mạnh Quỳnh</p></td>
                    <td><p>Phan Mạnh Quỳnh</p></td>
                    <td><p>Ballad</p></td>
                    <td><p>Audio</p></td>
                    <td><p>Còn thời hạn</p></td>
                    <td><p><a href="">Cập nhật</a></p></td>
                    <td><p><a href="">Nghe</a></p></td>
                </tr>
                <tr>
                    <td><p>1</p></td>
                    <td><p>Mất em</p></td>
                    <td><p>KRA40105463</p></td>
                    <td><p>04:27</p></td>
                    <td><p>Phan Mạnh Quỳnh</p></td>
                    <td><p>Phan Mạnh Quỳnh</p></td>
                    <td><p>Ballad</p></td>
                    <td><p>Audio</p></td>
                    <td><p>Còn thời hạn</p></td>
                    <td><p><a href="">Cập nhật</a></p></td>
                    <td><p><a href="">Nghe</a></p></td>
                </tr>
                <tr>
                    <td><p>1</p></td>
                    <td><p>Mất em</p></td>
                    <td><p>KRA40105463</p></td>
                    <td><p>04:27</p></td>
                    <td><p>Phan Mạnh Quỳnh</p></td>
                    <td><p>Phan Mạnh Quỳnh</p></td>
                    <td><p>Ballad</p></td>
                    <td><p>Audio</p></td>
                    <td><p>Còn thời hạn</p></td>
                    <td><p><a href="">Cập nhật</a></p></td>
                    <td><p><a href="">Nghe</a></p></td>
                </tr>
                <tr>
                    <td><p>1</p></td>
                    <td><p>Mất em</p></td>
                    <td><p>KRA40105463</p></td>
                    <td><p>04:27</p></td>
                    <td><p>Phan Mạnh Quỳnh</p></td>
                    <td><p>Phan Mạnh Quỳnh</p></td>
                    <td><p>Ballad</p></td>
                    <td><p>Audio</p></td>
                    <td><p>Còn thời hạn</p></td>
                    <td><p><a href="">Cập nhật</a></p></td>
                    <td><p><a href="">Nghe</a></p></td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Table