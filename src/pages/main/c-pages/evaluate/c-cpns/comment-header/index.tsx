import { memo, useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { Button } from '@mui/material'
import { useAppDispatch } from '@/store'
import { changeOpen } from '@/store/modules/main'
import { localCache } from '@/utils/cache'
import { publishCommentReq } from '@/service/modules/evaluate'
import { HeaderWrapper } from './style'
import { ConstEnum } from '../../../../../../enum/constant.enum'

interface Props {
  id: number
  fetchData: Function
}

const CommentHeader = memo(({ id, fetchData }: Props) => {
  const [content, setContent] = useState('')
  const dispatch = useAppDispatch()

  // 发表
  const handlePublishClick = () => {
    const token = localCache.getCache(ConstEnum.ACCESS_TOKEN) ?? ''
    let message = '请先登录'
    if (!content.trim().length) {
      message = '请输入评论内容'
      return dispatch(changeOpen({ open: true, message, type: 'error' }))
    }
    if (!token) return dispatch(changeOpen({ open: true, message, type: 'error' }))
    publishCommentReq({ content, evaluateId: id }).then((res) => {
      if (res.message === 'ok') {
        dispatch(changeOpen({ open: true, message: '发表成功', type: 'success' }))
        setContent('')
        fetchData()
      }
    })
  }
  return (
    <HeaderWrapper>
      <div className="text">全部评论</div>
      <div className="input-wrapper">
        <div className="input">
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: 700 }}
            showCount
            maxLength={150}
            rows={3}
            color="#f0f1f4"
            placeholder="发布你的评论"
          />
          <Button onClick={handlePublishClick} size="small" className="inp-btn" variant="contained">
            发表
          </Button>
        </div>
      </div>
    </HeaderWrapper>
  )
})

export default CommentHeader
