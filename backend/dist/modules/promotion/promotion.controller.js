import { Router } from 'express';
const router = Router();
const promotions = [
    { id: 1, name: '夏季健康饮品套餐', type: '套餐', discount: 15, status: '进行中', startDate: '2026-07-01', endDate: '2026-08-01', linkedOrders: ['ORD-001', 'ORD-002'] },
    { id: 2, name: '老客复购满减', type: '满减', discount: 200, status: '进行中', startDate: '2026-06-20', endDate: '2026-07-31', linkedOrders: ['ORD-002'] },
];
const filterPromotions = (query) => {
    let result = promotions;
    const status = String(query.status || '').trim().toLowerCase();
    const type = String(query.type || '').trim().toLowerCase();
    const keyword = String(query.keyword || '').trim().toLowerCase();
    if (status) {
        result = result.filter((item) => item.status.toLowerCase() === status);
    }
    if (type) {
        result = result.filter((item) => item.type.toLowerCase() === type);
    }
    if (keyword) {
        result = result.filter((item) => item.name.toLowerCase().includes(keyword)
            || item.type.toLowerCase().includes(keyword)
            || item.linkedOrders.join(' ').toLowerCase().includes(keyword));
    }
    return result;
};
router.get('/', (req, res) => {
    res.json({ code: 0, message: 'success', data: filterPromotions(req.query) });
});
router.post('/', (req, res) => {
    const item = {
        id: Date.now(),
        ...req.body,
        status: req.body.status || '进行中',
        startDate: req.body.startDate || new Date().toISOString().slice(0, 10),
        endDate: req.body.endDate || new Date().toISOString().slice(0, 10),
        linkedOrders: req.body.linkedOrders || [],
    };
    promotions.push(item);
    res.json({ code: 0, message: 'created', data: item });
});
router.patch('/:id', (req, res) => {
    const id = Number(req.params.id);
    const promotion = promotions.find((item) => item.id === id);
    if (!promotion) {
        return res.status(404).json({ code: 1, message: 'promotion not found' });
    }
    Object.assign(promotion, req.body);
    res.json({ code: 0, message: 'updated', data: promotion });
});
export default router;
