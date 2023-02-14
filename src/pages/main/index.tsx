import { memo, useState, createElement, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Layout, Dropdown, Menu, Breadcrumb } from 'antd'
import { SettingOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

import logo from '@/assets/images/logo.png'
import avatar from '@/assets/images/avatar.png'
import { Wrapper } from './style'
import useMenu from './useMenu'
import useSettings from './useSettings'
import { useAppSelector, shallowEqualApp, useAppDispatch } from '@/store'
import { changeOpen } from '@/store/modules/main'
import { localCache } from '@/utils/cache'
import { ConstEnum } from '@/enum/constant.enum'
import Confirm from '@/components/Confirm'
import UpdatePwd from './c-cpns/update-pwd'
import Myinfo from './c-cpns/myinfo'

const { Header, Sider, Content } = Layout

const Main = () => {
  // 折叠菜单栏
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const { user } = useAppSelector(
    (state) => ({
      user: state.login.user
    }),
    shallowEqualApp
  )
  const dispatch = useAppDispatch()

  // hooks
  const { keyPath, breadcrumbItems, menuItems, menuItemClick } = useMenu()
  const {
    dropdownMenu,
    dropdownItemClick,
    logoutOpen,
    setLogoutOpen,
    handleLogout,
    updatePwdOpen,
    setUpdatePwdOpen,
    myInfoOpen,
    setMyInfoOpen
  } = useSettings()

  useEffect(() => {
    const roles = localCache.getCache(ConstEnum.ROLES)
    let timer: any = null
    let flag = true
    let message = '请先登录~'
    if (!roles) {
      flag = false
    }
    if (flag) {
      flag = !!roles.filter((item: Record<string, any>) => item.name === '管理员').length
      !flag && (message = '无管理员权限~')
    }
    if (!flag) {
      dispatch(changeOpen({ message, type: 'error' }))
      timer = setTimeout(() => {
        navigate('/signin', { replace: true })
      }, 3000)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <Wrapper>
      {/* 注销登录提示框 */}
      {logoutOpen && (
        <Confirm
          title={<span style={{ color: '#eb3941' }}>你确认要注销登录吗</span>}
          open={logoutOpen}
          setOpen={setLogoutOpen}
          okClick={handleLogout}
        />
      )}

      {/* 修改密码弹出层 */}
      {updatePwdOpen && <UpdatePwd open={updatePwdOpen} setOpen={setUpdatePwdOpen} />}

      {/* 我的信息弹出层 */}
      {myInfoOpen && <Myinfo user={user} open={myInfoOpen} setOpen={setMyInfoOpen} />}

      <Layout>
        <Header style={{ position: 'fixed', zIndex: 2, width: '100%' }}>
          <img src={logo} alt="logo" />
          <div className="title">永秀茶厂</div>
          {/* 展开与收缩导航栏 */}
          <div style={{ fontSize: 20, padding: '0 10px 0 68px' }}>
            {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed)
            })}
          </div>
          <div style={{ letterSpacing: 2 }}>欢迎登录茶厂销售管理后台</div>

          {/* 头部右侧区域 */}
          <div className="user-info">
            <img src={avatar} alt="avatar" />
            {user && <div className="welcome">欢迎登录，{user?.name} 管理员</div>}
            <Dropdown
              className="setting"
              menu={{ items: dropdownMenu, onClick: dropdownItemClick }}
              placement="bottom"
              arrow
            >
              <div className="wrapper">
                <SettingOutlined style={{ fontSize: 16, paddingRight: 4 }} />
                <span style={{ letterSpacing: 2 }}>设置</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Layout>
          {/* 侧边栏 */}
          <Sider
            collapsed={collapsed}
            trigger={null}
            style={{
              overflowY: 'scroll',
              height: 'calc(100vh - 80px)',
              position: 'fixed',
              left: 0,
              top: 80,
              bottom: 0
            }}
          >
            <Menu
              onClick={menuItemClick}
              defaultSelectedKeys={keyPath}
              defaultOpenKeys={keyPath}
              mode="inline"
              items={menuItems}
            />
          </Sider>

          {/* 内容区域 */}
          <Content style={{ padding: `80px 0 0 ${collapsed ? '80px' : '200px'} ` }}>
            {/* 面包屑 */}
            {breadcrumbItems && (
              <div className="breadcrumb">
                <Breadcrumb>{breadcrumbItems}</Breadcrumb>
              </div>
            )}
            <div className="main">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Wrapper>
  )
}

export default memo(Main)
