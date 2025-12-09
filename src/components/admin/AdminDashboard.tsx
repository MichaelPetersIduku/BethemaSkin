import { useAdmin } from '../../contexts/AdminContext';
import { DollarSign, ShoppingCart, Package, Clock } from 'lucide-react';

export function AdminDashboard() {
  const { getStats, orders, products } = useAdmin();
  const stats = getStats();

  const recentOrders = orders.slice(0, 5);
  const lowStockProducts = products.filter((p) => p.stock < 30).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-neutral-600 mb-1">Total Revenue</p>
          <p className="text-3xl">${stats.totalRevenue.toFixed(2)}</p>
        </div>

        <div className="bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-neutral-600 mb-1">Total Orders</p>
          <p className="text-3xl">{stats.totalOrders}</p>
        </div>

        <div className="bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-neutral-600 mb-1">Total Products</p>
          <p className="text-3xl">{stats.totalProducts}</p>
        </div>

        <div className="bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-neutral-600 mb-1">Pending Orders</p>
          <p className="text-3xl">{stats.pendingOrders}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white p-6 shadow-sm">
          <h2 className="text-xl mb-6">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between pb-4 border-b border-neutral-200 last:border-0"
              >
                <div>
                  <p className="mb-1">{order.id}</p>
                  <p className="text-sm text-neutral-600">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="mb-1">${order.total.toFixed(2)}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      order.status === 'delivered'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'shipped'
                        ? 'bg-blue-100 text-blue-700'
                        : order.status === 'processing'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white p-6 shadow-sm">
          <h2 className="text-xl mb-6">Low Stock Alert</h2>
          <div className="space-y-4">
            {lowStockProducts.length > 0 ? (
              lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between pb-4 border-b border-neutral-200 last:border-0"
                >
                  <div>
                    <p className="mb-1">{product.name}</p>
                    <p className="text-sm text-neutral-600">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`${
                        product.stock < 10
                          ? 'text-red-600'
                          : product.stock < 20
                          ? 'text-orange-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {product.stock} in stock
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-neutral-600 text-center py-4">
                All products are well stocked!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-white p-6 shadow-sm mt-8">
        <h2 className="text-xl mb-6">Top Selling Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4">Product</th>
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-right py-3 px-4">Price</th>
                <th className="text-right py-3 px-4">Sales</th>
                <th className="text-right py-3 px-4">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {products
                .sort((a, b) => b.sales - a.sales)
                .slice(0, 5)
                .map((product) => (
                  <tr key={product.id} className="border-b border-neutral-200 last:border-0">
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="py-3 px-4 text-neutral-600">{product.category}</td>
                    <td className="py-3 px-4 text-right">${product.price}</td>
                    <td className="py-3 px-4 text-right">{product.sales}</td>
                    <td className="py-3 px-4 text-right">
                      ${(product.price * product.sales).toFixed(2)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
