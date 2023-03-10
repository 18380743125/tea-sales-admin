import { RcFile } from 'antd/es/upload'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

// 格式化时间
export function formatUTC(utcString: string | number, format = 'YYYY-MM-DD HH:mm:ss') {
  const resultTime = dayjs.utc(utcString).utcOffset(8).format(format)
  return resultTime
}

// 将 blob 转 base64
export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

// 检查图片格式 大小
export const checkImageFormat = (file: RcFile) => {
  const types = ['image/jpeg', 'image/png', 'image/png']
  const isJpgOrPng = types.includes(file.type)
  const isLt10M = file.size / 1024 / 1024 < 10
  return { isJpgOrPng, isLt10M }
}
