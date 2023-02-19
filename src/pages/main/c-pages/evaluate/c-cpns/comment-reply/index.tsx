import { publishCommentReq } from '@/service/modules/evaluate'
import { useAppDispatch } from '@/store'
import { changeOpen } from '@/store/modules/main'
import { localCache } from '@/utils/cache'
import { isAdmin } from '@/utils/admin.util'
import { ConfigProvider, Form, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { memo, useState } from 'react'
import { ReplyWrapper } from './style'
import { ConstEnum } from '@/enum/constant.enum'

interface Props {
  open: boolean
  comment: Record<string, any>
  evaluateId: number
  setOpen: Function
  fetchData: Function
}

const CommentReply = memo(({ open, setOpen, comment, evaluateId, fetchData }: Props) => {
  const [content, setContent] = useState('')
  const dispatch = useAppDispatch()

  const handleSubmit = () => {
    if (!content) {
      return dispatch(changeOpen({ type: 'error', open: true, message: '内容不能为空' }))
    }

    const token = localCache.getCache(ConstEnum.ACCESS_TOKEN)
    if (!token) {
      return dispatch(changeOpen({ type: 'error', open: true, message: '请先登录' }))
    }

    const user = localCache.getCache('user')
    if (user.banned === '1') {
      return dispatch(
        changeOpen({ type: 'error', open: true, message: '您已被禁止评论, 请联系管理员' })
      )
    }

    publishCommentReq({
      content,
      parentId: comment.id,
      evaluateId
    }).then((res) => {
      if (res.message === 'ok') {
        dispatch(changeOpen({ type: 'success', open: true, message: '回复成功' }))
        setContent('')
        fetchData()
        setOpen(false)
      }
    })
  }

  return (
    <ReplyWrapper>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#3d6079'
          }
        }}
      >
        <Modal
          style={{ top: -50, color: '#3d6079' }}
          title={
            <span>
              我回复@{comment.name}
              {isAdmin(comment.roles) && (
                <span style={{ color: '#1677ff', fontSize: 13, marginLeft: 4 }}>(管理员)</span>
              )}
            </span>
          }
          centered
          cancelText="取消"
          okText="提交"
          open={open}
          onOk={handleSubmit}
          onCancel={() => {
            setOpen('')
            setOpen(false)
          }}
          width={700}
        >
          <Form
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600, marginTop: 20 }}
            autoComplete="off"
          >
            <Form.Item label="标题" name="title">
              <TextArea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ width: 600 }}
                showCount
                maxLength={200}
                rows={4}
                color="#f0f1f4"
                placeholder="回复你的评论"
              />
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>
    </ReplyWrapper>
  )
})

export default CommentReply
