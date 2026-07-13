import { Router } from 'express';
const router = Router();
const orders = [
    {
        id: 1,
        orderNo: 'ORD-001',
        customer: '张三',
        amount: 2980,
        status: '已完成',
        createdAt: '2026-07-10',
        channel: '小程序',
        promotion: '夏季健康饮品套餐',
        details: [
            { sku: '多肽新主食', qty: 1, price: 298 },
            { sku: '酵素', qty: 1, price: 380 },
        ],
        note: '客户已完成复购，建议继续推送保健套餐',
    },
    {
        id: 2,
        orderNo: 'ORD-002',
        customer: '李四',
        amount: 1800,
        status: '待确认',
        createdAt: '2026-07-09',
        channel: '门店',
        promotion: '老客复购满减',
        details: [
            { sku: '客房套餐', qty: 1, price: 1800 },
        ],
        note: '待确认是否使用满减券',
    },
    {
        id: 3,
        orderNo: 'ORD-003',
        customer: '王五',
        amount: 980,
        status: '已完成',
        createdAt: '2026-07-08',
        channel: '微信',
        promotion: '无',
        details: [
            { sku: '二脂油', qty: 1, price: 498 },
            { sku: '酵素', qty: 1, price: 380 },
        ],
        note: '高频复购客户，建议加入会员权益',
    },
];
const filterOrders = (query) => {
    let result = orders;
    const status = String(query.status || '').trim();
    const keyword = String(query.keyword || '').trim().toLowerCase();
    const promotion = String(query.promotion || '').trim().toLowerCase();
    const customer = String(query.customer || '').trim().toLowerCase();
    if (status) {
        result = result.filter((order) => order.status === status);
    }
    if (promotion) {
        result = result.filter((order) => order.promotion.toLowerCase().includes(promotion));
    }
    if (customer) {
        result = result.filter((order) => order.customer.toLowerCase().includes(customer));
    }
    if (keyword) {
        result = result.filter((order) => order.orderNo.toLowerCase().includes(keyword)
            || order.customer.toLowerCase().includes(keyword)
            || order.channel.toLowerCase().includes(keyword)
            || order.promotion.toLowerCase().includes(keyword)
            || order.note.toLowerCase().includes(keyword));
    }
    return result;
};
router.get('/', (req, res) => {
    res.json({ code: 0, message: 'success', data: filterOrders(req.query) });
});
router.post('/', (req, res) => {
    const item = {
        id: Date.now(),
        ...req.body,
        status: '待确认',
        createdAt: req.body.createdAt || new Date().toISOString().slice(0, 10),
        channel: req.body.channel || '未知',
        details: req.body.details || [],
        note: req.body.note || '',
    };
    orders.push(item);
    res.json({ code: 0, message: 'created', data: item });
});
router.patch('/:id', (req, res) => {
    const id = Number(req.params.id);
    const order = orders.find((item) => item.id === id);
    if (!order) {
        return res.status(404).json({ code: 1, message: 'order not found' });
    }
    Object.assign(order, req.body);
    res.json({ code: 0, message: 'updated', data: order });
});
export default router;
