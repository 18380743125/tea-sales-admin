import styled from 'styled-components'
export const Wrapper = styled.div`
  .list {
    .item {
      position: relative;
      padding: 10px;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
      margin-bottom: 6px;
      border-radius: 3px;

      /* 操作区域 */
      .operation {
        position: absolute;
        right: 20px;
        bottom: 6px;
      }
    }
  }
`
