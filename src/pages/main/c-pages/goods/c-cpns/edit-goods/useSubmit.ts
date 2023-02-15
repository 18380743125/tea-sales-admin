import { addGoodsReq, updateGoodsReq } from '@/service/modules/goods'
import { ICreateGoodsType } from '@/types/goods'
import debounce from '@/utils/debounce'
import { FormInstance, message } from 'antd'

export default function useSubmit(
  operatingGoods: Record<string, any> | null,
  form: FormInstance<any>,
  loadData: Function,
  setOpen: Function
) {
  const handleEditReq = (params: ICreateGoodsType) => {
    // 修改请求
    updateGoodsReq(operatingGoods?.id, params).then((res: any) => {
      if (res.message === 'ok') {
        message.success('修改成功')
        loadData()
        setOpen(false)
      }
    })
  }
  const handleCreateReq = (params: ICreateGoodsType) => {
    // 新增请求
    addGoodsReq(params).then((res) => {
      if (res.message === 'ok') {
        message.success('添加成功')
        loadData()
        setOpen(false)
      }
    })
  }
  const _handleEditReq = debounce(handleCreateReq, 500)
  const _handleCreateReq = debounce(handleEditReq, 500)

  // 监听表单提交
  const onSubmit = async () => {
    try {
      await form.validateFields()
    } catch (e) {
      message.error('请填写完整信息~')
      return
    }
    const values = form.getFieldsValue()
    if (!operatingGoods && (!values.imgs || !values.imgs.fileList.length)) {
      message.error('商品图片不能为空~')
      return
    }
    // 处理数据
    const params: ICreateGoodsType = { ...values }
    if (values.imgs && values.imgs.fileList.length) {
      params.imgs = values.imgs.fileList.map((item: any) => item.originFileObj)
    }

    if (!operatingGoods) {
      // 添加请求
      _handleEditReq(params)
    } else {
      _handleCreateReq(params)
    }
  }

  return {
    onSubmit
  }
}
