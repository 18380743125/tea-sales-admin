import styled from 'styled-components'
export const Wrapper = styled.div`
  .goods-img {
    position: relative;
    .eye {
      font-size: 16px;
      cursor: pointer;
      color: #ddd;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-92%, -50%);
      z-index: 9;
      display: none;
      &:hover {
        color: #fff;
      }
    }
    .delete {
      margin-left: 22px;
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
      width: 100%;
      height: 100%;
      background-color: #000;
      transition: opacity 1s;
      opacity: 0;
      cursor: pointer;
    }

    &:hover .cover {
      opacity: 0.4;
    }

    &:hover .eye {
      display: block;
    }
  }
`
