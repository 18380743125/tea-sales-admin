import { useEffect, useState, memo, useRef, useCallback } from 'react'
import { Table, Input, ConfigProvider, Button } from 'antd'
import { UserOutlined, PhoneOutlined } from '@ant-design/icons'
import zhCN from 'antd/es/locale/zh_CN'

import { useAppSelector, shallowEqualApp, useAppDispatch } from '@/store'
import { loadUsersAction } from '@/store/modules/user'
import { useUserTable } from './useUserTable'

const User = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [size, setSize] = useState(10)
  const pageRef = useRef(1)
  const dispatch = useAppDispatch()

  const { users, count } = useAppSelector(
    (state) => ({
      users: state.user.users,
      count: state.user.count
    }),
    shallowEqualApp
  )

  // 加载数据
  const loadData = useCallback(() => {
    const params: any = { page: pageRef.current, size }
    name && (params.name = name)
    phone && (params.phone = phone)
    dispatch(loadUsersAction(params))
  }, [name, phone, size])

  // hooks
  const { columns } = useUserTable({ loadData })

  // 初始化数据
  useEffect(() => {
    loadData()
  }, [])

  // 搜索点击
  const searchClick = () => {
    pageRef.current = 1
    loadData()
  }

  return (
    <div className="users-info">
      {/* 操作区域 */}
      <div style={{ marginBottom: 10 }}>
        <Input
          style={{ width: 200, marginRight: 16 }}
          value={name}
          onChange={({ target: { value } }) => setName(value)}
          prefix={<UserOutlined />}
          placeholder="请输入用户名"
        />
        <Input
          style={{ width: 200, marginRight: 10 }}
          value={phone}
          onChange={({ target: { value } }) => setPhone(value)}
          prefix={<PhoneOutlined />}
          placeholder="请输入手机号"
        />
        <Button type="primary" onClick={searchClick}>
          搜索
        </Button>
      </div>
      <ConfigProvider locale={zhCN}>
        <Table
          bordered
          columns={columns}
          rowKey={(record) => record.name}
          locale={{ emptyText: '暂无数据' }}
          dataSource={users}
          // 页码
          pagination={{
            style: { marginRight: 40 },
            total: count,
            showSizeChanger: true,
            pageSize: size,
            current: pageRef.current,
            onChange: (page: number) => {
              pageRef.current = page
              loadData()
            },
            onShowSizeChange: (_, pageSize) => {
              setSize(pageSize)
              loadData()
            }
          }}
        />
      </ConfigProvider>
    </div>
  )
}

export default memo(User)
