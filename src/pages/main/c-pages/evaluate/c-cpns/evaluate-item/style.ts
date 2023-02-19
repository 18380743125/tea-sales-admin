import styled from 'styled-components'
export const Wrapper = styled.div`
  .user {
    display: flex;
    align-items: center;
    .img {
      margin-right: 8px;
    }
    .img img {
      height: 60px;
      width: 60px;
      border-radius: 50%;
      box-shadow: 0 0 26px rgba(0, 0, 0, 0.25);
    }
    .info {
      font-size: 17px;
      .name {
        color: #00b96b;
        margin-left: 16px;
      }
      .phone {
        color: #999;
        font-size: 15px;
        margin-top: 3px;
      }
    }

    /* 订单信息 */
    .order {
      margin-left: 30px;
      font-size: 14px;
      .brief {
        margin-bottom: 4px;
      }
      .brief .name {
        margin-right: 8px;
      }
      .brief .weight {
        margin-right: 8px;
      }
      .brief .money {
        color: red;
        margin: 0 10px;
      }
      .brief .count {
        font-size: 16px;
        color: red;
      }
    }
  }

  /* 评价内容 */
  .content {
    width: 96%;
    padding: 16px 0 8px;
    font-size: 15px;
    line-height: 1.5;
    text-indent: 1em;
  }

  /* 评价的图片 */
  .evaluate-imgs {
    width: 70%;
    display: flex;
    flex-wrap: wrap;
    .img-item {
      margin: 6px;
    }
    .img-item img {
      max-height: 120px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 3px;
    }
  }
`
