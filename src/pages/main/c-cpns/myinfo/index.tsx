import { memo, useState } from 'react'
import { Wrapper } from './style'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material'

import { updateUserReq } from '@/service/modules/user'
import { useAppDispatch } from '@/store'
import { changeOpen } from '@/store/modules/main'
import { IUpdateUserType } from '@/types/user'
import { phoneRegExp } from '@/utils/regexp'
import { changeUser } from '@/store/modules/login'
import { Close } from '@mui/icons-material'

interface IProps {
  open: boolean
  setOpen: Function
  user: Record<string, any>
}

// 表单验证规则
const validationSchema = Yup.object().shape({
  age: Yup.number().required('年龄不能为空~').max(120, '年龄不能超过120~'),
  phone: Yup.string().matches(phoneRegExp, '手机号格式错误')
})

const MyInfo = (props: IProps) => {
  const { open, setOpen, user } = props
  const dispatch = useAppDispatch()
  const [initialValues] = useState<IUpdateUserType>({
    phone: user.phone,
    age: user.age,
    gender: user.gender
  })

  // 验证表单
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleUpdateInfo(values)
    }
  })

  // 处理更新请求
  function handleUpdateInfo(values: IUpdateUserType) {
    updateUserReq(user.id, values).then((res) => {
      if (res.message === 'ok') {
        dispatch(changeOpen({ type: 'success', message: '保存成功~' }))
        dispatch(changeUser({ ...values }))
        setOpen(false)
      }
    })
  }
  return (
    <Wrapper>
      <Dialog sx={{ top: -120 }} fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>我的信息</Box>
          <Box>
            <Close onClick={() => setOpen(false)} sx={{ color: '#a0a0a0', cursor: 'pointer' }} />
          </Box>
        </DialogTitle>
        <h4 style={{ marginLeft: 23, color: '#01d36c' }}>用户名：{user.name}</h4>
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              autoComplete=""
              margin="dense"
              label="联系电话"
              type="text"
              fullWidth
              variant="outlined"
              size="small"
              name="phone"
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <TextField
              autoComplete=""
              margin="dense"
              label="年龄"
              type="number"
              fullWidth
              variant="outlined"
              size="small"
              name="age"
              error={Boolean(formik.touched.age && formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
              value={formik.values.age}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />

            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <FormLabel component="legend">性别</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                value={formik.values.gender}
                name="gender"
                onChange={formik.handleChange}
              >
                <FormControlLabel value="0" control={<Radio />} label="男" />
                <FormControlLabel value="1" control={<Radio />} label="女" />
                <FormControlLabel value="2" control={<Radio />} label="其他" />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ padding: '10px 23px 23px 0' }}>
            <Button size="small" color="info" variant="outlined" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button type="submit" size="small" color="info" variant="contained">
              保存
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Wrapper>
  )
}

export default memo(MyInfo)
