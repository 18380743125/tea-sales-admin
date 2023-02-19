import styled from 'styled-components'
export const Wrapper = styled.div`
  padding-bottom: 10px;
  height: 650px;
  overflow-y: auto;
  .comments {
    padding-top: 20px;
    width: 99%;
    border-top: 1px solid #eee;
  }

  .item {
    width: 96%;
    padding: 10px 0;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    line-height: 1.25;
    position: relative;
  }

  /* 头像 */
  .avatar {
    img {
      height: 45px;
      border-radius: 50%;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    }
  }

  /* 主体内容 */
  .main {
    padding-left: 10px;
    display: flex;
    flex-direction: column;
  }

  .content {
    color: #1976d2;
    width: 85%;
    line-height: 1.7;
  }
  .infor {
    display: flex;
    align-items: center;
    padding-top: 6px;
    .author {
      padding-right: 10px;
      color: #999;
      position: relative;
      top: -1px;
    }
    .time {
      color: #999;
      font-size: 12px;
    }
  }
  .btn {
    position: absolute;
    bottom: 0px;
    right: 0px;
  }
`
