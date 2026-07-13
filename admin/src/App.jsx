import React, { useEffect, useState } from 'react';

const API_BASE = 'http://127.0.0.1:3000';

const initialStats = [
  { label: '销售额', value: '¥125,000' },
  { label: '利润', value: '¥45,000' },
  { label: '获客量', value: '320' },
  { label: '复购率', value: '18.6%' },
  { label: 'ROI', value: '3.2' },
];

const initialStores = [
  { name: '海上花岛门店', sales: '¥58,000', profit: '¥20,000' },
  { name: '和优良品门店', sales: '¥42,000', profit: '¥15,000' },
  { name: '联合套餐门店', sales: '¥25,000', profit: '¥10,000' },
];

const initialProducts = [
  { name: '多肽新主食', category: '健康食品', price: '¥298', status: '上架' },
  { name: '酵素', category: '健康食品', price: '¥380', status: '上架' },
  { name: '二脂油', category: '健康食品', price: '¥498', status: '上架' },
  { name: '客房套餐', category: '联合套餐', price: '¥1800', status: '上架' },
];

const initialOrders = [
  { orderNo: 'ORD-001', customer: '张三', amount: '¥2980', status: '已完成', createdAt: '2026-07-10', promotion: '夏季健康饮品套餐' },
  { orderNo: 'ORD-002', customer: '李四', amount: '¥1800', status: '待确认', createdAt: '2026-07-09', promotion: '老客复购满减' },
  { orderNo: 'ORD-003', customer: '王五', amount: '¥980', status: '已完成', createdAt: '2026-07-08', promotion: '无' },
];

const initialCustomers = [
  { name: '张三', phone: '13800000001', level: 'VIP', lastOrder: '2026-07-10', lifetimeValue: 12800, segment: '高价值复购', tags: ['复购高', '健康食品'] },
  { name: '李四', phone: '13800000002', level: '普通', lastOrder: '2026-07-08', lifetimeValue: 5200, segment: '潜力客户', tags: ['新客', '套餐关注'] },
  { name: '王五', phone: '13800000003', level: 'VIP', lastOrder: '2026-07-12', lifetimeValue: 18600, segment: '核心客户', tags: ['核心', '高消费'] },
];

const menuItems = [
  { key: 'dashboard', label: '经营大屏' },
  { key: 'products', label: '产品管理' },
  { key: 'orders', label: '订单管理' },
  { key: 'customers', label: '客户管理' },
  { key: 'promotions', label: '促销与套餐' },
  { key: 'reports', label: '报表中心' },
];

function DashboardView({ setActiveKey }) {
  const [stats, setStats] = useState(initialStats);
  const [stores, setStores] = useState(initialStores);
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/dashboard`)
      .then((res) => res.json())
      .then((json) => {
        if (json?.data?.stats) {
          setStats(json.data.stats.map((item) => ({
            label: item.label,
            value: `${item.value}${item.unit}`,
          })));
        }
        if (json?.data?.stores) {
          setStores(json.data.stores.map((store) => ({
            name: store.name,
            sales: `¥${store.sales}`,
            profit: `¥${store.profit}`,
          })));
        }
      })
      .catch(() => {});

    fetch(`${API_BASE}/promotions`)
      .then((res) => res.json())
      .then((json) => {
        if (json?.data) {
          setPromotions(json.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: 8 }}>和优良品 · 海上花岛经营管理</h1>
      <p style={{ marginTop: 0, color: '#666' }}>总部经营大屏 · MVP 版本</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginTop: 24 }}>
        {stats.map((item) => (
          <div key={item.label} style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ color: '#666', fontSize: 14 }}>{item.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, marginTop: 8 }}>{item.value}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        {[
          { key: 'orders', title: '订单管理', desc: '查看成交额与订单状态', action: '进入订单' },
          { key: 'customers', title: '客户管理', desc: '识别高价值客户与分层', action: '查看客户' },
          { key: 'promotions', title: '促销与套餐', desc: '管理营销活动与联动订单', action: '管理促销' },
        ].map((item) => (
          <div key={item.title} onClick={() => setActiveKey && setActiveKey(item.key)} style={{ background: '#fff', padding: 16, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', cursor: 'pointer' }}>
            <div style={{ fontWeight: 700 }}>{item.title}</div>
            <div style={{ color: '#6b7280', fontSize: 14, marginTop: 6 }}>{item.desc}</div>
            <div style={{ marginTop: 10, color: '#2563eb', fontSize: 14, fontWeight: 600 }}>{item.action}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <h2 style={{ marginTop: 0 }}>当前营销活动</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {promotions.map((item) => (
            <div key={item.id} style={{ border: '1px solid #f3c97b', borderRadius: 10, padding: 12, background: '#fff8eb' }}>
              <div style={{ fontWeight: 700 }}>{item.name}</div>
              <div style={{ color: '#6b7280', fontSize: 13, marginTop: 4 }}>{item.type} · {item.status}</div>
              <div style={{ marginTop: 8, fontSize: 13 }}>联动订单：{item.linkedOrders?.join(', ') || '无'}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 24, background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <h2 style={{ marginTop: 0 }}>门店表现</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
              <th style={{ padding: '10px 8px' }}>门店</th>
              <th style={{ padding: '10px 8px' }}>销售额</th>
              <th style={{ padding: '10px 8px' }}>利润</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.name} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '10px 8px' }}>{store.name}</td>
                <td style={{ padding: '10px 8px' }}>{store.sales}</td>
                <td style={{ padding: '10px 8px' }}>{store.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductsView() {
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  const fetchProducts = () => {
    fetch(`${API_BASE}/products`)
      .then((res) => res.json())
      .then((json) => {
        if (json?.data) {
          setProducts(json.data.map((item) => ({
            id: item.id,
            name: item.name,
            productType: item.productType,
            defaultPrice: item.defaultPrice,
            status: item.status,
          })));
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateProduct = async (p) => {
    try {
      await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(p),
      });
      setShowCreate(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProduct = async (p) => {
    try {
      await fetch(`${API_BASE}/products/${p.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(p),
      });
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('确认删除该产品吗？')) return;
    try {
      await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h1>产品管理</h1>
      <div style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ margin: 0 }}>产品列表</h3>
          <button onClick={() => setShowCreate(true)} style={{ padding: '8px 12px', border: 'none', borderRadius: 8, background: '#2563eb', color: '#fff', cursor: 'pointer' }}>新增产品</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
              <th style={{ padding: '10px 8px' }}>产品名称</th>
              <th style={{ padding: '10px 8px' }}>分类</th>
              <th style={{ padding: '10px 8px' }}>价格</th>
              <th style={{ padding: '10px 8px' }}>状态</th>
              <th style={{ padding: '10px 8px' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '10px 8px' }}>{product.name}</td>
                <td style={{ padding: '10px 8px' }}>{product.productType === 'bundle' ? '联合套餐' : '健康食品'}</td>
                <td style={{ padding: '10px 8px' }}>¥{product.defaultPrice}</td>
                <td style={{ padding: '10px 8px' }}>{product.status === 1 ? '上架' : '下架'}</td>
                <td style={{ padding: '10px 8px', display: 'flex', gap: 8 }}>
                  <button onClick={() => setEditingProduct(product)} style={{ padding: '6px 10px', border: 'none', borderRadius: 8, background: '#16a34a', color: '#fff', cursor: 'pointer' }}>编辑</button>
                  <button onClick={() => handleDeleteProduct(product.id)} style={{ padding: '6px 10px', border: 'none', borderRadius: 8, background: '#ef4444', color: '#fff', cursor: 'pointer' }}>删除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCreate && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 30 }}>
          <ProductForm onCancel={() => setShowCreate(false)} onSave={(p) => handleCreateProduct(p)} />
        </div>
      )}

      {editingProduct && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 30 }}>
          <ProductForm product={editingProduct} onCancel={() => setEditingProduct(null)} onSave={(p) => handleUpdateProduct(p)} />
        </div>
      )}
    </div>
  );
}

function ProductForm({ product = {}, onCancel, onSave }) {
  const [form, setForm] = useState({
    id: product.id,
    name: product.name || '',
    productType: product.productType || 'single',
    defaultPrice: product.defaultPrice || 0,
    status: product.status || 1,
  });

  return (
    <div style={{ background: '#fff', width: 520, maxWidth: '95vw', borderRadius: 12, padding: 20 }}>
      <h3 style={{ marginTop: 0 }}>{form.id ? '编辑产品' : '新增产品'}</h3>
      <div style={{ display: 'grid', gap: 8 }}>
        <input placeholder="名称" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }} />
        <select value={form.productType} onChange={(e) => setForm({ ...form, productType: e.target.value })} style={{ padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }}>
          <option value="single">健康食品</option>
          <option value="bundle">联合套餐</option>
        </select>
        <input type="number" placeholder="默认价格" value={form.defaultPrice} onChange={(e) => setForm({ ...form, defaultPrice: Number(e.target.value) })} style={{ padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }} />
        <select value={form.status} onChange={(e) => setForm({ ...form, status: Number(e.target.value) })} style={{ padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }}>
          <option value={1}>上架</option>
          <option value={0}>下架</option>
        </select>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button onClick={onCancel} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff' }}>取消</button>
          <button onClick={() => onSave(form)} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff' }}>保存</button>
        </div>
      </div>
    </div>
  );
}

function OrdersView() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [filters, setFilters] = useState({ status: '', keyword: '' });

  const fetchOrders = () => {
    const params = new URLSearchParams();
    if (filters.status) params.set('status', filters.status);
    if (filters.keyword) params.set('keyword', filters.keyword);
    const url = `${API_BASE}/orders${params.toString() ? `?${params.toString()}` : ''}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (json?.data) {
          setOrders(json.data.map((item) => ({
            id: item.id,
            orderNo: item.orderNo,
            customer: item.customer,
            amount: `¥${item.amount}`,
            status: item.status,
            createdAt: item.createdAt,
            promotion: item.promotion,
            channel: item.channel,
            details: item.details,
            note: item.note,
          })));
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const handleSave = async (order) => {
    try {
      await fetch(`${API_BASE}/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      setEditingOrder(null);
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>订单管理</h1>
      <div style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
          <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #e5e7eb' }}>
            <option value="">全部状态</option>
            <option value="已完成">已完成</option>
            <option value="待确认">待确认</option>
            <option value="已取消">已取消</option>
          </select>
          <input placeholder="订单号/客户/活动/关键词" value={filters.keyword} onChange={(e) => setFilters({ ...filters, keyword: e.target.value })} style={{ flex: 1, padding: '8px 10px', borderRadius: 8, border: '1px solid #e5e7eb' }} />
          <button onClick={() => setFilters({ status: '', keyword: '' })} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}>重置</button>
          <button onClick={() => fetchOrders()} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer' }}>筛选</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
              <th style={{ padding: '10px 8px' }}>订单号</th>
              <th style={{ padding: '10px 8px' }}>客户</th>
              <th style={{ padding: '10px 8px' }}>金额</th>
              <th style={{ padding: '10px 8px' }}>状态</th>
              <th style={{ padding: '10px 8px' }}>联动活动</th>
              <th style={{ padding: '10px 8px' }}>下单时间</th>
              <th style={{ padding: '10px 8px' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderNo} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '10px 8px' }}>{order.orderNo}</td>
                <td style={{ padding: '10px 8px' }}>{order.customer}</td>
                <td style={{ padding: '10px 8px' }}>{order.amount}</td>
                <td style={{ padding: '10px 8px' }}>{order.status}</td>
                <td style={{ padding: '10px 8px' }}>{order.promotion || '无'}</td>
                <td style={{ padding: '10px 8px' }}>{order.createdAt || '—'}</td>
                <td style={{ padding: '10px 8px', display: 'flex', gap: 8 }}>
                  <button onClick={() => setSelectedOrder(order)} style={{ padding: '6px 10px', border: 'none', borderRadius: 8, background: '#2563eb', color: '#fff', cursor: 'pointer' }}>详情</button>
                  <button onClick={() => setEditingOrder(order)} style={{ padding: '6px 10px', border: 'none', borderRadius: 8, background: '#16a34a', color: '#fff', cursor: 'pointer' }}>编辑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}>
          <div style={{ background: '#fff', width: 480, maxWidth: '90vw', borderRadius: 16, padding: 24, boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>订单详情 · {selectedOrder.orderNo}</h3>
              <button onClick={() => setSelectedOrder(null)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 18 }}>×</button>
            </div>
            <div style={{ marginTop: 12, color: '#4b5563' }}>
              <div>客户：{selectedOrder.customer}</div>
              <div>渠道：{selectedOrder.channel || '—'}</div>
              <div>联动活动：{selectedOrder.promotion || '无'}</div>
              <div>备注：{selectedOrder.note || '—'}</div>
            </div>
            <div style={{ marginTop: 16 }}>
              <h4 style={{ marginBottom: 8 }}>商品明细</h4>
              {(selectedOrder.details || []).map((item) => (
                <div key={item.sku} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <span>{item.sku}</span>
                  <span>x{item.qty} · ¥{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {editingOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 30 }}>
          <div style={{ background: '#fff', width: 480, maxWidth: '90vw', borderRadius: 16, padding: 24, boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>编辑订单 · {editingOrder.orderNo}</h3>
              <button onClick={() => setEditingOrder(null)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 18 }}>×</button>
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: 'block', color: '#6b7280', marginBottom: 6 }}>状态</label>
                <select value={editingOrder.status} onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }}>
                  <option>已完成</option>
                  <option>待确认</option>
                  <option>已取消</option>
                </select>
              </div>
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: 'block', color: '#6b7280', marginBottom: 6 }}>备注</label>
                <textarea value={editingOrder.note || ''} onChange={(e) => setEditingOrder({ ...editingOrder, note: e.target.value })} style={{ width: '100%', minHeight: 80, padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
                <button onClick={() => setEditingOrder(null)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}>取消</button>
                <button onClick={() => handleSave(editingOrder)} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer' }}>保存</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CustomersView() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [filters, setFilters] = useState({ level: '', segment: '', search: '' });
  const [editingCustomer, setEditingCustomer] = useState(null);

  const fetchCustomers = () => {
    const params = new URLSearchParams();
    if (filters.level) params.set('level', filters.level);
    if (filters.segment) params.set('segment', filters.segment);
    if (filters.search) params.set('search', filters.search);
    const url = `${API_BASE}/customers${params.toString() ? `?${params.toString()}` : ''}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (json?.data) {
          setCustomers(json.data.map((item) => ({
            id: item.id,
            name: item.name,
            phone: item.phone,
            level: item.level,
            lastOrder: item.lastOrder,
            lifetimeValue: item.lifetimeValue,
            segment: item.segment,
            tags: item.tags,
          })));
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchCustomers();
  }, [filters]);

  const handleSaveCustomer = async (customer) => {
    try {
      if (customer.id) {
        await fetch(`${API_BASE}/customers/${customer.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: customer.name,
            phone: customer.phone,
            level: customer.level,
            segment: customer.segment,
            lifetimeValue: Number(customer.lifetimeValue) || 0,
            tags: customer.tags || [],
          }),
        });
      } else {
        await fetch(`${API_BASE}/customers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: customer.name,
            phone: customer.phone,
            level: customer.level,
            segment: customer.segment,
            lifetimeValue: Number(customer.lifetimeValue) || 0,
            tags: customer.tags || [],
          }),
        });
      }
      setEditingCustomer(null);
      fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  };
  const summary = customers.reduce((acc, customer) => {
    acc[customer.level] = (acc[customer.level] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h1>客户管理</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 16 }}>
        {Object.entries(summary).map(([key, value]) => (
          <div key={key} style={{ background: '#fff', padding: 16, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ color: '#6b7280', fontSize: 14 }}>{key}</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>{value}人</div>
          </div>
        ))}
      </div>
      <div style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
          <select value={filters.level} onChange={(e) => setFilters({ ...filters, level: e.target.value })} style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #e5e7eb' }}>
            <option value="">全部等级</option>
            <option value="VIP">VIP</option>
            <option value="普通">普通</option>
          </select>
          <input placeholder="分层/标签/姓名/电话" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} style={{ flex: 1, padding: '8px 10px', borderRadius: 8, border: '1px solid #e5e7eb' }} />
          <button onClick={() => setFilters({ level: '', segment: '', search: '' })} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}>重置</button>
          <button onClick={() => fetchCustomers()} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer' }}>筛选</button>
          <div style={{ marginLeft: 'auto' }}>
            <button onClick={() => setEditingCustomer({ name: '', phone: '', level: '普通', segment: '', tags: [], lifetimeValue: 0 })} style={{ padding: '8px 12px', border: 'none', borderRadius: 8, background: '#16a34a', color: '#fff', cursor: 'pointer' }}>新增客户</button>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
              <th style={{ padding: '10px 8px' }}>客户</th>
              <th style={{ padding: '10px 8px' }}>电话</th>
              <th style={{ padding: '10px 8px' }}>等级</th>
              <th style={{ padding: '10px 8px' }}>分层</th>
              <th style={{ padding: '10px 8px' }}>最近订单</th>
              <th style={{ padding: '10px 8px' }}>累计消费</th>
              <th style={{ padding: '10px 8px' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.phone} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '10px 8px' }}>{customer.name}</td>
                <td style={{ padding: '10px 8px' }}>{customer.phone}</td>
                <td style={{ padding: '10px 8px' }}>
                  <div style={{ display: 'inline-block', padding: '4px 8px', borderRadius: 999, background: '#dcfce7', color: '#166534', fontSize: 12 }}>{customer.level}</div>
                </td>
                <td style={{ padding: '10px 8px' }}>
                  <div>{customer.segment}</div>
                  <div style={{ marginTop: 4, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {(customer.tags || []).map((tag) => (
                      <span key={tag} style={{ padding: '3px 6px', borderRadius: 999, background: '#f3f4f6', fontSize: 12 }}>{tag}</span>
                    ))}
                  </div>
                </td>
                <td style={{ padding: '10px 8px' }}>{customer.lastOrder}</td>
                <td style={{ padding: '10px 8px' }}>¥{customer.lifetimeValue}</td>
                <td style={{ padding: '10px 8px' }}>
                  <button onClick={() => setEditingCustomer(customer)} style={{ padding: '6px 10px', border: 'none', borderRadius: 8, background: '#2563eb', color: '#fff', cursor: 'pointer' }}>编辑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingCustomer && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 30 }}>
          <div style={{ background: '#fff', width: 520, maxWidth: '95vw', borderRadius: 16, padding: 24, boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>编辑客户 · {editingCustomer.name}</h3>
              <button onClick={() => setEditingCustomer(null)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 18 }}>×</button>
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', color: '#6b7280', marginBottom: 6 }}>姓名</label>
                  <input value={editingCustomer.name} onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#6b7280', marginBottom: 6 }}>电话</label>
                  <input value={editingCustomer.phone} onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
                <div>
                  <label style={{ display: 'block', color: '#6b7280', marginBottom: 6 }}>等级</label>
                  <select value={editingCustomer.level} onChange={(e) => setEditingCustomer({ ...editingCustomer, level: e.target.value })} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }}>
                    <option>VIP</option>
                    <option>普通</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', color: '#6b7280', marginBottom: 6 }}>分层</label>
                  <input value={editingCustomer.segment} onChange={(e) => setEditingCustomer({ ...editingCustomer, segment: e.target.value })} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }} />
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <label style={{ display: 'block', color: '#6b7280', marginBottom: 6 }}>标签（逗号分隔）</label>
                <input value={(editingCustomer.tags || []).join(',')} onChange={(e) => setEditingCustomer({ ...editingCustomer, tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
                <button onClick={() => setEditingCustomer(null)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}>取消</button>
                <button onClick={() => handleSaveCustomer(editingCustomer)} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer' }}>保存</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PromotionsView() {
  const [promotions, setPromotions] = useState([]);
  const [form, setForm] = useState({ name: '', type: '套餐', discount: '', status: '进行中' });
  const [editingPromotion, setEditingPromotion] = useState(null);

  const fetchPromotions = () => {
    fetch(`${API_BASE}/promotions`)
      .then((res) => res.json())
      .then((json) => {
        if (json?.data) {
          setPromotions(json.data);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleSavePromotion = async (promo) => {
    try {
      await fetch(`${API_BASE}/promotions/${promo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: promo.name,
          type: promo.type,
          discount: Number(promo.discount) || 0,
          status: promo.status,
          linkedOrders: promo.linkedOrders || [],
        }),
      });
      setEditingPromotion(null);
      fetchPromotions();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch(`${API_BASE}/promotions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          discount: Number(form.discount),
        }),
      });
      setForm({ name: '', type: '套餐', discount: '', status: '进行中' });
      fetchPromotions();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>促销与套餐</h1>
      <div style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ margin: 0 }}>新增营销活动</h3>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="活动名称"
            style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8 }}
          />
          <select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8 }}>
            <option value="套餐">套餐</option>
            <option value="满减">满减</option>
            <option value="折扣">折扣</option>
          </select>
          <input
            required
            type="number"
            value={form.discount}
            onChange={(event) => setForm({ ...form, discount: event.target.value })}
            placeholder="优惠额度"
            style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8 }}
          />
          <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} style={{ padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8 }}>
            <option value="进行中">进行中</option>
            <option value="已结束">已结束</option>
            <option value="待开始">待开始</option>
          </select>
          <button type="submit" style={{ padding: '10px 12px', border: 'none', borderRadius: 8, background: '#d97706', color: '#fff', cursor: 'pointer' }}>提交活动</button>
        </form>
      </div>

      <div style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ margin: 0 }}>营销活动</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
              <th style={{ padding: '10px 8px' }}>活动</th>
              <th style={{ padding: '10px 8px' }}>类型</th>
              <th style={{ padding: '10px 8px' }}>优惠</th>
              <th style={{ padding: '10px 8px' }}>状态</th>
              <th style={{ padding: '10px 8px' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '10px 8px' }}>{item.name}</td>
                <td style={{ padding: '10px 8px' }}>{item.type}</td>
                <td style={{ padding: '10px 8px' }}>{item.discount}元</td>
                <td style={{ padding: '10px 8px' }}>{item.status}</td>
                <td style={{ padding: '10px 8px' }}>
                  <button onClick={() => setEditingPromotion(item)} style={{ padding: '6px 10px', border: 'none', borderRadius: 8, background: '#2563eb', color: '#fff', cursor: 'pointer' }}>编辑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingPromotion && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 30 }}>
          <div style={{ background: '#fff', width: 520, maxWidth: '95vw', borderRadius: 16, padding: 24, boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>编辑活动 · {editingPromotion.name}</h3>
              <button onClick={() => setEditingPromotion(null)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 18 }}>×</button>
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: 'block', color: '#6b7280', marginBottom: 6 }}>名称</label>
                <input value={editingPromotion.name} onChange={(e) => setEditingPromotion({ ...editingPromotion, name: e.target.value })} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', color: '#6b7280', marginBottom: 6 }}>类型</label>
                  <select value={editingPromotion.type} onChange={(e) => setEditingPromotion({ ...editingPromotion, type: e.target.value })} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }}>
                    <option>套餐</option>
                    <option>满减</option>
                    <option>折扣</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', color: '#6b7280', marginBottom: 6 }}>优惠</label>
                  <input type="number" value={editingPromotion.discount} onChange={(e) => setEditingPromotion({ ...editingPromotion, discount: e.target.value })} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }} />
                </div>
              </div>
              <div style={{ marginTop: 8 }}>
                <label style={{ display: 'block', color: '#6b7280', marginBottom: 6 }}>状态</label>
                <select value={editingPromotion.status} onChange={(e) => setEditingPromotion({ ...editingPromotion, status: e.target.value })} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }}>
                  <option>进行中</option>
                  <option>已结束</option>
                  <option>待开始</option>
                </select>
              </div>
              <div style={{ marginTop: 8 }}>
                <label style={{ display: 'block', color: '#6b7280', marginBottom: 6 }}>联动订单（逗号分隔）</label>
                <input value={(editingPromotion.linkedOrders || []).join(',')} onChange={(e) => setEditingPromotion({ ...editingPromotion, linkedOrders: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
                <button onClick={() => setEditingPromotion(null)} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}>取消</button>
                <button onClick={() => handleSavePromotion(editingPromotion)} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer' }}>保存</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ReportsView() {
  return (
    <div>
      <h1>报表中心</h1>
      <div style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <p>周报：已生成</p>
        <p>月报：待生成</p>
        <p>ROI分析：已就绪</p>
      </div>
    </div>
  );
}

export default function App() {
  const [activeKey, setActiveKey] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('token')));
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: '123456' }),
      });
      const json = await res.json();
      if (json?.code === 0) {
        localStorage.setItem('token', json.data.token || '');
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const renderView = () => {
    switch (activeKey) {
      case 'products':
        return <ProductsView />;
      case 'orders':
        return <OrdersView />;
      case 'customers':
        return <CustomersView />;
      case 'promotions':
        return <PromotionsView />;
      case 'reports':
        return <ReportsView />;
      default:
        return <DashboardView setActiveKey={setActiveKey} />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fb' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: 360, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0 }}>和优良品 · 管理后台</h2>
          <p style={{ color: '#6b7280' }}>登录后可查看门店、产品、订单与客户数据</p>
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{ width: '100%', padding: '12px 16px', border: 'none', borderRadius: 10, background: '#2563eb', color: '#fff', cursor: 'pointer', fontSize: 16 }}
          >
            {loading ? '登录中...' : '登录系统'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f7fb', fontFamily: 'Arial, sans-serif' }}>
      <aside style={{ width: 220, background: '#1f2937', color: '#fff', padding: '20px 16px' }}>
        <h3 style={{ marginTop: 0, marginBottom: 24 }}>管理后台</h3>
        {menuItems.map((item) => (
          <div
            key={item.key}
            onClick={() => setActiveKey(item.key)}
            style={{
              padding: '12px 10px',
              marginBottom: 8,
              borderRadius: 8,
              cursor: 'pointer',
              background: activeKey === item.key ? '#374151' : 'transparent',
            }}
          >
            {item.label}
          </div>
        ))}
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ background: '#fff', padding: '16px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 14, color: '#6b7280' }}>当前模块</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{menuItems.find((item) => item.key === activeKey)?.label || '经营大屏'}</div>
          </div>
          <div style={{ color: '#6b7280' }}>管理员 · 运营中心</div>
        </header>

        <main style={{ flex: 1, padding: 24 }}>
          {renderView()}
        </main>
      </div>
    </div>
  );
}
