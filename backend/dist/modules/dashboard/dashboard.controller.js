import { Router } from 'express';
const router = Router();
router.get('/', (_req, res) => {
    res.json({
        code: 0,
        message: 'success',
        data: {
            stats: [
                { label: '销售额', value: 125000, unit: '元' },
                { label: '利润', value: 45000, unit: '元' },
                { label: '获客量', value: 320, unit: '人' },
                { label: '复购率', value: 18.6, unit: '%' },
            ],
            stores: [
                { name: '海上花岛门店', sales: 58000, profit: 20000, retention: 0.22 },
                { name: '和优良品门店', sales: 42000, profit: 15000, retention: 0.17 },
                { name: '联合套餐门店', sales: 25000, profit: 10000, retention: 0.14 },
            ],
        },
    });
});
export default router;
