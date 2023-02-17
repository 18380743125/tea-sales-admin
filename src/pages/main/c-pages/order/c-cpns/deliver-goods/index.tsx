import { Form, Modal, Select } from 'antd'
import { memo } from 'react'
import { Wrapper } from './style'
import { IDeliverGoodsType } from '@/types/order'
import { getDeliverCompany } from '@/utils/order.util'

interface IProps {
  open: boolean
  setOpen: Function
  order: Record<string, any> | null
  loadData: Function
}

const { Option } = Select

const DeliverGoods = ({ open, setOpen, order, loadData }: IProps) => {
  const [form] = Form.useForm()

  const onSubmit = () => {
    console.log(form.getFieldsValue())
  }
  return (
    <Modal
      title={
        <div
          style={{
            color: '#00b96b',
            paddingBottom: 10
          }}
        >
          发货
        </div>
      }
      okText={'确认发货'}
      centered
      destroyOnClose={true}
      maskClosable={false}
      open={open}
      onCancel={() => {
        setOpen(false)
      }}
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
              company: ''
            } as IDeliverGoodsType
          }
        >
          {/* 商品类别 */}
          <Form.Item
            label="运输公司"
            name="category"
            wrapperCol={{ span: 8 }}
            rules={[{ required: true, message: '运输公司不能为空' }]}
          >
            <Select
              showSearch
              placeholder="请选择运输公司"
              optionFilterProp="children"
              notFoundContent="无"
            >
              {getDeliverCompany().map((item, idx) => (
                <Option key={idx} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Wrapper>
    </Modal>
  )
}

export default memo(DeliverGoods)
