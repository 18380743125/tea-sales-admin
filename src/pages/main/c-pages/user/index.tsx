import { Button } from '@mui/material'
import { memo } from 'react'
import { Wrapper } from './style'

const User = memo(() => {
  return (
    <Wrapper>
      hello问哈一点i都不会时间
      <Button variant="contained">按钮</Button>
    </Wrapper>
  )
})

export default User
