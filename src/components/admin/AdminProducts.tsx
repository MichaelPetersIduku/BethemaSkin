import { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

export function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    stock: '',
    image: '',
  });

  const handleOpenModal = (product?: any) => {
    if (product) {
      setEditingProduct(product.id);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        description: product.description,
        stock: product.stock.toString(),
        image: product.image,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: '',
        price: '',
        description: '',
        stock: '',
        image: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      description: formData.description,
      stock: parseInt(formData.stock),
      image: formData.image,
    };

    if (editingProduct) {
      updateProduct(editingProduct, productData);
      toast.success('Product updated successfully');
    } else {
      addProduct(productData);
      toast.success('Product added successfully');
    }

    handleCloseModal();
  };

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
      toast.success('Product deleted successfully');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl">Products</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-neutral-900 text-white px-6 py-3 hover:bg-neutral-800 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left py-4 px-6">Product</th>
                <th className="text-left py-4 px-6">Category</th>
                <th className="text-right py-4 px-6">Price</th>
                <th className="text-right py-4 px-6">Stock</th>
                <th className="text-right py-4 px-6">Sales</th>
                <th className="text-right py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-neutral-200 last:border-0">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-neutral-100 flex-shrink-0">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p>{product.name}</p>
                        <p className="text-sm text-neutral-600">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">{product.category}</td>
                  <td className="py-4 px-6 text-right">${product.price}</td>
                  <td className="py-4 px-6 text-right">
                    <span
                      className={`${
                        product.stock < 10
                          ? 'text-red-600'
                          : product.stock < 30
                          ? 'text-orange-600'
                          : 'text-neutral-900'
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">{product.sales}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="p-2 hover:bg-neutral-100 rounded transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-2 hover:bg-red-50 rounded transition-colors text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleCloseModal}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                <h2 className="text-2xl">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-neutral-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-neutral-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 mb-2">Category</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                  >
                    <option value="">Select a category</option>
                    <option value="Serums">Serums</option>
                    <option value="Moisturizers">Moisturizers</option>
                    <option value="Cleansers">Cleansers</option>
                    <option value="Treatments">Treatments</option>
                    <option value="Masks">Masks</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-700 mb-2">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-700 mb-2">Stock</label>
                    <input
                      type="number"
                      required
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-700 mb-2">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-neutral-900 text-white py-3 hover:bg-neutral-800 transition-colors"
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 border border-neutral-300 py-3 hover:bg-neutral-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
