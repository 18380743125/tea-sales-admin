import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { ConfigProvider, Skeleton, Input, Select, Button, message } from 'antd'
import Table from 'antd/es/table'
import zhCN from 'antd/es/locale/zh_CN'

import { useAppDispatch, useAppSelector } from '@/store'
import { queryOrdersAction } from '@/store/modules/order'
import { getOrderStateDropDown } from '@/utils/order.util'
import { Wrapper } from './style'
import useOrderTable from './useOrderTable'
import { IQueryOrderType } from '@/types/order'
import { phoneRegExp } from '@/utils/regexp'
import DeliverGoods from './c-cpns/deliver-goods'

const { Option } = Select

const Order = () => {
  const dispatch = useAppDispatch()
  const { orders, count, loading } = useAppSelector((state) => ({
    orders: state.order.orders,
    count: state.order.count,
    loading: state.order.loading
  }))
  const pageRef = useRef(1)
  const sizeRef = useRef(10)
  const [state, setState] = useState('-1')
  const [gname, setGname] = useState('')
  const [phone, setPhone] = useState('')

  // hooks
  const { columns, operatingOrder, deliverOpen, setDeliverOpen } = useOrderTable()

  // 加载页面数据
  const loadData = useCallback(() => {
    const params: IQueryOrderType = {
      page: pageRef.current,
      size: sizeRef.current,
      goodsName: gname
    }
    if (state !== '-1') params.state = state
    if (phone !== '') params.phone = phone
    if (phone !== '' && !phoneRegExp.test(phone)) {
      message.error('手机号格式错误~')
      return
    }
    dispatch(queryOrdersAction(params))
  }, [pageRef, sizeRef, gname, state, phone])

  // 初始化数据
  useEffect(() => {
    loadData()
  }, [])

  // 处理切换页码
  const pageChangeClick = (page: number, size: number) => {
    pageRef.current = page
    sizeRef.current = size
    loadData()
  }

  // 处理搜索
  const searchClick = () => {
    pageRef.current = 1
    loadData()
  }

  return (
    <Wrapper>
      {/* 发货弹出层 */}
      {operatingOrder && (
        <DeliverGoods
          loadData={loadData}
          order={operatingOrder}
          open={deliverOpen}
          setOpen={setDeliverOpen}
        />
      )}

      {/* 操作区域 */}
      <div className="handle">
        <div className="search-input">
          <Input
            allowClear
            width={300}
            value={gname}
            onChange={(e) => setGname(e.target.value)}
            placeholder="请输入商品名称"
          />
        </div>
        {/* 手机号 */}
        <div className="search-input">
          <Input
            allowClear
            width={200}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="请输入用户手机号"
          />
        </div>

        <Select
          value={state}
          onChange={(value) => setState(value)}
          style={{ width: 120 }}
          placeholder="全部状态"
        >
          {getOrderStateDropDown().map((item) => (
            <Option key={item.value} value={item.value}>
              {item.text}
            </Option>
          ))}
        </Select>
        <Button onClick={searchClick} style={{ marginLeft: 10 }} type="primary">
          搜索
        </Button>
      </div>

      {loading ? (
        <Skeleton active paragraph={{ rows: 7 }} />
      ) : (
        <ConfigProvider locale={zhCN}>
          <Table
            bordered
            style={{ marginRight: 6 }}
            rowKey={(record) => record.id}
            dataSource={orders || []}
            columns={columns}
            locale={{ emptyText: '暂无数据' }}
            size="small"
            pagination={{
              size: 'default',
              current: pageRef.current,
              pageSize: sizeRef.current,
              total: count,
              showSizeChanger: true,
              onChange: pageChangeClick,
              onShowSizeChange: pageChangeClick
            }}
          />
        </ConfigProvider>
      )}
    </Wrapper>
  )
}

export default memo(Order)
