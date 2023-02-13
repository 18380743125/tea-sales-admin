import { useState, useEffect, useCallback } from 'react'
import { Input, Button, Table, Select, ConfigProvider, Skeleton } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

import useGoodsTable from './useGoodsTable'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import { IQueryGoodsType } from '@/types/goods'
import { queryCategoriesAction, queryGoodsAction } from '@/store/modules/goods'
import { Wrapper } from './style'

const { Option } = Select

export default function Fruit() {
  // 分页参数及数据集
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [name, setName] = useState('')
  const [category, setCategory] = useState(0)

  const { goods, count, loading, categories } = useAppSelector(
    (state) => ({
      goods: state.goods.goods,
      count: state.goods.count,
      loading: state.goods.loading,
      categories: state.goods.categories
    }),
    shallowEqualApp
  )
  const dispatch = useAppDispatch()

  const loadData = useCallback(() => {
    const params: IQueryGoodsType = { page, size }
    name && (params.name = name)
    if (category) params.category = category
    dispatch(queryGoodsAction(params))
  }, [page, size, name, category])

  // 初始化操作
  useEffect(() => {
    dispatch(queryCategoriesAction())
    loadData()
  }, [])

  // hooks
  const { columns } = useGoodsTable(loadData)

  // 处理切换页码
  const pageChangeClick = (page: number) => {
    setPage(page)
    loadData()
  }

  // 处理页码 size 改变
  const pageSizeChangeClick = (page: number, size: number) => {
    setPage(page)
    setSize(size)
    loadData()
  }

  // 处理搜索
  const searchClick = () => {
    setPage(1)
    loadData()
  }

  return (
    <Wrapper>
      {/* 操作区域 */}
      <div className="handle">
        <div className="search-name">
          <Input
            allowClear
            width={300}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="请输入商品名称"
          />
        </div>
        <Select
          value={category}
          onChange={(value) => setCategory(value)}
          style={{ marginLeft: 10, width: 120 }}
          placeholder="全部类别"
          optionFilterProp="children"
          notFoundContent="无"
        >
          <Option key="category" value={0}>
            全部类别
          </Option>
          {!!categories.length &&
            categories.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
        </Select>
        <Button onClick={searchClick} style={{ marginLeft: 10 }} type="primary">
          搜索
        </Button>
        <Button type="primary" style={{ marginLeft: 30 }}>
          添加商品
        </Button>
        <div className="category-btn">
          <Button type="primary" style={{ marginLeft: 10 }}>
            类别列表
          </Button>
          <Button type="primary" style={{ marginLeft: 20 }}>
            添加类别
          </Button>
        </div>
      </div>
      {loading ? (
        <Skeleton active paragraph={{ rows: 7 }} />
      ) : (
        <ConfigProvider locale={zhCN}>
          <Table
            bordered
            style={{ marginRight: 6 }}
            rowKey={(record) => record.id}
            dataSource={goods || []}
            columns={columns}
            locale={{ emptyText: '暂无数据' }}
            size="small"
            pagination={{
              size: 'default',
              current: page,
              pageSize: size,
              total: count,
              showSizeChanger: true,
              onChange: pageChangeClick,
              onShowSizeChange: pageSizeChangeClick
            }}
          />
        </ConfigProvider>
      )}
    </Wrapper>
  )
}
