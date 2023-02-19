import { memo, useState } from 'react'
import { Button } from '@mui/material'
import { message } from 'antd'
import Confirm from '@/components/Confirm'
import { removeEvaluateReq } from '@/service/modules/evaluate'
import debounce from '@/utils/debounce'
import { Wrapper } from './style'
import EvaluateComment from '../evaluate-comment'
import EvaluateItem from '../evaluate-item'

interface IProps {
  evaluates: Array<Record<string, any>>
  loadData: Function
}

const EvaluateList = ({ evaluates, loadData }: IProps) => {
  const [removeOpen, setRemoveOpen] = useState(false)
  const [operatingEvaluate, setOperatingEvaluate] = useState<null | Record<string, any>>(null)
  const [commentOpen, setCommentOpen] = useState(false)

  const removeEvaluateDebounce = debounce((id: number) => {
    removeEvaluateReq(id).then((res) => {
      if (res.message === 'ok') {
        message.success('删除成功~')
        setRemoveOpen(false)
        loadData()
      }
    })
  }, 500)
  // 处理删除
  const okClick = () => {
    if (!operatingEvaluate) return
    removeEvaluateDebounce(operatingEvaluate.id)
  }
  return (
    <Wrapper>
      {/* 删除评价确认框 */}
      <Confirm
        okClick={okClick}
        title="你确认要删除该条评价吗？"
        open={removeOpen}
        setOpen={setRemoveOpen}
      />

      {/* 查看评论的弹出层 */}
      {operatingEvaluate && commentOpen && (
        <EvaluateComment open={commentOpen} setOpen={setCommentOpen} evaluate={operatingEvaluate} />
      )}

      <div className="list">
        {evaluates.map((item) => (
          <div className="item" key={item.id}>
            <EvaluateItem item={item} />

            {/* 删除评价及查看评论 */}
            <div className="operation">
              <Button
                onClick={() => {
                  setCommentOpen(true)
                  setOperatingEvaluate(item)
                }}
                color="info"
                sx={{ fontSize: 14 }}
              >
                查看评论
              </Button>
              <Button
                onClick={() => {
                  setRemoveOpen(true)
                  setOperatingEvaluate(item)
                }}
                color="error"
                sx={{ fontSize: 14 }}
              >
                删除
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  )
}

export default memo(EvaluateList)
