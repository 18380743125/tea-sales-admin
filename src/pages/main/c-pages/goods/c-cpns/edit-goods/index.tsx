import { memo, useEffect, useState, useRef } from 'react'
import { Modal, Upload, Form, Input, InputNumber, Select } from 'antd'

import PreviewImage from '@/components/PreviewImage'
import useGoodsFiles from './useGoodsFiles'
import type { ICreateGoodsType } from '@/types/goods'
import { Wrapper } from './style'
import ImgList from './ImgList'
import useSubmit from './useSubmit'

const { Option } = Select

interface IProps {
  open: boolean
  operatingGoods?: Record<string, any> | null
  categories: Record<string, any>[]
  setOpen: Function
  loadData: Function
}

const EditGoods = ({ open, setOpen, operatingGoods = null, categories, loadData }: IProps) => {
  const [form] = Form.useForm()
  const [maxCount, setMaxCount] = useState(operatingGoods ? 0 : 10) // 目前最大可上传的图片数量
  const limitSizeRef = useRef(0)
  const flagRef = useRef(false) // 记录是否删除了图片(请求), 用于是否刷新界面

  // hooks
  const { fileList, previewImage, previewOpen, setPreviewOpen, uploadButton, filesUploadProps } =
    useGoodsFiles(limitSizeRef, operatingGoods, maxCount)

  const { onSubmit } = useSubmit(operatingGoods, form, loadData, setOpen)

  // 编辑填充数据
  useEffect(() => {
    if (!operatingGoods) return
    form.setFieldsValue({
      name: operatingGoods.name,
      category: operatingGoods?.category?.name || '',
      price: operatingGoods.price,
      stock: operatingGoods.stock,
      weight: operatingGoods.weight,
      description: operatingGoods.description
    })
    const restSize = 10 - (operatingGoods?.imgs?.length || 0)
    limitSizeRef.current = restSize
    setMaxCount(restSize)
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
          {!operatingGoods ? '添加商品' : '编辑商品'}
        </div>
      }
      okText={!operatingGoods ? '提交' : '保存'}
      centered
      destroyOnClose={true}
      maskClosable={false}
      open={open}
      onCancel={() => {
        setOpen(false)
        if (flagRef.current) loadData()
      }}
      onOk={onSubmit}
      width={880}
    >
      <Wrapper>
        <>
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
            {maxCount > 0 ? (
              <Form.Item required name="imgs" label="图片">
                <Upload {...filesUploadProps}>
                  {fileList.length < maxCount ? uploadButton : null}
                </Upload>
              </Form.Item>
            ) : (
              <div style={{ marginBottom: 10, color: 'red' }}>
                注：图片数量限制到10张, 如需修改，需先删除下列图片再添加。
              </div>
            )}
          </Form>
          {operatingGoods && maxCount !== 10 && (
            <ImgList
              flagRef={flagRef}
              limitSizeRef={limitSizeRef}
              maxCount={maxCount}
              setMaxCount={setMaxCount}
              operatingGoods={operatingGoods}
            />
          )}
        </>
      </Wrapper>
    </Modal>
  )
}

export default memo(EditGoods)
