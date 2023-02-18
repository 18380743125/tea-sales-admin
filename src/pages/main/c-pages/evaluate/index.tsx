import { memo, useEffect, useRef, useState, useCallback } from 'react'
import { Button as AButton, Pagination, Skeleton, message, Empty } from 'antd'
import { Button } from '@mui/material'
import { useAppSelector, shallowEqualApp, useAppDispatch } from '@/store'
import { queryEvaluateAction } from '@/store/modules/evaluate'
import { Wrapper } from './style'
import { BASE_URL } from '@/service/config'
import { Input, Rate } from 'antd'
import Confirm from '@/components/Confirm'
import { removeEvaluateReq } from '@/service/modules/evaluate'
import debounce from '@/utils/debounce'

const Evaluate = () => {
  const dispatch = useAppDispatch()
  const { evaluates, count, loading } = useAppSelector(
    (state) => ({
      evaluates: state.evaluate.evaluates,
      count: state.evaluate.count,
      loading: state.evaluate.loading
    }),
    shallowEqualApp
  )
  const pageRef = useRef(1)

  const sizeRef = useRef(10)
  const [uname, setUname] = useState('')
  const [goodsName, setGoodsName] = useState('')
  const [removeOpen, setRemoveOpen] = useState(false)
  const [operatingEvaluate, setOperatingEvaluate] = useState<null | Record<string, any>>(null)

  // 加载数据
  const loadData = useCallback(() => {
    dispatch(
      queryEvaluateAction({ page: pageRef.current, size: sizeRef.current, uname, goodsName })
    )
  }, [pageRef, uname, goodsName, sizeRef])

  // 初始化页面数据
  useEffect(() => {
    loadData()
  }, [])

  // 切换页面
  const pageChangeClick = (page: number, size: number) => {
    pageRef.current = page
    sizeRef.current = size
    loadData()
  }

  // 页码改变
  const pageChangeSizeClick = (page: number, size: number) => {
    pageRef.current = page
    sizeRef.current = size
    loadData()
  }

  // 搜索
  const searchClick = () => {
    pageRef.current = 1
    loadData()
  }

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

      {/* 操作区域 */}
      <div className="handle">
        <div className="search-input">
          <Input
            allowClear
            width={300}
            value={goodsName}
            onChange={(e) => setGoodsName(e.target.value)}
            placeholder="请输入商品名称"
          />
        </div>
        {/* 手机号 */}
        <div className="search-input">
          <Input
            allowClear
            width={200}
            value={uname}
            onChange={(e) => setUname(e.target.value)}
            placeholder="请输入用户名"
          />
        </div>
        <AButton onClick={searchClick} style={{ marginLeft: 10 }} type="primary">
          搜索
        </AButton>
      </div>

      {loading ? (
        <Skeleton active paragraph={{ rows: 7 }} />
      ) : (
        <div className="list">
          {evaluates.map((item) => (
            <div className="item" key={item.id}>
              <div className="user">
                {/* 用户头像 */}
                <div className="img">
                  <img
                    src={
                      item?.user?.avatar ? BASE_URL + `/avatar/${item.user.avatar?.filename}` : ''
                    }
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

              {/* 删除评价及查看评论 */}
              <div className="operation">
                <Button color="info" sx={{ fontSize: 14 }}>
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
      )}

      {/* 空状态 */}
      {!loading && !evaluates.length && <Empty />}

      {/* 分页 */}
      {!!evaluates.length && (
        <div className="pagination">
          <Pagination
            size="default"
            showSizeChanger
            pageSize={sizeRef.current}
            total={count}
            current={pageRef.current}
            onChange={pageChangeClick}
            onShowSizeChange={pageChangeSizeClick}
          />
        </div>
      )}
    </Wrapper>
  )
}

export default memo(Evaluate)
