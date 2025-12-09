import { useState } from 'react';
import { ProductCard } from './ProductCard';

const categories = ['All', 'Serums', 'Moisturizers', 'Cleansers', 'Treatments', 'Masks'];

const products = [
  {
    id: 1,
    name: 'Radiance Serum',
    category: 'Serums',
    price: 68,
    image: 'https://images.unsplash.com/photo-1643379850623-7eb6442cd262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc2tpbmNhcmUlMjBzZXJ1bXxlbnwxfHx8fDE3NjQwMDAwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Brightening vitamin C serum for luminous skin',
  },
  {
    id: 2,
    name: 'Hydrating Moisturizer',
    category: 'Moisturizers',
    price: 52,
    image: 'https://images.unsplash.com/photo-1667242003558-e42942d2b911?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpYWwlMjBjcmVhbSUyMGphcnxlbnwxfHx8fDE3NjQwMDAwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Rich cream with hyaluronic acid for all-day moisture',
  },
  {
    id: 3,
    name: 'Gentle Cleanser',
    category: 'Cleansers',
    price: 42,
    image: 'https://images.unsplash.com/photo-1686831889383-290d9bab10e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGNsZWFuc2VyfGVufDF8fHx8MTc2NDAwMDA1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Mild foam cleanser for sensitive skin',
  },
  {
    id: 4,
    name: 'Night Recovery Cream',
    category: 'Moisturizers',
    price: 78,
    image: 'https://images.unsplash.com/photo-1618478297003-218b7eddfe68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3QlMjBib3R0bGV8ZW58MXx8fHwxNzYzODc5MDYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Intensive overnight treatment for skin renewal',
  },
  {
    id: 5,
    name: 'Retinol Treatment',
    category: 'Treatments',
    price: 85,
    image: 'https://images.unsplash.com/photo-1739980737820-b6bb1a9b8456?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBza2luY2FyZXxlbnwxfHx8fDE3NjQwMDAwNTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Anti-aging retinol formula for smoother skin',
  },
  {
    id: 6,
    name: 'Brightening Serum',
    category: 'Serums',
    price: 72,
    image: 'https://images.unsplash.com/photo-1643379850623-7eb6442cd262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc2tpbmNhcmUlMjBzZXJ1bXxlbnwxfHx8fDE3NjQwMDAwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Niacinamide serum for even skin tone',
  },
  {
    id: 7,
    name: 'Exfoliating Cleanser',
    category: 'Cleansers',
    price: 46,
    image: 'https://images.unsplash.com/photo-1686831889383-290d9bab10e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGNsZWFuc2VyfGVufDF8fHx8MTc2NDAwMDA1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Gentle exfoliant with natural enzymes',
  },
  {
    id: 8,
    name: 'Clay Purifying Mask',
    category: 'Masks',
    price: 48,
    image: 'https://images.unsplash.com/photo-1667242003558-e42942d2b911?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpYWwlMjBjcmVhbSUyMGphcnxlbnwxfHx8fDE3NjQwMDAwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Deep cleansing mask for clear, refined pores',
  },
  {
    id: 9,
    name: 'Hydrating Face Mask',
    category: 'Masks',
    price: 44,
    image: 'https://images.unsplash.com/photo-1618478297003-218b7eddfe68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3QlMjBib3R0bGV8ZW58MXx8fHwxNzYzODc5MDYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Intense moisture boost in just 15 minutes',
  },
  {
    id: 10,
    name: 'Eye Cream',
    category: 'Treatments',
    price: 58,
    image: 'https://images.unsplash.com/photo-1739980737820-b6bb1a9b8456?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBza2luY2FyZXxlbnwxfHx8fDE3NjQwMDAwNTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Reduce fine lines and dark circles',
  },
  {
    id: 11,
    name: 'Daily SPF Moisturizer',
    category: 'Moisturizers',
    price: 54,
    image: 'https://images.unsplash.com/photo-1667242003558-e42942d2b911?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpYWwlMjBjcmVhbSUyMGphcnxlbnwxfHx8fDE3NjQwMDAwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Broad spectrum SPF 50 protection',
  },
  {
    id: 12,
    name: 'Peptide Serum',
    category: 'Serums',
    price: 92,
    image: 'https://images.unsplash.com/photo-1643379850623-7eb6442cd262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc2tpbmNhcmUlMjBzZXJ1bXxlbnwxfHx8fDE3NjQwMDAwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Advanced peptide complex for firmer skin',
  },
];

export function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl mb-4">Shop All Products</h1>
          <p className="text-xl text-neutral-600">
            Discover our complete collection of premium skincare
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 transition-colors ${
                  selectedCategory === category
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-neutral-900 border border-neutral-300 hover:border-neutral-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-neutral-600">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
