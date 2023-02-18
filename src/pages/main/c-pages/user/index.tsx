import { useEffect, useState, memo, useRef, useCallback } from 'react'
import { Table, Input, ConfigProvider, Button, message } from 'antd'
import { UserOutlined, PhoneOutlined } from '@ant-design/icons'
import zhCN from 'antd/es/locale/zh_CN'

import { useAppSelector, shallowEqualApp, useAppDispatch } from '@/store'
import { loadUsersAction } from '@/store/modules/user'
import { useUserTable } from './useUserTable'
import { phoneRegExp } from '@/utils/regexp'

const User = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const sizeRef = useRef(10)
  const pageRef = useRef(1)
  const dispatch = useAppDispatch()

  const { users, count, loading } = useAppSelector(
    (state) => ({
      users: state.user.users,
      count: state.user.count,
      loading: state.user.loading
    }),
    shallowEqualApp
  )

  // 加载数据
  const loadData = useCallback(() => {
    const params: any = { page: pageRef.current, size: sizeRef.current }
    name && (params.name = name)
    phone && (params.phone = phone)
    dispatch(loadUsersAction(params))
  }, [name, phone, sizeRef])

  // hooks
  const { columns } = useUserTable({ loadData })

  // 初始化数据
  useEffect(() => {
    loadData()
  }, [])

  const pageChangeSizeClick = (page: number, size: number) => {
    pageRef.current = page
    sizeRef.current = size
    loadData()
  }

  // 搜索点击
  const searchClick = () => {
    if (phone !== '' && !phoneRegExp.test(phone)) {
      return message.error('手机号格式错误~')
    }
    pageRef.current = 1
    loadData()
  }

  return (
    <div className="users-info">
      {/* 操作区域 */}
      <div style={{ marginBottom: 10 }}>
        <Input
          allowClear
          style={{ width: 200, marginRight: 16 }}
          value={name}
          onChange={({ target: { value } }) => setName(value)}
          prefix={<UserOutlined />}
          placeholder="请输入用户名"
        />
        <Input
          allowClear
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
          loading={loading}
          bordered
          columns={columns}
          rowKey={(record) => record.name}
          locale={{ emptyText: '暂无数据' }}
          dataSource={users}
          // 页码
          pagination={{
            style: { marginRight: 6 },
            total: count,
            showSizeChanger: true,
            pageSize: sizeRef.current,
            current: pageRef.current,
            onChange: pageChangeSizeClick,
            onShowSizeChange: pageChangeSizeClick
          }}
        />
      </ConfigProvider>
    </div>
  )
}

export default memo(User)
