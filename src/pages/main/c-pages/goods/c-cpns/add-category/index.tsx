import { memo } from 'react'
import { Button, Box, Dialog, DialogActions, DialogTitle, TextField } from '@mui/material'
import { Close } from '@mui/icons-material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Wrapper } from './style'
import { addCategoryReq } from '@/service/modules/goods'
import { useAppDispatch } from '@/store'
import { changeOpen } from '@/store/modules/main'
import { queryCategoriesAction } from '@/store/modules/goods'
import { ErrorEnum } from '@/enum/error.enum'

interface IProps {
  open: boolean
  setOpen: Function
}

interface IData {
  name: string
}

// 表单验证规则
const validationSchema = Yup.object().shape({
  name: Yup.string().required('请输入类别名称~').max(20, '类别名称不能超过20个字符~')
})

const AddCategory = ({ open, setOpen }: IProps) => {
  const dispatch = useAppDispatch()
  // 处理添加类别请求
  const handleAddCateReq = (values: IData) => {
    addCategoryReq(values.name).then((res) => {
      if (res.message === 'ok') {
        dispatch(changeOpen({ message: '添加成功', type: 'success' }))
        dispatch(queryCategoriesAction())
        setOpen(false)
      } else if (res.message === ErrorEnum.EXISTS) {
        dispatch(changeOpen({ message: '类别名称已存在~', type: 'error' }))
      }
    })
  }

  const formik = useFormik({
    initialValues: {
      name: ''
    } as IData,
    validationSchema,
    onSubmit: (values) => {
      handleAddCateReq(values)
    }
  })
  return (
    <Wrapper>
      <Dialog sx={{ top: -156 }} fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>添加类别</Box>
          <Box>
            <Close onClick={() => setOpen(false)} sx={{ color: '#a0a0a0', cursor: 'pointer' }} />
          </Box>
        </DialogTitle>
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <TextField
            sx={{ ml: 2, width: 320 }}
            autoComplete=""
            margin="normal"
            label="类别名称"
            size="small"
            variant="outlined"
            name="name"
            error={Boolean(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <DialogActions sx={{ padding: '10px 23px 23px 0' }}>
            <Button
              sx={{ backgroundColor: '#00b96b', ':hover': { backgroundColor: '#20c77c' } }}
              variant="contained"
              color="primary"
              type="submit"
            >
              提交
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Wrapper>
  )
}

export default memo(AddCategory)
