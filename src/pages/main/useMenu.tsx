import { useState, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Breadcrumb, MenuProps } from 'antd'

import { useAppDispatch } from '@/store/index'
import { changeCurrentUrl } from '@/store/modules/main'
import { localCache } from '@/utils/cache'
import { ConstEnum } from '@/enum/constant.enum'

// 菜单项类型
type MenuItem = Required<MenuProps>['items'][number]

// key -> 映射面包屑项文本
const breadcrumbNameMap: Record<string, string> = {
  '1': '用户信息',
  '2': '商品信息',
  '3': '订单信息',
  '4': '评价信息',
  '/main/user': '用户管理',
  '/main/goods': '商品管理',
  '/main/order': '订单管理',
  '/main/evaluate': '评价管理'
}

// 生成菜单项
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
    type
  } as MenuItem
}

// 导航菜单项
const menuItems: MenuProps['items'] = [
  getItem('用户管理', '/main/user', <i className="iconfont icon-24gl-portraitMaleInfo" />, [
    getItem('用户信息', '1', <i className="iconfont icon-yonghuliebiao" />)
  ]),
  getItem('商品管理', '/main/goods', <i className="iconfont icon-chanpinliebiaopubuliumoshi" />, [
    getItem('商品信息', '2', <i className="iconfont icon-chaye" />)
  ]),
  getItem('订单管理', '/main/order', <i className="iconfont icon-dingdanguanli" />, [
    getItem('订单信息', '3', <i className="iconfont icon-dingdanxinxi" />)
  ]),
  getItem('评价管理', '/main/evaluate', <i className="iconfont icon-pinglunguanli" />, [
    getItem('评价信息', '4', <i className="iconfont icon-pingjiaxinxi" />)
  ])
]

export default function useMenu() {
  const navigate = useNavigate()
  const [keyPath, setKeyPath] = useState<Array<string>>(
    localCache.getCache(ConstEnum.KEY_PATH) ?? ['1', '/main/users']
  )
  const [breadcrumbItems, setBreadcrumbItems] = useState<ReactNode>()
  const dispatch = useAppDispatch()

  // 处理菜单项的点击
  const menuItemClick: MenuProps['onClick'] = (e) => {
    const path = e.keyPath
      .filter((item) => !Number.isInteger(parseInt(item)))
      .reverse()
      .join('/')
    if (path === location.hash.replace('#', '')) return
    localCache.setCache(ConstEnum.KEY_PATH, e.keyPath)
    setKeyPath(e.keyPath)
    dispatch(changeCurrentUrl(path))
    navigate(path)
  }

  // 面包屑
  useEffect(() => {
    const items = keyPath.reverse().map((item) => {
      return <Breadcrumb.Item key={item}>{breadcrumbNameMap[item]}</Breadcrumb.Item>
    })
    setBreadcrumbItems(items)
  }, [keyPath])

  return {
    keyPath, // 菜单项的 keyPath
    breadcrumbItems, // 面包屑
    menuItems,
    menuItemClick
  }
}
