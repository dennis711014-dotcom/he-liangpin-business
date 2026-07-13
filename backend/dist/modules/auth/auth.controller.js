import { Router } from 'express';
const router = Router();
router.post('/login', (_req, res) => {
    res.json({
        code: 0,
        message: 'success',
        data: {
            token: 'mock-jwt-token',
            user: {
                id: 1,
                username: 'admin',
                role: 'admin',
            },
        },
    });
});
router.get('/profile', (_req, res) => {
    res.json({
        code: 0,
        message: 'success',
        data: {
            id: 1,
            username: 'admin',
            role: 'admin',
            storeId: 1,
        },
    });
});
export default router;
