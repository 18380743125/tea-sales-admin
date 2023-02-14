import { memo, useEffect, useState } from 'react'
import { Modal, Upload, Form, Input, InputNumber, Select } from 'antd'

import PreviewImage from '@/components/PreviewImage'
import useGoodsFiles from './useGoodsFiles'
import type { ICreateGoodsType } from '@/types/goods'
import { Wrapper } from './style'
import { getGoodsByIdReq } from '@/service/modules/goods'
import ImgList from './ImgList'
import useSubmit from './useSubmit'

const { Option } = Select

interface IProps {
  open: boolean
  id?: number
  categories: Record<string, any>[]
  setOpen: Function
  loadData: Function
}

const EditGoods = ({ open, setOpen, id = 0, categories, loadData }: IProps) => {
  const [form] = Form.useForm()
  const [limitSize, setLimitSize] = useState(10) // 目前可传的图片数量
  const [maxCount, setMaxCount] = useState(10) // 目前最大可上传的图片数量
  const [imgs, setImgs] = useState([]) // 编辑前时回显的图片

  // hooks
  const { fileList, previewImage, previewOpen, setPreviewOpen, uploadButton, filesUploadProps } =
    useGoodsFiles(limitSize, setLimitSize, id, maxCount)

  const { onSubmit } = useSubmit(id, form, loadData, setOpen)

  // 编辑加载商品信息
  const loadGoods = () => {
    getGoodsByIdReq(id).then((res) => {
      if (res.message === 'ok') {
        const goods = res.data
        form.setFieldsValue({
          name: goods.name,
          category: goods?.category?.name || '',
          price: goods.price,
          stock: goods.stock,
          weight: goods.weight,
          description: goods.description
        })
        setImgs(goods.imgs)
        const restSize = 10 - (goods?.imgs?.length || 0)
        setLimitSize(restSize)
        setMaxCount(restSize)
      }
    })
  }
  // 编辑填充数据
  useEffect(() => {
    if (!id) return
    loadGoods()
  }, [])

  return (
    <Modal
      title={
        <div
          style={{
            color: '#00b96b',
            paddingBottom: 10
          }}
        >
          {!id ? '添加商品' : '编辑商品'}
        </div>
      }
      okText={!id ? '提交' : '保存'}
      centered
      destroyOnClose={true}
      maskClosable={false}
      open={open}
      onCancel={() => setOpen(false)}
      onOk={onSubmit}
      width={880}
    >
      <Wrapper>
        <Form
          preserve={false}
          autoComplete="off"
          form={form}
          initialValues={
            {
              name: '',
              category: '',
              price: '',
              stock: '',
              weight: '',
              description: ''
            } as ICreateGoodsType
          }
        >
          {/* 水果名称 */}
          <Form.Item
            label="名称"
            name="name"
            wrapperCol={{ span: 12 }}
            rules={[
              { required: true, message: '商品名称不能为空' },
              { max: 30, message: '名称不能超过30个字符' }
            ]}
          >
            <Input showCount allowClear maxLength={30} />
          </Form.Item>

          {/* 商品类别 */}
          <Form.Item
            label="类别"
            name="category"
            wrapperCol={{ span: 8 }}
            rules={[{ required: true, message: '商品类别不能为空' }]}
          >
            <Select
              showSearch
              placeholder="请选择商品类别"
              optionFilterProp="children"
              notFoundContent="无"
            >
              {categories.map((item) => (
                <Option key={item.id} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* 商品价格 */}
          <Form.Item
            label="价格"
            name="price"
            rules={[{ required: true, message: '商品价格不能为空' }]}
          >
            <InputNumber prefix="￥" min={0} max={9999} style={{ width: 300 }} />
          </Form.Item>

          {/* 商品库存 */}
          <Form.Item
            label="库存"
            name="stock"
            rules={[{ required: true, message: '商品库存不能为空' }]}
          >
            <InputNumber min={0} max={99999} style={{ width: 300 }} />
          </Form.Item>

          {/* 商品规格 */}
          <Form.Item
            label="规格"
            name="weight"
            wrapperCol={{ span: 12 }}
            rules={[{ required: true, message: '商品规格不能为空' }]}
          >
            <Input allowClear showCount maxLength={30} />
          </Form.Item>

          {/* 商品描述 */}
          <Form.Item
            label="描述"
            name="description"
            wrapperCol={{ span: 12 }}
            rules={[{ required: true, message: '商品描述不能为空' }]}
          >
            <Input.TextArea allowClear showCount maxLength={50} />
          </Form.Item>

          {/* 图片预览 */}
          <PreviewImage url={previewImage} open={previewOpen} setOpen={setPreviewOpen} />
          {/* 图片列表 */}
          {limitSize > 0 || !!fileList.length ? (
            <Form.Item required name="imgs" label="图片">
              <Upload {...filesUploadProps}>{!limitSize ? null : uploadButton}</Upload>
            </Form.Item>
          ) : (
            <div style={{ marginBottom: 10, color: 'red' }}>
              注：图片数量限制到10张, 如需修改，需先删除下列图片再添加。
            </div>
          )}
        </Form>

        <ImgList
          maxCount={maxCount}
          loadGoods={loadGoods}
          setMaxCount={setMaxCount}
          id={id}
          imgs={imgs}
        />
      </Wrapper>
    </Modal>
  )
}

export default memo(EditGoods)
