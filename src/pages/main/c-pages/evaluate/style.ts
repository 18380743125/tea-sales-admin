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

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    position: absolute;
    right: 20px;
  }
`
