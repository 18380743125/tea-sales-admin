import { memo, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const Main = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/main/user', { replace: true })
  }, [])
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default memo(Main)
