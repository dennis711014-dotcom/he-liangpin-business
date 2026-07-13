import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './modules/auth/auth.controller.js';
import storeRouter from './modules/store/store.controller.js';
import productRouter from './modules/product/product.controller.js';
import orderRouter from './modules/order/order.controller.js';
import customerRouter from './modules/customer/customer.controller.js';
import dashboardRouter from './modules/dashboard/dashboard.controller.js';
import promotionRouter from './modules/promotion/promotion.controller.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ code: 0, message: 'ok', data: { status: 'healthy' } });
});

app.use('/auth', authRouter);
app.use('/stores', storeRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/customers', customerRouter);
app.use('/dashboard', dashboardRouter);
app.use('/promotions', promotionRouter);

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
