import { Alert } from 'antd'
import React from 'react'

import './Error.css'
const onClose = (e) => {
  console.log(e, 'I was closed.')
}
const Error = () => (
  <>
    <Alert
      message='Нет подключения к сети'
      description='Проверьте настройки сетевого подкючения'
      type='error'
      closable
      onClose={onClose}
    />
  </>
)
export default Error
