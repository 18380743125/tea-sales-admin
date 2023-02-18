import { useState, useEffect, useCallback, useRef } from 'react'
import { Input, Button, Table, Select, ConfigProvider, Skeleton } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import { queryCategoriesAction, queryGoodsAction } from '@/store/modules/goods'
import type { IQueryGoodsType } from '@/types/goods'
import useGoodsTable from './useGoodsTable'
import { Wrapper } from './style'
import AddCategory from './c-cpns/add-category'
import ListCategory from './c-cpns/list-category'
import EditGoods from './c-cpns/edit-goods'
import Discount from './c-cpns/discount'

const { Option } = Select

export default function Goods() {
  // 分页参数及数据集
  const pageRef = useRef(1)
  const sizeRef = useRef(10)
  const [name, setName] = useState('')
  const [category, setCategory] = useState(0)

  // 弹出层
  const [addCateOpen, setAddCateOpen] = useState(false)
  const [listCateOpen, setListCateOpen] = useState(false)
  const [addGoodsOpen, setAddGoodsOpen] = useState(false)

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

  // 加载页面数据
  const loadData = useCallback(() => {
    const params: IQueryGoodsType = { page: pageRef.current, size: sizeRef.current }
    name && (params.name = name)
    if (category) params.category = category
    dispatch(queryGoodsAction(params))
  }, [pageRef, sizeRef, name, category])

  // 初始化操作
  useEffect(() => {
    dispatch(queryCategoriesAction())
    loadData()
  }, [])

  // hooks
  const {
    columns,
    operatingGoods,
    editGoodsOpen,
    setEditGoodsOpen,
    discountOpen,
    setDiscountOpen
  } = useGoodsTable(loadData)

  // 处理切换页码
  const pageChangeClick = (page: number) => {
    pageRef.current = page
    loadData()
  }

  // 处理页码 size 改变
  const pageSizeChangeClick = (page: number, size: number) => {
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
      {/* 添加类别 */}
      {addCateOpen && <AddCategory open={addCateOpen} setOpen={setAddCateOpen} />}

      {/* 类别列表 */}
      {listCateOpen && (
        <ListCategory
          loadData={loadData}
          categories={categories}
          open={listCateOpen}
          setOpen={setListCateOpen}
        />
      )}

      {/* 添加商品 */}
      {addGoodsOpen && (
        <EditGoods
          categories={categories}
          loadData={loadData}
          open={addGoodsOpen}
          setOpen={setAddGoodsOpen}
        />
      )}

      {/* 编辑商品 */}
      {editGoodsOpen && (
        <EditGoods
          categories={categories}
          loadData={loadData}
          open={editGoodsOpen}
          setOpen={setEditGoodsOpen}
          operatingGoods={operatingGoods}
        />
      )}

      {/* 折扣管理 */}
      {discountOpen && operatingGoods && (
        <Discount operatingGoods={operatingGoods} open={discountOpen} setOpen={setDiscountOpen} />
      )}

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
          showSearch
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

        {/* 新增商品 */}
        <Button onClick={() => setAddGoodsOpen(true)} type="primary" style={{ marginLeft: 30 }}>
          添加商品
        </Button>

        {/* 类别操作 */}
        <div className="category-btn">
          <Button onClick={() => setListCateOpen(true)} type="primary" style={{ marginLeft: 10 }}>
            类别列表
          </Button>
          <Button onClick={() => setAddCateOpen(true)} type="primary" style={{ marginLeft: 20 }}>
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
              current: pageRef.current,
              pageSize: sizeRef.current,
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
