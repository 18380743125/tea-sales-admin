import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { memo, MouseEventHandler, ReactNode } from 'react'

// 提示对话框
interface IDialogConfig {
  open: boolean
  setOpen: Function
  title?: string | ReactNode
  content?: string | ReactNode
  cancelText?: string
  okText?: string
  okClick?: MouseEventHandler
}

const Confirm = (dialogConfig: IDialogConfig) => {
  const {
    open,
    setOpen,
    title,
    content,
    okClick,
    cancelText = '取消',
    okText = '确认'
  } = dialogConfig

  return (
    <Dialog
      fullWidth
      sx={{ top: -230 }}
      open={open}
      onClose={() => {
        setOpen(false)
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button size="small" variant="outlined" color="primary" onClick={() => setOpen(false)}>
          {cancelText}
        </Button>
        <Button size="small" variant="outlined" color="error" onClick={okClick} autoFocus>
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default memo(Confirm)
