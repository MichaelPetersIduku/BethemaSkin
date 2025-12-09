import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Order {
  id: string;
  customerName: string;
  email: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  items: {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }[];
  date: string;
  shippingAddress: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  sales: number;
}

interface AdminContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  orders: Order[];
  products: Product[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addProduct: (product: Omit<Product, 'id' | 'sales'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  getStats: () => {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    pendingOrders: number;
  };
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Mock admin credentials (in a real app, this would be handled by a backend)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

// Mock initial data
const initialOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    total: 220,
    status: 'delivered',
    items: [
      { productId: 1, productName: 'Radiance Serum', quantity: 2, price: 68 },
      { productId: 2, productName: 'Hydrating Moisturizer', quantity: 1, price: 52 },
    ],
    date: '2024-11-20',
    shippingAddress: '123 Main St, New York, NY 10001',
  },
  {
    id: 'ORD-002',
    customerName: 'Emily Chen',
    email: 'emily.chen@example.com',
    total: 150,
    status: 'shipped',
    items: [
      { productId: 5, productName: 'Retinol Treatment', quantity: 1, price: 85 },
      { productId: 3, productName: 'Gentle Cleanser', quantity: 1, price: 42 },
    ],
    date: '2024-11-21',
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
  },
  {
    id: 'ORD-003',
    customerName: 'Michael Brown',
    email: 'michael.b@example.com',
    total: 124,
    status: 'processing',
    items: [
      { productId: 2, productName: 'Hydrating Moisturizer', quantity: 2, price: 52 },
    ],
    date: '2024-11-22',
    shippingAddress: '789 Pine Rd, Chicago, IL 60601',
  },
  {
    id: 'ORD-004',
    customerName: 'Jessica Williams',
    email: 'jessica.w@example.com',
    total: 195,
    status: 'pending',
    items: [
      { productId: 1, productName: 'Radiance Serum', quantity: 1, price: 68 },
      { productId: 4, productName: 'Night Recovery Cream', quantity: 1, price: 78 },
    ],
    date: '2024-11-23',
    shippingAddress: '321 Elm St, Houston, TX 77001',
  },
  {
    id: 'ORD-005',
    customerName: 'David Martinez',
    email: 'david.m@example.com',
    total: 72,
    status: 'pending',
    items: [
      { productId: 6, productName: 'Brightening Serum', quantity: 1, price: 72 },
    ],
    date: '2024-11-24',
    shippingAddress: '654 Maple Dr, Phoenix, AZ 85001',
  },
];

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Radiance Serum',
    category: 'Serums',
    price: 68,
    image: 'https://images.unsplash.com/photo-1643379850623-7eb6442cd262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc2tpbmNhcmUlMjBzZXJ1bXxlbnwxfHx8fDE3NjQwMDAwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Brightening vitamin C serum for luminous skin',
    stock: 45,
    sales: 234,
  },
  {
    id: 2,
    name: 'Hydrating Moisturizer',
    category: 'Moisturizers',
    price: 52,
    image: 'https://images.unsplash.com/photo-1667242003558-e42942d2b911?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpYWwlMjBjcmVhbSUyMGphcnxlbnwxfHx8fDE3NjQwMDAwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Rich cream with hyaluronic acid for all-day moisture',
    stock: 62,
    sales: 456,
  },
  {
    id: 3,
    name: 'Gentle Cleanser',
    category: 'Cleansers',
    price: 42,
    image: 'https://images.unsplash.com/photo-1686831889383-290d9bab10e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGNsZWFuc2VyfGVufDF8fHx8MTc2NDAwMDA1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Mild foam cleanser for sensitive skin',
    stock: 78,
    sales: 189,
  },
  {
    id: 4,
    name: 'Night Recovery Cream',
    category: 'Moisturizers',
    price: 78,
    image: 'https://images.unsplash.com/photo-1618478297003-218b7eddfe68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3QlMjBib3R0bGV8ZW58MXx8fHwxNzYzODc5MDYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Intensive overnight treatment for skin renewal',
    stock: 34,
    sales: 312,
  },
  {
    id: 5,
    name: 'Retinol Treatment',
    category: 'Treatments',
    price: 85,
    image: 'https://images.unsplash.com/photo-1739980737820-b6bb1a9b8456?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBza2luY2FyZXxlbnwxfHx8fDE3NjQwMDAwNTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Anti-aging retinol formula for smoother skin',
    stock: 28,
    sales: 267,
  },
  {
    id: 6,
    name: 'Brightening Serum',
    category: 'Serums',
    price: 72,
    image: 'https://images.unsplash.com/photo-1643379850623-7eb6442cd262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc2tpbmNhcmUlMjBzZXJ1bXxlbnwxfHx8fDE3NjQwMDAwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Niacinamide serum for even skin tone',
    stock: 51,
    sales: 198,
  },
];

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Check if user is already authenticated (from localStorage)
  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const addProduct = (product: Omit<Product, 'id' | 'sales'>) => {
    const newProduct: Product = {
      ...product,
      id: Math.max(...products.map((p) => p.id)) + 1,
      sales: 0,
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id: number, updatedProduct: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const getStats = () => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;
    const pendingOrders = orders.filter((o) => o.status === 'pending').length;

    return {
      totalRevenue,
      totalOrders,
      totalProducts,
      pendingOrders,
    };
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        orders,
        products,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        getStats,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
