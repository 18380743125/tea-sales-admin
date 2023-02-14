import { Box, Dialog, DialogContent, DialogTitle, Button } from '@mui/material'
import { memo, useState } from 'react'
import Confirm from '@/components/Confirm'
import { Wrapper } from './style'
import { removeCategoryReq } from '@/service/modules/goods'
import { useAppDispatch } from '@/store/index'
import { changeOpen } from '@/store/modules/main'
import { queryCategoriesAction } from '@/store/modules/goods'
import { Close } from '@mui/icons-material'

interface IProps {
  open: boolean
  setOpen: Function
  categories: Record<string, any>[]
  loadData: Function
}

const ListCategory = ({ open, setOpen, categories, loadData }: IProps) => {
  const [delOpen, setDelOpen] = useState(false)
  const dispatch = useAppDispatch()
  const [id, setId] = useState()
  const removeClick = () => {
    if (!id) return
    removeCategoryReq(id).then((res) => {
      if (res.message === 'ok') {
        dispatch(changeOpen({ type: 'success', message: '删除成功~' }))
        dispatch(queryCategoriesAction())
        loadData()
      }
      setDelOpen(false)
    })
  }
  return (
    <Wrapper>
      {/* 删除确认框 */}
      <Confirm
        title={<span style={{ color: 'red' }}>你确认要删除吗？</span>}
        open={delOpen}
        setOpen={setDelOpen}
        okClick={removeClick}
      />
      <Dialog
        sx={{ top: categories.length > 8 ? 0 : -156 }}
        maxWidth="md"
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>类别列表</Box>
          <Box>
            <Close onClick={() => setOpen(false)} sx={{ color: '#a0a0a0', cursor: 'pointer' }} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap'
            }}
          >
            {categories.map((item, index) => (
              <Box
                sx={{
                  width: '48%',
                  height: '40px',
                  flexShrink: 0,
                  marginRight: 1,
                  marginBottom: 1,
                  padding: '10px 6px',
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #f5f5f5',
                  boxSizing: 'border-box',
                  position: 'relative'
                }}
                key={item.id}
              >
                <Box>
                  <span style={{ marginRight: 4, fontSize: 13 }}>{index + 1}.</span>
                  <span style={{ fontSize: 13, color: '#999', letterSpacing: 2 }}>{item.name}</span>
                </Box>
                <Box sx={{ position: 'absolute', right: 3 }}>
                  <Button
                    color="error"
                    onClick={() => {
                      setId(item.id)
                      setDelOpen(true)
                    }}
                  >
                    删除
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </Wrapper>
  )
}

export default memo(ListCategory)
