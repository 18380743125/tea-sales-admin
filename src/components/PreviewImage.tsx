import { memo } from 'react'
import { Modal } from 'antd'

type Props = {
  open: boolean
  url: string
  setOpen: Function
}

const PreviewImage = ({ url, open, setOpen }: Props) => {
  return (
    <Modal maskClosable={false} open={open} footer={null} onCancel={() => setOpen(false)}>
      <img alt="preview" style={{ width: '100%' }} src={url} />
    </Modal>
  )
}

export default memo(PreviewImage)
