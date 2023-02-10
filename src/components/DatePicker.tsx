import { DatePicker } from 'antd'
import React from 'react'
import styled from 'styled-components'

interface DataType {
    disabledDate: any
}

const DataPickerStyled = styled(DatePicker)`
    &&& {
        :where(.css-dev-only-do-not-override-1n7nwfa).ant-picker {
            background: #1E1E2E;
            color: white;
            border: 1px solid #FF7506;
            box-shadow: none;

            & ::placeholder {
                color: var(--white);
            }
            & svg {
                color: var(--orange);
            }
        }
    }
`

function CustomDatePicker({disabledDate}: DataType) {
  return (
    <DataPickerStyled picker="month" disabledDate={disabledDate} />
  )
}

export default CustomDatePicker