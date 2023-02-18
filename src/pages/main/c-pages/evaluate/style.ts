import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  .handle {
    display: flex;
    margin: 8px 0 16px;
    position: relative;
    .search-input {
      width: 260px;
      margin-right: 6px;
    }

    .category-btn {
      position: absolute;
      right: 30px;
    }
  }

  .list {
    .item {
      position: relative;
      padding: 10px;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
      margin-bottom: 6px;
      border-radius: 3px;
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
        padding: 16px 0;
        font-size: 15px;
        line-height: 1.5;
        text-indent: 2em;
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

      /* 操作区域 */
      .operation {
        position: absolute;
        right: 20px;
        bottom: 6px;
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    position: absolute;
    right: 20px;
  }
`
