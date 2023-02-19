import { ReactNode } from 'react'
import { Button } from '@mui/material'
import { formatUTC } from '@/utils/format'
import { BASE_URL } from '@/service/config'
import { isAdmin } from '@/utils/admin.util'

interface IProps {
  comments: Array<Record<string, any>>
  setRemoveOpen: Function
  setOperatingComment: Function
  setReplyOpen: Function
}

export default function useComments({
  comments,
  setRemoveOpen,
  setOperatingComment,
  setReplyOpen
}: IProps) {
  function render(comments: any[], isTop = true) {
    const res: Array<ReactNode> = []

    for (let i = 0; i < comments.length; i++) {
      const item = comments[i]
      const childrens: any = []
      const topItem = (
        <div
          style={{
            marginLeft: isTop ? 0 : 30,
            borderTop: isTop && i !== 0 ? '1px solid #eee' : 'none'
          }}
          key={item.id}
          className="item"
        >
          {/* 头像 */}
          <div className="avatar">
            <img src={item?.avatarUrl ? `${BASE_URL}/avatar/${item.avatarUrl}` : ''} alt="" />
          </div>
          {/* 内容及用户名 */}
          <div className="main">
            <div className="content">{item?.content}</div>
            <div className="infor">
              <div className="author">
                {item?.name}

                {isAdmin(item.roles) && (
                  <span style={{ color: '#1677ff', fontSize: 13, marginLeft: 4 }}>(管理员)</span>
                )}

                {isTop ? '' : <span style={{ fontSize: 13, margin: '0 6px' }}>回复给</span>}
                {item?.parentName}
                {item?.parentName && isAdmin(item.parentRoles) && (
                  <span style={{ color: '#1677ff', fontSize: 13, marginLeft: 4 }}>(管理员)</span>
                )}
              </div>
              <div className="time">{formatUTC(item?.createAt, 'YYYY-MM-DD HH:mm')}</div>
            </div>
          </div>
          <div className="btn">
            <Button
              onClick={() => {
                setReplyOpen(true)
                setOperatingComment(item)
              }}
            >
              回复
            </Button>
            <Button
              onClick={() => {
                setOperatingComment(item)
                setRemoveOpen(true)
              }}
              color="error"
            >
              删除
            </Button>
          </div>
        </div>
      )
      childrens.push(topItem)
      if (item.children) childrens.push(render(item.children, false))
      // 本层递归结束
      res.push(childrens)
    }
    return res
  }

  return render(comments)
}
