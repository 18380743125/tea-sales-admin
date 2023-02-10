import { memo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Formik } from 'formik'
import Copyright from './Copyright'

import { ConstEnum } from '@/enum/constant.enum'
import { useAppDispatch } from '@/store/index'
import { loginAction } from '@/store/modules/login'
import { rememberReq } from '@/service/modules/login'
import type { ILoginFormType } from '@/types/user'

const theme = createTheme()

// 表单验证规则
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('请输入用户名~')
    .min(4, '用户名不能少于4个字符~')
    .max(32, '用户名不能超过32个字符~'),
  password: Yup.string()
    .required('请输入密码~')
    .min(6, '密码不能小于6位~')
    .max(32, '密码不能超过32位~'),
  captcha: Yup.string().required('请输入验证码~').length(4, '验证码必须是4位~')
})

const SignIn = () => {
  const [captchaUrl, setCaptchaUrl] = useState<string>(ConstEnum.CAPTCHA_URL)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // 表单初始数据
  const [initialValues, setInitialValues] = useState<ILoginFormType>({
    name: '',
    password: '',
    captcha: '',
    remember: false
  })

  // 初始化状态
  useEffect(() => {
    rememberReq().then((res) => {
      if (!res.data) return
      setInitialValues({
        name: res.data.name,
        password: res.data.password,
        captcha: '',
        remember: !!res.data
      })
    })
  }, [])

  // 点击切换验证码
  const switchCaptcha = () => {
    setCaptchaUrl(ConstEnum.CAPTCHA_URL + Math.random())
  }

  // 处理表单提交
  const handleSubmit = (values: ILoginFormType) => {
    dispatch(loginAction({ values, switchCaptcha, navigate }))
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {/* 左侧图片 */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${require('@/assets/images/signin_left.png')})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]
          }}
        />

        {/* 右侧登录表单 */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: '#9c27b0', letterSpacing: 2 }}>
              管理员登录
            </Typography>
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                <Box
                  component="form"
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                  }}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  {/* 用户名 */}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="用户名"
                    name="name"
                    autoComplete="name"
                    sx={{ mb: 2 }}
                    autoFocus
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                  />
                  {/* 密码 */}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    autoComplete="password"
                    label="密码"
                    type="password"
                    sx={{ mb: 2 }}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                  />
                  {/* 记住密码 */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="remember"
                        checked={values.remember}
                        onChange={handleChange}
                        color="primary"
                      />
                    }
                    label="记住密码"
                    sx={{ mt: 1.8 }}
                  />
                  {/* 验证码 */}
                  <TextField
                    margin="dense"
                    size="small"
                    required
                    name="captcha"
                    label="验证码"
                    autoComplete="current-password"
                    sx={{ mt: 2 }}
                    error={Boolean(touched.captcha && errors.captcha)}
                    helperText={touched.captcha && errors.captcha}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.captcha}
                  />
                  {/* 验证码图片 */}
                  <Box
                    component="span"
                    sx={{ cursor: 'pointer', position: 'relative', top: 3, left: 2 }}
                    onClick={switchCaptcha}
                  >
                    <img src={captchaUrl} />
                  </Box>
                  {/* 登录按钮 */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 4, mb: 2, fontSize: 15, letterSpacing: 4 }}
                  >
                    登录
                  </Button>
                  {/* 版权 */}
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default memo(SignIn)
