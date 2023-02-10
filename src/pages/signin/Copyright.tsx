import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

function Copyright(props: any) {
  const navigate = useNavigate()
  const goDashboard = () => {
    navigate('/main')
  }
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" onClick={goDashboard} sx={{ cursor: 'pointer' }}>
        永秀茶厂销售管理后台
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default memo(Copyright)
