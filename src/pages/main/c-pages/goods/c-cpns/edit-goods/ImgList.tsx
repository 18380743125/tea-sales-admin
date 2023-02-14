import { memo, useState } from 'react'
import classNames from 'classnames'
import { changeOpen } from '@/store/modules/main'
import { removeGoodsImgReq } from '@/service/modules/goods'
import { BASE_URL } from '@/service/config'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import Confirm from '@/components/Confirm'
import { useAppDispatch } from '@/store'
import PreviewImage from '@/components/PreviewImage'

interface IProps {
  id: number
  imgs: Record<string, any>[]
  maxCount: number
  loadGoods: Function
  setMaxCount: Function
}

const ImgList = ({ id, imgs, loadGoods, setMaxCount, maxCount }: IProps) => {
  const [filename, setFileName] = useState('') // 待删除图片名称
  const [delOpen, setDelOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewOpen, setPreviewOpen] = useState(false)
  const dispatch = useAppDispatch()

  // 预览现有图片
  const handleEyeClick = (imgUrl: string) => {
    setPreviewImage(imgUrl)
    setPreviewOpen(true)
  }

  // 删除图片
  const handleDelImg = () => {
    removeGoodsImgReq(filename).then((res) => {
      if (res.message === 'ok') {
        dispatch(changeOpen({ type: 'success', message: '删除成功~' }))
        setDelOpen(false)
        loadGoods()
        setMaxCount(maxCount + 1)
      }
    })
  }
  return (
    <>
      {/* 删除图片确认框 */}
      <Confirm
        title="你确认要删除该张图片吗？"
        open={delOpen}
        setOpen={setDelOpen}
        okClick={handleDelImg}
      />

      {/* 预览图片 */}
      <PreviewImage url={previewImage} open={previewOpen} setOpen={setPreviewOpen} />

      {/* 编辑前的图片 */}
      {!!id && !!imgs.length && <div style={{ color: '#4ece98', paddingBottom: 20 }}>现有图片</div>}
      {!!id && !!imgs.length && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start'
          }}
        >
          {imgs.map((item: any) => (
            <div
              className="goods-img"
              style={{
                marginRight: 4,
                marginBottom: 10,
                boxShadow: '0 0 6px rgba(0, 0, 0, .3)'
              }}
              key={item.id}
            >
              {/* 预览图片 */}
              <EyeOutlined
                className="eye"
                onClick={() => handleEyeClick(`${BASE_URL}/goods/${item.filename}`)}
              />

              {/* 删除图片 */}
              <DeleteOutlined
                onClick={() => {
                  setFileName(item.filename)
                  setDelOpen(true)
                }}
                className={classNames('eye', 'delete')}
              />
              <img
                className="img"
                style={{ borderRadius: 3 }}
                width={100}
                src={`${BASE_URL}/goods/${item.filename}`}
              />
              <div className="cover"></div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default memo(ImgList)
