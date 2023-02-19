import { Modal, Empty, message } from 'antd'
import { memo, useEffect, useState } from 'react'
import EvaluateItem from '../evaluate-item'
import CommentHeader from '../comment-header'
import { getCommentsReq, removeCommentReq } from '@/service/modules/evaluate'
import debounce from '@/utils/debounce'
import { Wrapper } from './style'
import useComments from './useComments'
import Confirm from '@/components/Confirm'
import CommentReply from '../comment-reply'

interface IProps {
  open: boolean
  setOpen: Function
  evaluate: Record<string, any>
}

const EvaluateComment = ({ open, setOpen, evaluate }: IProps) => {
  const [comments, setComments] = useState([])
  const [total, setTotal] = useState()
  const [operatingComment, setOperatingComment] = useState<Record<string, any> | null>(null)
  const [removeOpen, setRemoveOpen] = useState(false)
  const [replyOpen, setReplyOpen] = useState(false)

  // hooks
  const Comments = useComments({ comments, setRemoveOpen, setOperatingComment, setReplyOpen })

  // 获取要删除评论的 ids
  const getIds = (comment: any) => {
    if (!comment) return []
    const ids = [comment.id]
    if (comment.children) {
      for (const item of comment.children) {
        ids.push(...getIds(item))
      }
    }
    return ids
  }
  // 删除评论
  const removeClick = () => {
    if (operatingComment === null) return
    const ids = getIds(operatingComment)
    removeCommentReq(ids).then((res) => {
      if (res.message === 'ok') {
        message.success('删除成功~')
        setRemoveOpen(false)
        loadData()
      }
    })
  }

  // 加载评论数据
  const loadData = debounce(() => {
    getCommentsReq(evaluate.id).then((res) => {
      if (res.message === 'ok') {
        setComments(res.data[0])
        setTotal(res.data[1])
      }
    })
  }, 500)

  // 初始化数据
  useEffect(() => {
    loadData()
  }, [])

  return (
    <Modal
      title={
        <div
          style={{
            color: '#00b96b',
            paddingBottom: 10
          }}
        >
          共 {total} 条评论
        </div>
      }
      footer={null}
      centered
      destroyOnClose={true}
      maskClosable={false}
      open={open}
      onCancel={() => {
        setOpen(false)
      }}
      width={1100}
    >
      <Wrapper>
        {/* 删除评论的确认框 */}
        <Confirm
          title="你确认要删除该条评论吗？"
          open={removeOpen}
          setOpen={setRemoveOpen}
          okClick={removeClick}
        />

        {/* 回复评论弹出层 */}
        {operatingComment && (
          <CommentReply
            fetchData={loadData}
            comment={operatingComment}
            open={replyOpen}
            setOpen={setReplyOpen}
            evaluateId={evaluate.id}
          />
        )}

        <EvaluateItem item={evaluate} />
        {/* 发表评论 */}
        <CommentHeader id={evaluate.id} fetchData={loadData} />

        <div className="comments">
          {comments && !!comments.length ? Comments : <Empty description="暂无评论" />}
        </div>
      </Wrapper>
    </Modal>
  )
}

export default memo(EvaluateComment)
