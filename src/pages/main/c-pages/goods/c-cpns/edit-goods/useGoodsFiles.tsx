import { message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { getBase64, checkImageFormat } from '@/utils/format'
import { useState } from 'react'

const useGoodsFiles = (limitSize: number, setLimitSize: Function, id: number, maxCount: number) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [previewImage, setPreviewImage] = useState('')
  const [previewOpen, setPreviewOpen] = useState(false)

  // 校验图片格式
  const handleFileChange: UploadProps['onChange'] = ({ file, fileList }) => {
    const { isJpgOrPng, isLt10M } = checkImageFormat(file as RcFile)
    if (isJpgOrPng && isLt10M) {
      setFileList(fileList)
    }
  }

  // 文件列表 props
  const filesUploadProps: UploadProps = {
    listType: 'picture-card',
    fileList,
    maxCount,
    multiple: !id,
    onChange: handleFileChange,
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
      setLimitSize(limitSize + 1)
    },
    beforeUpload: (file) => {
      const { isJpgOrPng, isLt10M } = checkImageFormat(file)
      if (isJpgOrPng && isLt10M) {
        setFileList([...fileList, file])
        setLimitSize(limitSize - 1)
      }
      if (!isJpgOrPng) message.error('图片格式错误！')
      if (!isLt10M) message.error('图片大小不能超过2MB')
      return false
    },
    onPreview: async (file: UploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as RcFile)
      }
      setPreviewImage(file.url || (file.preview as string))
      setPreviewOpen(true)
    }
  }

  // 上传区域
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8
        }}
      >
        上传
      </div>
    </div>
  )

  return {
    fileList,
    previewImage,
    setPreviewImage,
    previewOpen,
    setPreviewOpen,
    uploadButton,
    filesUploadProps
  }
}

export default useGoodsFiles
