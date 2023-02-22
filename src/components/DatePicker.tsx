import { DatePicker } from 'antd'
import React from 'react'
import styled from 'styled-components'

interface DataType {
    disabledDate?: any
    defaultValue?: any
    type?: string,
    onChange?: any
}

const DataPickerStyled = styled(DatePicker)`
    &&& {
        :where(.css-dev-only-do-not-override-1n7nwfa).ant-picker {
            background: #1E1E2E;
            color: white;
            border: 1px solid #FF7506;
            box-shadow: none;
            height: 35px;
            .ant-picker-input >input {
                color: var(--white);
            }
            & ::placeholder {
                color: var(--white);
            }
            & svg {
                color: var(--orange);
            }
        }
    }
`

function CustomDatePicker({disabledDate, defaultValue, type, onChange}: DataType) {
  return (
    <DataPickerStyled 
        disabledDate={disabledDate} 
        defaultValue={defaultValue} 
        onChange={onChange}
    />
  )
}

export default CustomDatePicker