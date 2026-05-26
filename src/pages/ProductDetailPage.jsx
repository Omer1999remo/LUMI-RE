import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Share2, ChevronDown, CheckCircle, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { PRODUCTS, REVIEWS } from '../data/products';
import { useShop } from '../context/ShopContext';
import Breadcrumb from '../components/ui/Breadcrumb';
import Rating from '../components/ui/Rating';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === Number(id));
  const { addToCart, toggleWishlist, isInWishlist, showNotification } = useShop();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 font-sans">
        <div className="text-center">
          <p className="font-serif text-4xl text-[#1a1a1a] mb-4">Product Not Found</p>
          <Link to="/collections" className="text-[#c4a484] underline">Browse all products</Link>
        </div>
      </div>
    );
  }

  const reviews = REVIEWS.filter(r => r.productId === product.id);
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const inWishlist = isInWishlist(product.id);
  const discountPct = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    if (product.sizes.length > 1 && product.sizes[0] !== 'One Size' && !selectedSize) {
      showNotification('Please select a size', 'error');
      return;
    }
    addToCart(product.id, selectedSize, quantity);
  };

  const breadcrumb = [
    { label: 'Home', href: '/' },
    { label: product.category, href: `/${product.gender?.toLowerCase() || 'collections'}` },
    { label: product.name },
  ];

  const ACCORDION_ITEMS = [
    { key: 'details', title: 'Product Details', content: product.details },
    { key: 'shipping', title: 'Shipping & Returns', content: ['Free shipping on orders over $150', '30-day return window', 'Returns must be in original condition', 'Free returns on all orders'] },
    { key: 'care', title: 'Care Instructions', content: product.details?.filter(d => d.toLowerCase().includes('wash') || d.toLowerCase().includes('clean')) || ['See garment label for care instructions'] },
  ];

  return (
    <div className="min-h-screen bg-[#f5f2ed] font-sans">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16">
        <Breadcrumb items={breadcrumb} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Image Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-3 w-20 flex-shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square overflow-hidden border-2 transition-colors ${selectedImage === i ? 'border-[#1a1a1a]' : 'border-transparent hover:border-gray-300'}`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 relative overflow-hidden bg-gray-100 aspect-[3/4]">
              <motion.img
                key={selectedImage}
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-[#c4a484] text-white text-[10px] tracking-widest px-3 py-1">NEW</span>
              )}
              {discountPct && (
                <span className="absolute top-4 left-4 bg-[#1a1a1a] text-white text-[10px] tracking-widest px-3 py-1">-{discountPct}%</span>
              )}

              {/* Mobile thumbnails dots */}
              <div className="md:hidden absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${selectedImage === i ? 'bg-white' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2">
              <Link to={`/${product.gender?.toLowerCase() || 'collections'}`} className="text-[#c4a484] text-xs tracking-widest hover:underline">
                {product.category}
              </Link>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-light mb-3 text-[#1a1a1a]">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl text-[#2c2c2c]">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                )}
              </div>
              {discountPct && (
                <span className="bg-red-50 text-red-600 text-xs px-2 py-1 font-medium">{discountPct}% OFF</span>
              )}
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Rating value={product.rating} count={product.reviewCount} size="md" />
              <a href="#reviews" className="text-xs text-[#c4a484] hover:underline">{reviews.length} reviews</a>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-8">{product.description}</p>

            {/* Color selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs tracking-widest text-[#2c2c2c]">COLOR</span>
                  <span className="text-xs text-gray-500">{selectedColor}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-xs border transition-colors ${selectedColor === color ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white' : 'border-gray-300 hover:border-[#c4a484] text-[#2c2c2c]'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            {product.sizes && product.sizes[0] !== 'One Size' && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs tracking-widest text-[#2c2c2c]">SIZE</span>
                  <Link to="/size-guide" className="text-xs text-[#c4a484] hover:underline">Size Guide</Link>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] h-10 px-3 border text-sm transition-colors ${selectedSize === size ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white' : 'border-gray-300 hover:border-[#c4a484] hover:text-[#c4a484] text-[#2c2c2c]'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex gap-3 mb-4">
              <div className="flex items-center border border-gray-300 h-12">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 h-full hover:text-[#c4a484] transition-colors text-[#2c2c2c]">−</button>
                <span className="px-4 text-sm font-medium text-[#2c2c2c]">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-4 h-full hover:text-[#c4a484] transition-colors text-[#2c2c2c]">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#1a1a1a] text-white tracking-widest hover:bg-[#c4a484] transition-colors text-sm font-medium flex items-center justify-center gap-2 h-12"
              >
                <ShoppingBag className="w-4 h-4" />
                ADD TO CART
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-12 h-12 border flex items-center justify-center transition-colors ${inWishlist ? 'bg-[#c4a484] border-[#c4a484] text-white' : 'border-gray-300 text-gray-500 hover:border-[#c4a484] hover:text-[#c4a484]'}`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Stock indicator */}
            {product.stock <= 5 && (
              <p className="text-red-500 text-xs mb-4 font-sans">Only {product.stock} left in stock</p>
            )}

            {/* Shipping info */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-8 p-3 bg-white rounded-sm">
              <Truck className="w-4 h-4 text-[#c4a484] flex-shrink-0" />
              <span>Free shipping on orders over $150 · Free returns</span>
            </div>

            {/* Accordion */}
            <div className="border-t border-gray-200">
              {ACCORDION_ITEMS.map(item => (
                <div key={item.key} className="border-b border-gray-200">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === item.key ? null : item.key)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-xs tracking-widest text-[#2c2c2c] font-medium">{item.title.toUpperCase()}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${openAccordion === item.key ? 'rotate-180' : ''}`} />
                  </button>
                  {openAccordion === item.key && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pb-4"
                    >
                      <ul className="space-y-1.5">
                        {item.content.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-3.5 h-3.5 text-[#c4a484] mt-0.5 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <section id="reviews" className="mt-20 pt-12 border-t border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-serif text-3xl text-[#1a1a1a] mb-2">Customer Reviews</h2>
                <div className="flex items-center gap-3">
                  <Rating value={product.rating} count={product.reviewCount} size="lg" />
                  <span className="text-sm text-gray-500">{product.rating} out of 5</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map(review => (
                <div key={review.id} className="bg-white p-6 rounded-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm text-[#1a1a1a]">{review.author}</span>
                        {review.verified && (
                          <span className="flex items-center gap-1 text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            <CheckCircle className="w-3 h-3" /> Verified
                          </span>
                        )}
                      </div>
                      <Rating value={review.rating} showCount={false} />
                    </div>
                    <span className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h4 className="font-medium text-sm mb-2 text-[#2c2c2c]">{review.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{review.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-20 pt-12 border-t border-gray-200">
            <div className="text-center mb-12">
              <p className="text-[#c4a484] text-xs tracking-widest mb-3 font-sans">YOU MAY ALSO LIKE</p>
              <h2 className="font-serif text-3xl text-[#1a1a1a]">Complete the Look</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, idx) => (
                <ProductCard key={p.id} product={p} idx={idx} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          </section>
        )}
      </div>

      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
}
