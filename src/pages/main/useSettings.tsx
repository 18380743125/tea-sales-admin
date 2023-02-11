import { useNavigate } from 'react-router-dom'
import { MenuProps } from 'antd'

import { localCache } from '@/utils/cache'
import { logoutReq } from '@/service/modules/login'
import { useAppDispatch } from '@/store'
import { changeOpen } from '@/store/modules/main'
import { useState } from 'react'

const dropdownMenu: MenuProps['items'] = [
  {
    label: '我的信息',
    key: '1'
  },
  {
    label: '修改密码',
    key: '2'
  },
  {
    label: '退出登录',
    key: '3'
  }
]

export default function useSettings() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [updatePwdOpen, setUpdatePwdOpen] = useState(false)
  const [myInfoOpen, setMyInfoOpen] = useState(false)

  const handleLogout = async () => {
    await logoutReq()
    localCache.clear()
    dispatch(changeOpen({ type: 'success', message: '注销登录成功~' }))
    setTimeout(() => {
      navigate('/signin')
    }, 3000)
  }

  const dropdownItemClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case '3':
        setLogoutOpen(true)
        break
      case '2':
        setUpdatePwdOpen(true)
        break
      case '1':
        setMyInfoOpen(true)
    }
  }
  return {
    logoutOpen,
    setLogoutOpen,
    handleLogout,
    updatePwdOpen,
    setUpdatePwdOpen,
    myInfoOpen,
    setMyInfoOpen,
    dropdownMenu,
    dropdownItemClick
  }
}
