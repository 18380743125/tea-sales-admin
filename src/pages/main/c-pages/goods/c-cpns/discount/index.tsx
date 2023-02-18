import { memo, useEffect } from 'react'
import { Button, Box, Dialog, DialogActions, DialogTitle, TextField } from '@mui/material'
import { Close } from '@mui/icons-material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Wrapper } from './style'
import { addDiscount } from '@/service/modules/goods'
import { useAppDispatch } from '@/store'
import { changeOpen } from '@/store/modules/main'
import { getDiscountByGoodsId } from '@/service/modules/goods'

interface IProps {
  open: boolean
  setOpen: Function
  operatingGoods: Record<string, any>
}

// 表单验证规则
const validationSchema = Yup.object().shape({
  rate: Yup.string().required('请输入折扣率~').max(20, '类别名称不能超过20个字符~'),
  description: Yup.string().max(20, '折扣备注不能超过20个字符~')
})

const Discount = ({ operatingGoods, open, setOpen }: IProps) => {
  const dispatch = useAppDispatch()

  // 初始化加载折扣数据
  useEffect(() => {
    getDiscountByGoodsId(operatingGoods.id).then((res) => {
      if (res.message === 'ok' && res.data) {
        formik.setValues({ rate: res.data.rate, description: res.data.description })
      }
    })
  }, [])

  // 保存请求
  const handleSave = (values: any) => {
    addDiscount({ id: operatingGoods.id, ...values }).then((res) => {
      if (res.message === 'ok') {
        dispatch(changeOpen({ type: 'success', message: '保存成功~' }))
        setOpen(false)
      }
    })
  }

  const formik = useFormik({
    initialValues: {
      rate: 1,
      description: ''
    },
    validationSchema,
    onSubmit: (values) => {
      handleSave(values)
    }
  })
  return (
    <Dialog sx={{ top: -156 }} fullWidth open={open} onClose={() => setOpen(false)}>
      <Wrapper>
        {/* 头部区域 */}
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ color: '#00b96b' }}>折扣管理</Box>
          <Box>
            <Close onClick={() => setOpen(false)} sx={{ color: '#a0a0a0', cursor: 'pointer' }} />
          </Box>
        </DialogTitle>

        {/* 商品信息 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingLeft: 2,
            flexDirection: 'column',
            color: '#666',
            mb: 1.2
          }}
        >
          <Box sx={{ mb: 1.2 }}>商品名称: {operatingGoods.name}</Box>
          <Box sx={{ mb: 1.2 }}>
            商品价格:
            <Box sx={{ color: 'red' }} component="span">
              ￥{parseFloat(operatingGoods.price).toFixed(2)}
            </Box>
          </Box>
          <Box>
            折后价格:
            <Box sx={{ color: 'red' }} component="span">
              ￥{parseFloat(operatingGoods.price * formik.values.rate + '').toFixed(2)}
            </Box>
          </Box>
        </Box>

        {/* 备注 */}
        <Box sx={{ paddingLeft: 2, mt: 2, color: 'red' }}>*注：折扣率请设置成小数。</Box>

        {/* 表单区域 */}
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <TextField
            sx={{ ml: 2, width: 360 }}
            autoComplete=""
            margin="normal"
            label="折扣率"
            size="small"
            variant="outlined"
            type="number"
            name="rate"
            error={Boolean(formik.touched.rate && formik.errors.rate)}
            helperText={formik.touched.rate && formik.errors.rate}
            value={formik.values.rate}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <TextField
            sx={{ ml: 2, width: 360 }}
            autoComplete=""
            margin="dense"
            label="折扣简述"
            size="small"
            variant="outlined"
            name="description"
            error={Boolean(formik.touched.description && formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            value={formik.values.description}
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
              保存
            </Button>
          </DialogActions>
        </Box>
      </Wrapper>
    </Dialog>
  )
}

export default memo(Discount)
