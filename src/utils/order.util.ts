// 根据订单状态拿到展示文本
export function getOrderStateText(state: string) {
  switch (state) {
    case '0':
      return '未付款'
    case '1':
      return '已支付'
    case '2':
      return '已取消'
    default:
      return '已完成'
  }
}

// 订单状态下拉框
export function getOrderStateDropDown() {
  return [
    { text: '全部状态', value: '-1' },
    { text: '未付款', value: '0' },
    { text: '已支付', value: '1' },
    { text: '已取消', value: '2' },
    { text: '已完成', value: '3' }
  ]
}

// 运输公司下拉框
export function getDeliverCompany() {
  return ['顺丰速运', '韵达快递', '圆通速递', '中通速递', '百世汇通']
}
