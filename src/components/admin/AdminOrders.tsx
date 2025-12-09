import { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Eye, Package } from 'lucide-react';

export function AdminOrders() {
  const { orders, updateOrderStatus } = useAdmin();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredOrders =
    filterStatus === 'all'
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  const selectedOrderData = selectedOrder
    ? orders.find((o) => o.id === selectedOrder)
    : null;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl">Orders</h1>
        
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-neutral-300 focus:outline-none focus:border-neutral-900"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Orders List */}
        <div className="lg:col-span-2 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left py-4 px-6">Order ID</th>
                  <th className="text-left py-4 px-6">Customer</th>
                  <th className="text-left py-4 px-6">Date</th>
                  <th className="text-right py-4 px-6">Total</th>
                  <th className="text-center py-4 px-6">Status</th>
                  <th className="text-center py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-neutral-200 last:border-0 hover:bg-neutral-50"
                  >
                    <td className="py-4 px-6">{order.id}</td>
                    <td className="py-4 px-6">
                      <div>
                        <p>{order.customerName}</p>
                        <p className="text-sm text-neutral-600">{order.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-neutral-600">{order.date}</td>
                    <td className="py-4 px-6 text-right">${order.total.toFixed(2)}</td>
                    <td className="py-4 px-6 text-center">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(
                            order.id,
                            e.target.value as 'pending' | 'processing' | 'shipped' | 'delivered'
                          )
                        }
                        className={`px-3 py-1 text-sm rounded border-0 focus:outline-none focus:ring-2 ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-700 focus:ring-green-300'
                            : order.status === 'shipped'
                            ? 'bg-blue-100 text-blue-700 focus:ring-blue-300'
                            : order.status === 'processing'
                            ? 'bg-yellow-100 text-yellow-700 focus:ring-yellow-300'
                            : 'bg-neutral-100 text-neutral-700 focus:ring-neutral-300'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => setSelectedOrder(order.id)}
                        className="p-2 hover:bg-neutral-100 rounded transition-colors inline-flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-600">No orders found</p>
            </div>
          )}
        </div>

        {/* Order Details */}
        <div className="lg:col-span-1">
          {selectedOrderData ? (
            <div className="bg-white p-6 shadow-sm sticky top-8">
              <h2 className="text-xl mb-6">Order Details</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Order ID</p>
                  <p>{selectedOrderData.id}</p>
                </div>

                <div>
                  <p className="text-sm text-neutral-600 mb-1">Customer</p>
                  <p>{selectedOrderData.customerName}</p>
                  <p className="text-sm text-neutral-600">{selectedOrderData.email}</p>
                </div>

                <div>
                  <p className="text-sm text-neutral-600 mb-1">Order Date</p>
                  <p>{selectedOrderData.date}</p>
                </div>

                <div>
                  <p className="text-sm text-neutral-600 mb-1">Shipping Address</p>
                  <p className="text-sm">{selectedOrderData.shippingAddress}</p>
                </div>

                <div>
                  <p className="text-sm text-neutral-600 mb-1">Status</p>
                  <span
                    className={`inline-block px-3 py-1 text-sm rounded ${
                      selectedOrderData.status === 'delivered'
                        ? 'bg-green-100 text-green-700'
                        : selectedOrderData.status === 'shipped'
                        ? 'bg-blue-100 text-blue-700'
                        : selectedOrderData.status === 'processing'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {selectedOrderData.status}
                  </span>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <h3 className="mb-4">Order Items</h3>
                <div className="space-y-3 mb-6">
                  {selectedOrderData.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm"
                    >
                      <div>
                        <p>{item.productName}</p>
                        <p className="text-neutral-600">Qty: {item.quantity}</p>
                      </div>
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex justify-between text-lg">
                    <span>Total</span>
                    <span>${selectedOrderData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 shadow-sm text-center">
              <Eye className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-600">
                Select an order to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
