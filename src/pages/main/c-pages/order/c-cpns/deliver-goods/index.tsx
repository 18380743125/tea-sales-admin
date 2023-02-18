import { Form, Modal, Select, message } from 'antd'
import { memo } from 'react'
import { Wrapper } from './style'
import { IDeliverGoodsType } from '@/types/order'
import { getDeliverCompany } from '@/utils/order.util'
import { formatUTC } from '@/utils/format'
import { deliverOrderReq } from '@/service/modules/order'

interface IProps {
  open: boolean
  setOpen: Function
  order: Record<string, any>
  loadData: Function
}

const { Option } = Select

const DeliverGoods = ({ open, setOpen, order, loadData }: IProps) => {
  const [form] = Form.useForm()

  const onSubmit = async () => {
    try {
      await form.validateFields()
    } catch (err) {
      return message.error('请选择运输公司~')
    }
    const { way } = form.getFieldsValue()
    deliverOrderReq({ way, orderId: order?.id, userId: order?.user?.id }).then((res) => {
      if (res.message === 'ok') {
        message.success('发货成功~')
        loadData()
        setOpen(false)
      }
    })
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
          订单发货
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
      width={680}
    >
      <Wrapper>
        {/* 订单信息展示区域 */}
        <div className="info">
          <div className="order">
            <span>订单信息：</span>
            <span className="gname">{order?.goods?.name}</span>
            <span className="weight">{order?.goods?.weight}</span>
            <span className="description">{order?.goods?.description}</span>
            <span className="count">x{order?.count}</span>
          </div>
          <div className="time">下单时间：{formatUTC(order.createAt, 'YYYY-MM-DD HH:mm:ss')}</div>
          <div className="region">配送区域：{order?.address?.region}</div>
          <div className="region-detail">配送详细地址：{order?.address?.detail}</div>
        </div>

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
            name="way"
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
