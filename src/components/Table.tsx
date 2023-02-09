import { Table } from 'antd'
import React from 'react'
import styled from 'styled-components'

const TableStyled = styled(Table)`
    &&& {
        :where(.css-dev-only-do-not-override-1n7nwfa).ant-table-wrapper   {
            width: 100%;
        }
        .ant-table {
            background-color: #2F2F41;
            border-radius: 8px;
        }
        .ant-table-content {
            padding: 10px;
        }
        .ant-table-thead {
            border: none;
        }
        .ant-table-cell {
            background-color: #2F2F41;
            color: var(--orange);
            border: none;
            padding: 8px;
            font-family: "Montserrat";
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            color: var(--orange);
            vertical-align: middle;
        }
        :where(.css-dev-only-do-not-override-1n7nwfa).ant-table-wrapper .ant-table-thead >tr>th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before, :where(.css-dev-only-do-not-override-1n7nwfa).ant-table-wrapper .ant-table-thead >tr>td:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
            width: 0;
        }
        .ant-table-tbody {
            tr {
                td {
                    border: none;
                }
            }
            .ant-table-row {
                border-bottom: 1px solid rgb(97, 96, 96);
            }
            .ant-table-cell {
                font-family: "Montserrat";
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 17px;
                color: #d1d1d1;
                vertical-align: middle;
                border-bottom: 1px solid rgb(97, 96, 96);
            }
            .ant-table-cell-row-hover {
                background-color: rgba(66, 66, 83, 0.7);
            }
        }
        .ant-pagination {
            display: none;
        }
        .ant-table-tbody >tr:last-child>td {
            border: none;
        }
        a {
            color: var(--orange);
            text-decoration: underline;
        }
        p {
            font-size: 12px;
        }
    }
`
const TableContainerStyled = styled.div`
    background-color: #2F2F41;
    border-radius: 8px;
    width: 93%;
`

interface ITableProps {
    columns: any[],
    dataSrouce: any[],
    heightProps: number
}

function CustomTable({columns, dataSrouce, heightProps}: ITableProps) {
  return (
    <TableContainerStyled style={{height: `${heightProps}vh`}}>
        <TableStyled columns={columns} dataSource={dataSrouce} />
    </TableContainerStyled>
  )
}

export default CustomTable