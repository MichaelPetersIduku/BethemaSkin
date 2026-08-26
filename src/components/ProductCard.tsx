import { ShoppingBag, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "../contexts/CartContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../types/IProduct";

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Some products (e.g. "The Guided Four") store a "min-max" price range
  // since their final price depends on a variant chosen on the product page.
  const isRange = product.price.includes("-");
  const [rangeMin, rangeMax] = isRange ? product.price.split("-") : [];
  const priceLabel = isRange ? `₦${Number(rangeMin).toLocaleString()}–₦${Number(rangeMax).toLocaleString()}` : `₦${Number(product.price).toLocaleString()}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Quick-add uses the starting price for range-priced products; visiting
    // the product page lets the shopper pick a variant for the final price.
    addToCart({ id: product.id, name: product.name, price: isRange ? rangeMin : product.price, image: product.image });
    toast.success(`${product.name} added to bag`);
  };

  return (
    <div className="group cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="relative aspect-square rounded-sm mb-2 overflow-hidden bg-neutral-50">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <div className="absolute top-3 left-0 bg-white px-2 py-1">
            <span className="text-sm text-[#2b2724]">{product.badge}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-0.5 mb-2">
        {/* <div className="flex items-end gap-1"> */}
        {/* <Star className="w-5 h-5 fill-[#2b2724] text-[#2b2724]" /> */}
        {/* <span className="text-sm text-black">{product.rating > 0 ? `${product.rating}/5` : "New"}</span> */}
        {/* </div> */}
        <p className="font-['Syne',_sans-serif] font-medium text-base text-[#2b2724]">{product.name}</p>
        <p className="text-xs text-[#5b4f4d]">{product.description}</p>
        <p className="font-['Syne',_sans-serif] font-medium text-base text-[#2b2724] mt-1">{priceLabel}</p>
      </div>

      <button
        disabled={product.outOfStock}
        onClick={handleAddToCart}
        className="w-full bg-[#2b2724] text-white py-2.5 rounded-sm flex items-center justify-center gap-2 font-['Syne',_sans-serif] font-semibold disabled:opacity-50"
      >
        <ShoppingBag className="w-4 h-4" />
        {product.outOfStock ? "Out of stock" : "Add to bag"}
      </button>
    </div>
  );
}
