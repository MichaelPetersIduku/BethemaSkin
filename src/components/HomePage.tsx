import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Droplets, ShieldCheck } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1662577066108-4bb081e818b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNraW5jYXJlJTIwcm91dGluZXxlbnwxfHx8fDE3NjM5ODc4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Skincare hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-7xl mb-6 tracking-tight">
            Radiant Skin Starts Here
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Experience the power of nature with our premium skincare collection
          </p>
          <Link
            to="/shop"
            className="inline-block bg-white text-neutral-900 px-8 py-4 hover:bg-neutral-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-6">
                <Sparkles className="w-8 h-8 text-neutral-900" />
              </div>
              <h3 className="text-xl mb-4">Natural Ingredients</h3>
              <p className="text-neutral-600">
                Carefully selected botanicals and minerals for optimal skin health
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-6">
                <Droplets className="w-8 h-8 text-neutral-900" />
              </div>
              <h3 className="text-xl mb-4">Deep Hydration</h3>
              <p className="text-neutral-600">
                Lock in moisture for soft, supple skin that glows from within
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-6">
                <ShieldCheck className="w-8 h-8 text-neutral-900" />
              </div>
              <h3 className="text-xl mb-4">Dermatologist Tested</h3>
              <p className="text-neutral-600">
                Safe, effective formulas approved by skincare professionals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4">Our Bestsellers</h2>
            <p className="text-xl text-neutral-600">
              Discover our most loved products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                id: 1,
                name: 'Radiance Serum',
                image: 'https://images.unsplash.com/photo-1643379850623-7eb6442cd262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc2tpbmNhcmUlMjBzZXJ1bXxlbnwxfHx8fDE3NjQwMDAwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
                price: '$68',
              },
              {
                id: 2,
                name: 'Hydrating Moisturizer',
                image: 'https://images.unsplash.com/photo-1667242003558-e42942d2b911?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNpYWwlMjBjcmVhbSUyMGphcnxlbnwxfHx8fDE3NjQwMDAwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
                price: '$52',
              },
              {
                id: 3,
                name: 'Gentle Cleanser',
                image: 'https://images.unsplash.com/photo-1686831889383-290d9bab10e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGNsZWFuc2VyfGVufDF8fHx8MTc2NDAwMDA1OHww&ixlib=rb-4.1.0&q=80&w=1080',
                price: '$42',
              },
            ].map((product, index) => (
              <div 
                key={index} 
                className="group cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="aspect-square bg-white mb-4 overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl mb-2">{product.name}</h3>
                <p className="text-neutral-600">{product.price}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/shop"
              className="inline-block bg-neutral-900 text-white px-8 py-4 hover:bg-neutral-800 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl mb-6">
                Our Story
              </h2>
              <p className="text-xl text-neutral-600 mb-6">
                Bethema Skin was born from a passion for natural beauty and a commitment to creating products that truly make a difference.
              </p>
              <p className="text-neutral-600 mb-6">
                We believe that healthy skin is beautiful skin. That's why we carefully formulate each product with premium ingredients that nourish, protect, and enhance your natural radiance.
              </p>
              <p className="text-neutral-600">
                Our mission is to provide you with skincare solutions that are not only effective but also a joy to use every day.
              </p>
            </div>
            <div className="relative h-[500px]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1739980737820-b6bb1a9b8456?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBza2luY2FyZXxlbnwxfHx8fDE3NjQwMDAwNTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Bethema Skin products"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl mb-6">Get In Touch</h2>
          <p className="text-xl text-neutral-600 mb-8">
            Have questions? We'd love to hear from you.
          </p>
          <a
            href="mailto:hello@bethemaskin.com"
            className="inline-block bg-neutral-900 text-white px-8 py-4 hover:bg-neutral-800 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}