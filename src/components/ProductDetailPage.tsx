import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner@2.0.3';
import { ShoppingBag, Star, Truck, RotateCcw, ShieldCheck, Minus, Plus } from 'lucide-react';
import { ProductCard } from './ProductCard';

// Product data - in a real app, this would come from a database
const allProducts = [
  {
    id: 1,
    name: 'Radiance Serum',
    category: 'Serums',
    price: 68,
    image: 'https://images.unsplash.com/photo-1643379850623-7eb6442cd262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc2tpbmNhcmUlMjBzZXJ1bXxlbnwxfHx8fDE3NjQwMDAwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Brightening vitamin C serum for luminous skin',
    fullDescription: 'Our Radiance Serum is a powerful brightening treatment formulated with 15% vitamin C, hyaluronic acid, and botanical extracts. This lightweight serum absorbs quickly to deliver potent antioxidants deep into your skin, helping to reduce dark spots, even skin tone, and restore your natural glow.',
    benefits: [
      'Brightens and evens skin tone',
      'Reduces appearance of dark spots',
      'Boosts collagen production',
      'Provides antioxidant protection',
      'Lightweight, fast-absorbing formula'
    ],
    ingredients: 'Aqua, Ascorbic Acid (Vitamin C), Hyaluronic Acid, Glycerin, Niacinamide, Ferulic Acid, Vitamin E, Aloe Vera Extract, Green Tea Extract',
    howToUse: 'Apply 3-4 drops to clean, dry skin morning and evening. Gently pat into face and neck, avoiding eye area. Follow with moisturizer. Always use SPF during the day.',
    size: '30ml / 1 fl oz',
    rating: 4.8,
    reviews: 234,
  },
  {
    id: 2,
    name: 'Hydrating Moisturizer',
    category: 'Moisturizers',
    price: 52,
    image: 'https://images.unsplash.com/photo-1667242003558-e42942d2b911?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpYWwlMjBjcmVhbSUyMGphcnxlbnwxfHx8fDE3NjQwMDAwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Rich cream with hyaluronic acid for all-day moisture',
    fullDescription: 'Experience deep, lasting hydration with our Hydrating Moisturizer. Enriched with triple-weight hyaluronic acid, ceramides, and nourishing botanical oils, this luxurious cream delivers multi-layer moisture that keeps skin supple and radiant throughout the day.',
    benefits: [
      'Provides 24-hour hydration',
      'Strengthens skin barrier',
      'Reduces fine lines and dryness',
      'Non-greasy, rich texture',
      'Suitable for all skin types'
    ],
    ingredients: 'Aqua, Hyaluronic Acid, Ceramide Complex, Squalane, Shea Butter, Jojoba Oil, Vitamin B5, Peptides, Niacinamide',
    howToUse: 'Apply to clean face and neck morning and night. Massage gently in upward circular motions until fully absorbed.',
    size: '50ml / 1.7 fl oz',
    rating: 4.9,
    reviews: 456,
  },
  {
    id: 3,
    name: 'Gentle Cleanser',
    category: 'Cleansers',
    price: 42,
    image: 'https://images.unsplash.com/photo-1686831889383-290d9bab10e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGNsZWFuc2VyfGVufDF8fHx8MTc2NDAwMDA1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Mild foam cleanser for sensitive skin',
    fullDescription: 'A gentle yet effective cleanser that removes makeup, dirt, and impurities without stripping your skin. Formulated with calming chamomile and hydrating glycerin, this pH-balanced cleanser leaves skin feeling fresh, clean, and comfortable.',
    benefits: [
      'Removes makeup and impurities',
      'pH-balanced formula',
      'Soothes sensitive skin',
      'Maintains natural moisture',
      'Fragrance-free'
    ],
    ingredients: 'Aqua, Glycerin, Chamomile Extract, Aloe Vera, Cucumber Extract, Panthenol, Allantoin',
    howToUse: 'Wet face with lukewarm water. Apply a small amount to hands and work into a lather. Massage gently onto face and neck. Rinse thoroughly and pat dry.',
    size: '150ml / 5 fl oz',
    rating: 4.7,
    reviews: 189,
  },
  {
    id: 4,
    name: 'Night Recovery Cream',
    category: 'Moisturizers',
    price: 78,
    image: 'https://images.unsplash.com/photo-1618478297003-218b7eddfe68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3QlMjBib3R0bGV8ZW58MXx8fHwxNzYzODc5MDYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Intensive overnight treatment for skin renewal',
    fullDescription: 'Transform your skin while you sleep with our Night Recovery Cream. This rich, restorative treatment combines peptides, retinol, and nourishing oils to support skin renewal, reduce signs of aging, and restore radiance.',
    benefits: [
      'Supports overnight skin renewal',
      'Reduces fine lines and wrinkles',
      'Deeply nourishing formula',
      'Improves skin texture',
      'Wake up with refreshed skin'
    ],
    ingredients: 'Aqua, Retinol, Peptide Complex, Argan Oil, Rosehip Oil, Vitamin E, Hyaluronic Acid, Shea Butter',
    howToUse: 'Apply generously to clean face and neck before bed. Use 2-3 times per week initially, then increase as tolerated.',
    size: '50ml / 1.7 fl oz',
    rating: 4.9,
    reviews: 312,
  },
  {
    id: 5,
    name: 'Retinol Treatment',
    category: 'Treatments',
    price: 85,
    image: 'https://images.unsplash.com/photo-1739980737820-b6bb1a9b8456?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBza2luY2FyZXxlbnwxfHx8fDE3NjQwMDAwNTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Anti-aging retinol formula for smoother skin',
    fullDescription: 'Our advanced Retinol Treatment harnesses the power of time-released retinol to minimize irritation while maximizing results. This potent formula helps reduce wrinkles, refine texture, and reveal smoother, younger-looking skin.',
    benefits: [
      'Reduces wrinkles and fine lines',
      'Improves skin texture',
      'Minimizes pores',
      'Time-released for less irritation',
      'Clinically proven results'
    ],
    ingredients: 'Aqua, Encapsulated Retinol, Niacinamide, Peptides, Squalane, Vitamin E, Bisabolol',
    howToUse: 'Apply a pea-sized amount to clean, dry skin in the evening. Start 2-3 times per week and gradually increase. Always use SPF during the day.',
    size: '30ml / 1 fl oz',
    rating: 4.8,
    reviews: 267,
  },
  {
    id: 6,
    name: 'Brightening Serum',
    category: 'Serums',
    price: 72,
    image: 'https://images.unsplash.com/photo-1643379850623-7eb6442cd262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc2tpbmNhcmUlMjBzZXJ1bXxlbnwxfHx8fDE3NjQwMDAwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Niacinamide serum for even skin tone',
    fullDescription: 'Achieve a more even complexion with our Brightening Serum. Formulated with 10% niacinamide, this powerful serum targets dark spots, hyperpigmentation, and uneven tone for visibly brighter, more radiant skin.',
    benefits: [
      'Evens skin tone',
      'Fades dark spots',
      'Minimizes pores',
      'Controls oil production',
      'Strengthens skin barrier'
    ],
    ingredients: 'Aqua, Niacinamide, Alpha Arbutin, Licorice Extract, Tranexamic Acid, Hyaluronic Acid',
    howToUse: 'Apply 3-4 drops to clean skin morning and evening. Follow with moisturizer and SPF.',
    size: '30ml / 1 fl oz',
    rating: 4.7,
    reviews: 198,
  },
];

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<'description' | 'ingredients' | 'reviews'>('description');

  const product = allProducts.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl mb-4">Product not found</h1>
        <button
          onClick={() => navigate('/shop')}
          className="bg-neutral-900 text-white px-8 py-4 hover:bg-neutral-800 transition-colors"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
    toast.success(`${product.name} ${quantity > 1 ? `(${quantity})` : ''} added to cart`);
  };

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="w-full">
      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/shop')}
          className="text-neutral-600 hover:text-neutral-900 mb-8 transition-colors"
        >
          ← Back to Shop
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="aspect-square bg-neutral-100">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div>
            <p className="text-neutral-600 mb-2">{product.category}</p>
            <h1 className="text-4xl mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-neutral-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-neutral-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <p className="text-3xl mb-6">${product.price}</p>

            <p className="text-lg text-neutral-700 mb-6">{product.fullDescription}</p>

            {/* Key Benefits */}
            <div className="mb-8">
              <h3 className="text-xl mb-3">Key Benefits</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-neutral-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-neutral-700 mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-neutral-300 hover:bg-neutral-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-neutral-300 hover:bg-neutral-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-neutral-900 text-white py-4 mb-4 hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>

            {/* Product Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-200">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-neutral-600" />
                <p className="text-sm text-neutral-600">Free Shipping</p>
                <p className="text-xs text-neutral-500">Orders over $75</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-neutral-600" />
                <p className="text-sm text-neutral-600">Easy Returns</p>
                <p className="text-xs text-neutral-500">30-day policy</p>
              </div>
              <div className="text-center">
                <ShieldCheck className="w-6 h-6 mx-auto mb-2 text-neutral-600" />
                <p className="text-sm text-neutral-600">Secure Checkout</p>
                <p className="text-xs text-neutral-500">SSL encrypted</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          <div className="border-b border-neutral-200 mb-6">
            <div className="flex gap-8">
              <button
                onClick={() => setSelectedTab('description')}
                className={`pb-4 border-b-2 transition-colors ${
                  selectedTab === 'description'
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900'
                }`}
              >
                How to Use
              </button>
              <button
                onClick={() => setSelectedTab('ingredients')}
                className={`pb-4 border-b-2 transition-colors ${
                  selectedTab === 'ingredients'
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Ingredients
              </button>
              <button
                onClick={() => setSelectedTab('reviews')}
                className={`pb-4 border-b-2 transition-colors ${
                  selectedTab === 'reviews'
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Reviews ({product.reviews})
              </button>
            </div>
          </div>

          <div className="max-w-3xl">
            {selectedTab === 'description' && (
              <div>
                <h3 className="text-xl mb-4">How to Use</h3>
                <p className="text-neutral-700 mb-4">{product.howToUse}</p>
                <p className="text-neutral-600">Size: {product.size}</p>
              </div>
            )}

            {selectedTab === 'ingredients' && (
              <div>
                <h3 className="text-xl mb-4">Full Ingredients List</h3>
                <p className="text-neutral-700">{product.ingredients}</p>
              </div>
            )}

            {selectedTab === 'reviews' && (
              <div>
                <h3 className="text-xl mb-6">Customer Reviews</h3>
                <div className="space-y-6">
                  {/* Sample reviews */}
                  {[
                    {
                      name: 'Sarah M.',
                      rating: 5,
                      date: 'November 15, 2024',
                      comment: 'Absolutely love this product! My skin has never looked better. I noticed results within the first week.',
                    },
                    {
                      name: 'Jessica L.',
                      rating: 5,
                      date: 'November 10, 2024',
                      comment: 'This is now a staple in my skincare routine. The texture is perfect and it absorbs quickly.',
                    },
                    {
                      name: 'Emily R.',
                      rating: 4,
                      date: 'November 5, 2024',
                      comment: 'Great product! Took a few weeks to see results but definitely worth the wait. Will repurchase.',
                    },
                  ].map((review, index) => (
                    <div key={index} className="pb-6 border-b border-neutral-200 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <span>{review.name}</span>
                        <span className="text-sm text-neutral-500">{review.date}</span>
                      </div>
                      <div className="flex mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-neutral-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-neutral-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
