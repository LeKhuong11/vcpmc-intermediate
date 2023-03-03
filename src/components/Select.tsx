import { Select } from 'antd'
import React from 'react'
import styled from 'styled-components'

interface ISelect {
    onChange?: any
    items: any
    value: any
    width?: number
}

const SelectStyled = styled(Select)`
    &&& {
        :where(.css-dev-only-do-not-override-1n7nwfa).ant-select:not(.ant-select-customize-input) .ant-select-selector{
            background-color: var(--violet);
            height: 43px;
            border: 1px solid var(--orange);
        }
        :where(.css-dev-only-do-not-override-1n7nwfa).ant-select .ant-select-arrow {
            top: 50%;
            right: 10px;
            color: var(--white);
        }
        .ant-select-selection-item {
            color: var(--white);
            top: 15%;
        }
    }
`


function CustomSelect({onChange, items, value, width = 120}: ISelect) {
  return (
    <SelectStyled
        style={{ width: width }}
        onChange={onChange}
        options={items.map((item: any) => ({ label: item, value: item }))}
        value={value}
    />
  )
}

export default CustomSelect