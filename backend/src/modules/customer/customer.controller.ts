import { Router } from 'express';

const router = Router();

const customers = [
  { id: 1, name: '张三', phone: '13800000001', level: 'VIP', lastOrder: '2026-07-10', lifetimeValue: 12800, segment: '高价值复购', tags: ['复购高', '健康食品'] },
  { id: 2, name: '李四', phone: '13800000002', level: '普通', lastOrder: '2026-07-08', lifetimeValue: 5200, segment: '潜力客户', tags: ['新客', '套餐关注'] },
  { id: 3, name: '王五', phone: '13800000003', level: 'VIP', lastOrder: '2026-07-12', lifetimeValue: 18600, segment: '核心客户', tags: ['核心', '高消费'] },
];

const filterCustomers = (query) => {
  let result = customers;
  const segment = String(query.segment || '').trim().toLowerCase();
  const level = String(query.level || '').trim().toLowerCase();
  const keyword = String(query.search || '').trim().toLowerCase();

  if (segment) {
    result = result.filter((customer) => customer.segment.toLowerCase().includes(segment));
  }

  if (level) {
    result = result.filter((customer) => customer.level.toLowerCase() === level);
  }

  if (keyword) {
    result = result.filter((customer) =>
      customer.name.toLowerCase().includes(keyword)
      || customer.phone.toLowerCase().includes(keyword)
      || customer.segment.toLowerCase().includes(keyword)
      || (customer.tags || []).join(' ').toLowerCase().includes(keyword),
    );
  }

  return result;
};

router.get('/', (req, res) => {
  res.json({ code: 0, message: 'success', data: filterCustomers(req.query) });
});

router.post('/', (req, res) => {
  const item = {
    id: Date.now(),
    ...req.body,
    level: req.body.level || '普通',
    lastOrder: req.body.lastOrder || new Date().toISOString().slice(0, 10),
    lifetimeValue: req.body.lifetimeValue || 0,
    segment: req.body.segment || '潜力客户',
    tags: req.body.tags || [],
  };
  customers.push(item);
  res.json({ code: 0, message: 'created', data: item });
});

router.patch('/:id', (req, res) => {
  const id = Number(req.params.id);
  const customer = customers.find((item) => item.id === id);
  if (!customer) {
    return res.status(404).json({ code: 1, message: 'customer not found' });
  }
  Object.assign(customer, req.body);
  res.json({ code: 0, message: 'updated', data: customer });
});

export default router;
