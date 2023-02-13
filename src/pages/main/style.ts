import styled from 'styled-components'

export const Wrapper = styled.div`
  .ant-layout {
    height: 100vh;
    background-color: #fff;
    // 头部区域
    .ant-layout-header {
      padding-left: 14px;
      height: 80px;
      background-color: #163238;
      color: #fff;
      display: flex;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        position: relative;
        top: -2px;
      }
      .title {
        font-size: 14px;
        padding-left: 10px;
      }
      .user-info {
        width: 380px;
        height: 80px;
        display: flex;
        align-items: center;
        position: absolute;
        right: 0;
        .welcome {
          padding-left: 10px;
        }
        .setting {
          position: absolute;
          right: 30px;
          width: 100px;
          cursor: pointer;
          text-align: center;
        }
      }
    }
    .ant-layout {
      // 侧边栏
      .ant-layout-sider {
        // 隐藏滚动条
        &::-webkit-scrollbar {
          display: none;
        }
        scrollbar-width: none;
        -ms-overflow-style: none;
        background-color: #fff;
        z-index: 1;
        border-right: 1px solid #f5f5f5;
        .ant-menu {
          border: none;
        }
      }
      // 内容区域
      .ant-layout-content {
        /* &::-webkit-scrollbar {
          display: none;
        } */
        /* scrollbar-width: none;
        -ms-overflow-style: none; */
        overflow-y: scroll;
        height: 100%;
        width: 100%;
        color: #262626;
        position: relative;
        .breadcrumb {
          position: fixed;
          padding: 6px;
          width: 100%;
          z-index: 99;
          background: #fff;
        }
        .main {
          background-color: #fff;
          margin-top: 33px;
          padding: 6px 0 0 3px;
          border-radius: 4px;
          border-top: 6px #f5f5f5 solid;
        }
      }
    }
  }
`
