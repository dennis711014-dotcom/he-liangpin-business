import { Router } from 'express';
const router = Router();
const stores = [
    { id: 1, name: '海上花岛门店', address: '上海', managerId: 1, status: 1 },
    { id: 2, name: '和优良品门店', address: '杭州', managerId: 2, status: 1 },
];
router.get('/', (_req, res) => {
    res.json({ code: 0, message: 'success', data: stores });
});
router.post('/', (req, res) => {
    const item = { id: Date.now(), ...req.body, status: 1 };
    stores.push(item);
    res.json({ code: 0, message: 'created', data: item });
});
export default router;
