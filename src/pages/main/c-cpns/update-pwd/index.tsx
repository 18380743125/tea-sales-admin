import { memo } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material'
import { Close } from '@mui/icons-material'
import type { IPasswordType } from '@/types/user'
import { Wrapper } from './style'
import { updatePwdReq } from '@/service/modules/user'
import { useAppDispatch } from '@/store'
import { changeOpen } from '@/store/modules/main'

interface IProps {
  open: boolean
  setOpen: Function
}

// 表单验证规则
const validationSchema = Yup.object().shape({
  oldpassword: Yup.string()
    .required('请输入密码~')
    .min(6, '密码不能小于6位~')
    .max(32, '密码不能超过32位~'),
  password: Yup.string()
    .required('请输入新密码~')
    .min(6, '新密码不能小于6位~')
    .max(32, '新密码不能超过32位~'),
  againpassword: Yup.string().oneOf([Yup.ref('password')], '密码不匹配')
})

const UpdatePwd = (props: IProps) => {
  const { open, setOpen } = props
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      oldpassword: '',
      password: '',
      againpassword: ''
    } as IPasswordType,
    validationSchema,
    onSubmit: (values) => {
      handleUpdatePwdReq(values)
    }
  })

  function handleUpdatePwdReq(values: IPasswordType) {
    updatePwdReq(values).then((res) => {
      if (res.message === 'ok') {
        dispatch(changeOpen({ type: 'success', message: '修改成功~' }))
        setOpen(false)
      }
    })
  }

  return (
    <Wrapper>
      <Dialog sx={{ top: -120 }} fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>修改密码</Box>
          <Box>
            <Close onClick={() => setOpen(false)} sx={{ color: '#a0a0a0', cursor: 'pointer' }} />
          </Box>
        </DialogTitle>
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              autoComplete=""
              margin="normal"
              label="原密码"
              type="password"
              fullWidth
              size="small"
              variant="outlined"
              name="oldpassword"
              error={Boolean(formik.touched.oldpassword && formik.errors.oldpassword)}
              helperText={formik.touched.oldpassword && formik.errors.oldpassword}
              value={formik.values.oldpassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <TextField
              autoComplete=""
              margin="normal"
              label="新密码"
              type="password"
              fullWidth
              size="small"
              variant="outlined"
              name="password"
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <TextField
              autoComplete=""
              margin="normal"
              label="再次输入新密码"
              type="password"
              fullWidth
              size="small"
              variant="outlined"
              name="againpassword"
              error={Boolean(formik.touched.againpassword && formik.errors.againpassword)}
              helperText={formik.touched.againpassword && formik.errors.againpassword}
              value={formik.values.againpassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </DialogContent>
          <DialogActions sx={{ padding: '10px 23px 23px 0' }}>
            <Button size="small" color="info" variant="outlined" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button type="submit" size="small" color="info" variant="contained">
              修改
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Wrapper>
  )
}

export default memo(UpdatePwd)
