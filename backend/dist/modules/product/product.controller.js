import { Router } from 'express';
const router = Router();
const products = [
    { id: 1, name: '多肽新主食', brandType: 'he_liangpin', productType: 'single', defaultPrice: 298, costPrice: 120, status: 1 },
    { id: 2, name: '酵素', brandType: 'he_liangpin', productType: 'single', defaultPrice: 380, costPrice: 160, status: 1 },
    { id: 3, name: '客房套餐', brandType: 'haishanghuadao', productType: 'bundle', defaultPrice: 1800, costPrice: 900, status: 1 },
];
router.get('/', (_req, res) => {
    res.json({ code: 0, message: 'success', data: products });
});
router.post('/', (req, res) => {
    const item = { id: Date.now(), ...req.body, status: 1 };
    products.push(item);
    res.json({ code: 0, message: 'created', data: item });
});
router.patch('/:id', (req, res) => {
    const id = Number(req.params.id);
    const p = products.find((it) => it.id === id);
    if (!p)
        return res.status(404).json({ code: 1, message: 'product not found' });
    Object.assign(p, req.body);
    res.json({ code: 0, message: 'updated', data: p });
});
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = products.findIndex((it) => it.id === id);
    if (idx === -1)
        return res.status(404).json({ code: 1, message: 'product not found' });
    const removed = products.splice(idx, 1)[0];
    res.json({ code: 0, message: 'deleted', data: removed });
});
export default router;
