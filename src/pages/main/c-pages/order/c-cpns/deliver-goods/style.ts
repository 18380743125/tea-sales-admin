import styled from 'styled-components'

export const Wrapper = styled.div`
  .info {
    letter-spacing: 1px;
    height: 180px;
    .order {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #00b96b;
      font-weight: bold;
      .gname,
      .weight,
      .description {
        margin-right: 6px;
      }
      .count {
        color: red;
        font-size: 16px;
      }
    }

    .time {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: #888;
    }

    .region {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: #666;
    }

    .region-detail {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      padding-bottom: 20px;
    }
  }
`
