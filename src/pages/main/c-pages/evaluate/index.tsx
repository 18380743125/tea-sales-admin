import { memo, useEffect, useRef, useState, useCallback } from 'react'
import { Button as AButton, Pagination, Skeleton, Empty } from 'antd'
import { useAppSelector, shallowEqualApp, useAppDispatch } from '@/store'
import { queryEvaluateAction } from '@/store/modules/evaluate'
import { Wrapper } from './style'
import { Input } from 'antd'
import EvaluateList from './c-cpns/evaluate-list'

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

  return (
    <Wrapper>
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
        <EvaluateList evaluates={evaluates} loadData={loadData} />
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
