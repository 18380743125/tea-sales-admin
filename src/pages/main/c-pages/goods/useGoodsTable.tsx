import { Image, Popconfirm } from 'antd'
import { Button } from '@mui/material'
import { useState } from 'react'
import { removeGoods } from '@/service/modules/goods'
import { useAppDispatch } from '@/store'
import { changeOpen } from '@/store/modules/main'
import { upAndDownReq } from '@/service/modules/goods'
import { BASE_URL } from '@/service/config'
import type { ColumnsType } from 'antd/es/table'

export default function useGoodsTable(loadData: Function) {
  const dispatch = useAppDispatch()
  const [operatingGoods, setOperatingGoods] = useState(null)
  const [editGoodsOpen, setEditGoodsOpen] = useState(false)
  const [discountOpen, setDiscountOpen] = useState(false)

  // 删除商品
  const removeClick = (id: number, state: string) => {
    if (state === '1') {
      return dispatch(changeOpen({ type: 'error', message: '请先下架该商品~' }))
    }
    removeGoods(id).then((res) => {
      if (res.message === 'ok') {
        dispatch(changeOpen({ message: '删除成功~', type: 'success' }))
        loadData()
      }
    })
  }

  // 上下架处理
  const upAndDownClick = (id: number, state: string) => {
    const message = state === '1' ? '下架' : '上架'
    state = state === '1' ? '0' : '1'
    upAndDownReq(id, state).then((res) => {
      if (res.message === 'ok') {
        dispatch(changeOpen({ message: message + '成功~', type: 'success' }))
        loadData()
      }
    })
  }

  const columns: ColumnsType<any> = [
    {
      title: '图片',
      dataIndex: 'imgs',
      align: 'center',
      width: 160,
      render: (imgs) => {
        return (
          <div className="goods-img">
            {/* <EyeOutlined className="eye" /> */}
            <Image
              className="img"
              preview={{
                scaleStep: 1
              }}
              width={70}
              height={70}
              src={imgs.length ? `${BASE_URL}/goods/${imgs[0].filename}` : ''}
              fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
            />
            {/* 预览 */}
            {/* <PreviewImage open={previewOpen} setOpen={setPreviewOpen} url={url} /> */}
            {/* <div className="cover"></div> */}
          </div>
        )
      }
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 200,
      align: 'center'
    },
    {
      title: '类别',
      dataIndex: 'category',
      align: 'center',
      width: 150,
      render: (value) => value?.name || <span style={{ fontSize: 12, color: '#ccc' }}>无类别</span>
    },
    {
      title: '价格',
      dataIndex: 'price',
      align: 'center',
      width: 120,
      render: (value) => <span style={{ color: '#d32f2f' }}>￥{parseFloat(value).toFixed(2)}</span>
    },
    {
      title: '规格',
      dataIndex: 'weight',
      align: 'center',
      width: 140
    },
    {
      title: '描述',
      dataIndex: 'description',
      align: 'center',
      width: 180
    },
    {
      title: '状态',
      dataIndex: 'state',
      align: 'center',
      width: 120,
      render: (value) =>
        parseInt(value) === 0 ? (
          <span style={{ color: '#ccc', fontSize: 12 }}>未上架</span>
        ) : (
          <span style={{ color: '#19a4e6' }}>已上架</span>
        )
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      width: 336,
      render: (_, r) => {
        return (
          <div>
            <Button
              onClick={() => {
                setOperatingGoods(r)
                setDiscountOpen(true)
              }}
            >
              设置折扣
            </Button>

            {/* 上下架 */}
            <Popconfirm
              title={`你确认要${r.state === '1' ? '下架' : '上架'}吗？`}
              okText="确定"
              cancelText="取消"
              placement="topRight"
              onConfirm={() => upAndDownClick(r.id, r.state)}
            >
              <Button color={r.state === '1' ? 'error' : 'info'} style={{ marginRight: 6 }}>
                {r.state === '1' ? '下架' : '上架'}
              </Button>
            </Popconfirm>

            {/* 编辑 */}
            <Button
              onClick={() => {
                setOperatingGoods(r)
                setEditGoodsOpen(true)
              }}
              style={{ marginRight: 6 }}
            >
              <span style={{ fontSize: 12 }}>编辑</span>
            </Button>

            {/* 删除 */}
            <Popconfirm
              title="你确认要删除吗？"
              okText="确定"
              cancelText="取消"
              placement="topRight"
              onConfirm={() => removeClick(r.id, r.state)}
            >
              <Button size="small" color="error">
                <span style={{ fontSize: 12 }}>删除</span>
              </Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]
  return {
    operatingGoods,
    setOperatingGoods,
    editGoodsOpen,
    setEditGoodsOpen,
    discountOpen,
    setDiscountOpen,
    columns
  }
}
