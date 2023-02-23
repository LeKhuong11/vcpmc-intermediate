import React from 'react'
import styled from 'styled-components'
import { Modal } from 'antd'

const ModalStyled = styled(Modal)`
    &&& {
        .ant-modal-content {
            background-color: #3E3E5B;
            height: 40vh;
        }
        .ant-modal-title {
            text-align: center;
            color: var(--white);
            background-color: #3E3E5B;
            font-size: 23px;
        }
        .ant-modal-footer {
            display: flex;
            justify-content: center;
        }
        .ant-btn {
            width: 100px;
            border: 1.5px solid var(--orange);
            color: var(--orange);
            background-color: #3E3E5B;
        }
        .ant-btn-primary {
            background-color: var(--orange);
            color: var(--white);
        }
        & textarea {
            width: 100%;
            height: 120px;
            background-color: #2B2B3F;
            color: var(--white);
            border-radius: 8px;
            border: none;
            font-family: 'Montserrat';
            padding: 12px;
        }
    }
`

interface IModal {
    title: string
    openModal: boolean
    handleOk: any
    handleCancel: any
    content: any
}

function CustomModal({title, openModal, handleOk, handleCancel, content}: IModal) {
  return (
    <ModalStyled
        title={title}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
    >
        {content}
    </ModalStyled>
  )
}

export default CustomModal