import styled from 'styled-components'

export const Wrapper = styled.div`
  .handle {
    display: flex;
    margin: 8px 0 16px;
    position: relative;
    .search-name {
      width: 300px;
    }

    .category-btn {
      position: absolute;
      right: 30px;
    }
  }
  .goods-img {
    position: relative;
    .eye {
      font-size: 16px;
      cursor: pointer;
      color: #ddd;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9;
      &:hover {
        color: #fff;
      }
    }
    .img {
      cursor: pointer;
    }

    .cover {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      width: 70px;
      height: 70px;
      background-color: #000;
      transition: opacity 1s;
      opacity: 0;
      cursor: pointer;
    }

    &:hover .cover {
      opacity: 0.4;
    }
  }
`
