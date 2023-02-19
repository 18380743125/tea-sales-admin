import { memo } from 'react'
import { Rate } from 'antd'
import { BASE_URL } from '@/service/config'
import { Wrapper } from './style'

interface IProps {
  item: Record<string, any>
}

const EvaluateItem = ({ item }: IProps) => {
  return (
    <Wrapper>
      <div className="user">
        {/* 用户头像 */}
        <div className="img">
          <img
            src={item?.user?.avatar ? BASE_URL + `/avatar/${item.user.avatar?.filename}` : ''}
            alt=""
          />
        </div>
        {/* 用户基本信息 */}
        <div className="info">
          <div className="name">{item?.user?.name}</div>
          <div className="phone">{item.user.phone}</div>
        </div>

        {/* 订单信息 */}
        <div className="order">
          <div className="brief">
            <span className="name">{item?.order?.goods?.name}</span>
            <span className="weight">{item?.order?.goods?.weight}</span>
            <span className="desc">{item?.order?.goods?.description}</span>
            <span className="money">{item?.order?.money}</span>
            <span className="count">x{item?.order?.count}</span>
          </div>
          {/* 评分 */}
          <div className="star">
            <Rate allowHalf disabled defaultValue={item.star} />
          </div>
        </div>
      </div>

      {/* 评价内容 */}
      <div className="content">{item.content}</div>

      {/* 评价图片 */}
      <div className="evaluate-imgs">
        {item.imgs &&
          item.imgs.map((img: any) => (
            <div className="img-item" key={img.id}>
              <img src={`${BASE_URL}/evaluate/${img.filename}`} alt="" />
            </div>
          ))}
      </div>
    </Wrapper>
  )
}

export default memo(EvaluateItem)
