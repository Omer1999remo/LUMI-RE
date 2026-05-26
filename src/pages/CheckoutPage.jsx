import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Lock, Truck, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import Breadcrumb from '../components/ui/Breadcrumb';

const STEPS = ['Cart', 'Shipping', 'Payment', 'Confirmation'];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'United States',
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [payment, setPayment] = useState({ cardName: '', cardNumber: '', expiry: '', cvv: '' });
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [orderNumber] = useState(() => 'LMR-' + Math.floor(10000 + Math.random() * 90000));

  const shippingCost = shippingMethod === 'express' ? 18 : cartTotal >= 150 ? 0 : 8;
  const discount = promoApplied ? Math.round(cartTotal * 0.1) : 0;
  const total = cartTotal - discount + shippingCost;

  const applyPromo = () => {
    if (promo.toUpperCase() === 'LUMIERE10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
    }
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setStep(3);
    clearCart();
    window.scrollTo(0, 0);
  };

  if (cart.length === 0 && step < 3) {
    return (
      <div className="min-h-screen bg-[#f5f2ed] flex items-center justify-center pt-20 font-sans">
        <div className="text-center">
          <p className="font-serif text-3xl text-[#1a1a1a] mb-4">Your cart is empty</p>
          <Link to="/collections" className="inline-block bg-[#1a1a1a] text-white px-8 py-3 tracking-widest hover:bg-[#c4a484] transition-colors text-sm">
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f2ed] pt-24 pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <Link to="/" className="font-serif text-3xl text-[#1a1a1a] tracking-widest">LUMIÈRE</Link>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center mb-12">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-2 ${i <= step ? 'text-[#1a1a1a]' : 'text-gray-400'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${i < step ? 'bg-[#c4a484] text-white' : i === step ? 'bg-[#1a1a1a] text-white' : 'border border-gray-300 text-gray-400'}`}>
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className="text-xs tracking-wide hidden sm:block">{s}</span>
              </div>
              {i < STEPS.length - 1 && <ChevronRight className="w-4 h-4 text-gray-300 mx-3" />}
            </React.Fragment>
          ))}
        </div>

        {step === 3 ? (
          <OrderConfirmation orderNumber={orderNumber} shipping={shipping} total={total} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {step === 0 && (
                <CartReview cart={cart} cartTotal={cartTotal} promo={promo} setPromo={setPromo} promoApplied={promoApplied} promoError={promoError} applyPromo={applyPromo} onNext={() => { setStep(1); window.scrollTo(0, 0); }} />
              )}
              {step === 1 && (
                <ShippingForm
                  shipping={shipping}
                  setShipping={setShipping}
                  shippingMethod={shippingMethod}
                  setShippingMethod={setShippingMethod}
                  onSubmit={handleShippingSubmit}
                  onBack={() => setStep(0)}
                />
              )}
              {step === 2 && (
                <PaymentForm
                  payment={payment}
                  setPayment={setPayment}
                  onSubmit={handlePaymentSubmit}
                  onBack={() => setStep(1)}
                />
              )}
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white p-6 shadow-sm sticky top-24">
                <h3 className="font-serif text-xl mb-6 text-[#1a1a1a]">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.key} className="flex gap-3">
                      <div className="relative">
                        <img src={item.image} alt={item.name} className="w-16 h-20 object-cover bg-gray-100" />
                        <span className="absolute -top-2 -right-2 bg-[#1a1a1a] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{item.quantity}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#1a1a1a]">{item.name}</p>
                        {item.size && <p className="text-xs text-gray-400">Size: {item.size}</p>}
                        <p className="text-sm text-gray-500">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span><span>${cartTotal.toFixed(2)}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo (LUMIERE10)</span><span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : `$${shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between font-medium text-base text-[#1a1a1a] border-t border-gray-100 pt-3 mt-3">
                    <span>Total</span><span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {step === 0 && (
                  <div className="mt-6">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promo}
                        onChange={e => { setPromo(e.target.value.toUpperCase()); setPromoError(''); }}
                        placeholder="Promo code"
                        className="flex-1 px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#c4a484] transition-colors"
                      />
                      <button onClick={applyPromo} className="px-4 py-2 bg-[#1a1a1a] text-white text-xs tracking-widest hover:bg-[#c4a484] transition-colors">
                        APPLY
                      </button>
                    </div>
                    {promoError && <p className="text-xs text-red-500 mt-2">{promoError}</p>}
                    {promoApplied && <p className="text-xs text-green-600 mt-2">Promo code applied!</p>}
                    <p className="text-xs text-gray-400 mt-2">Try: LUMIERE10</p>
                  </div>
                )}

                <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
                  <Lock className="w-3 h-3" />
                  <span>Secure checkout powered by SSL</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CartReview({ cart, onNext }) {
  return (
    <div className="bg-white p-8 shadow-sm">
      <h2 className="font-serif text-2xl text-[#1a1a1a] mb-6">Review Your Order</h2>
      <div className="space-y-4 mb-8">
        {cart.map(item => (
          <div key={item.key} className="flex gap-4 py-4 border-b border-gray-100">
            <img src={item.image} alt={item.name} className="w-20 h-24 object-cover bg-gray-100" />
            <div className="flex-1">
              <p className="font-serif text-lg text-[#1a1a1a]">{item.name}</p>
              {item.size && <p className="text-xs text-gray-400 mt-1">Size: {item.size}</p>}
              <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium text-[#2c2c2c]">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <button onClick={onNext} className="w-full bg-[#1a1a1a] text-white py-4 tracking-widest hover:bg-[#c4a484] transition-colors text-sm font-medium">
        PROCEED TO SHIPPING
      </button>
    </div>
  );
}

function ShippingForm({ shipping, setShipping, shippingMethod, setShippingMethod, onSubmit, onBack }) {
  const update = (field) => (e) => setShipping(s => ({ ...s, [field]: e.target.value }));

  return (
    <form onSubmit={onSubmit} className="bg-white p-8 shadow-sm">
      <h2 className="font-serif text-2xl text-[#1a1a1a] mb-6">Shipping Information</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">FIRST NAME *</label>
            <input required value={shipping.firstName} onChange={update('firstName')} className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] text-sm text-[#2c2c2c]" />
          </div>
          <div>
            <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">LAST NAME *</label>
            <input required value={shipping.lastName} onChange={update('lastName')} className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] text-sm text-[#2c2c2c]" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">EMAIL *</label>
            <input required type="email" value={shipping.email} onChange={update('email')} className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] text-sm text-[#2c2c2c]" />
          </div>
          <div>
            <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">PHONE</label>
            <input value={shipping.phone} onChange={update('phone')} className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] text-sm text-[#2c2c2c]" />
          </div>
        </div>
        <div>
          <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">ADDRESS *</label>
          <input required value={shipping.address} onChange={update('address')} className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] text-sm text-[#2c2c2c]" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">CITY *</label>
            <input required value={shipping.city} onChange={update('city')} className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] text-sm text-[#2c2c2c]" />
          </div>
          <div>
            <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">STATE *</label>
            <input required value={shipping.state} onChange={update('state')} className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] text-sm text-[#2c2c2c]" />
          </div>
          <div>
            <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">ZIP *</label>
            <input required value={shipping.zip} onChange={update('zip')} className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] text-sm text-[#2c2c2c]" />
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs tracking-widest text-[#2c2c2c] mb-3">SHIPPING METHOD</p>
          <div className="space-y-3">
            {[
              { value: 'standard', label: 'Standard Shipping', desc: '5–7 business days', price: 'Free on orders over $150' },
              { value: 'express', label: 'Express Shipping', desc: '2–3 business days', price: '$18.00' },
            ].map(opt => (
              <label key={opt.value} className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${shippingMethod === opt.value ? 'border-[#1a1a1a] bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${shippingMethod === opt.value ? 'border-[#1a1a1a]' : 'border-gray-300'}`}>
                    {shippingMethod === opt.value && <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#2c2c2c]">{opt.label}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"><Truck className="w-3 h-3" />{opt.desc}</p>
                  </div>
                </div>
                <span className="text-sm text-[#2c2c2c]">{opt.price}</span>
                <input type="radio" hidden value={opt.value} checked={shippingMethod === opt.value} onChange={() => setShippingMethod(opt.value)} />
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button type="button" onClick={onBack} className="flex-1 border border-gray-300 py-4 text-sm tracking-widest text-[#2c2c2c] hover:border-[#c4a484] hover:text-[#c4a484] transition-colors">
          BACK
        </button>
        <button type="submit" className="flex-1 bg-[#1a1a1a] text-white py-4 tracking-widest hover:bg-[#c4a484] transition-colors text-sm font-medium">
          CONTINUE TO PAYMENT
        </button>
      </div>
    </form>
  );
}

function PaymentForm({ payment, setPayment, onSubmit, onBack }) {
  const update = (field) => (e) => setPayment(p => ({ ...p, [field]: e.target.value }));

  const formatCard = (val) => val.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  const formatExpiry = (val) => val.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);

  return (
    <form onSubmit={onSubmit} className="bg-white p-8 shadow-sm">
      <h2 className="font-serif text-2xl text-[#1a1a1a] mb-2">Payment Details</h2>
      <p className="text-sm text-gray-500 mb-6 flex items-center gap-2"><Lock className="w-4 h-4" />Your payment information is secured with SSL encryption</p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">CARDHOLDER NAME *</label>
          <input required value={payment.cardName} onChange={update('cardName')} placeholder="Jane Doe" className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] text-sm text-[#2c2c2c]" />
        </div>
        <div>
          <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">CARD NUMBER *</label>
          <input
            required
            value={payment.cardNumber}
            onChange={e => setPayment(p => ({ ...p, cardNumber: formatCard(e.target.value) }))}
            placeholder="0000 0000 0000 0000"
            maxLength={19}
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] text-sm text-[#2c2c2c] font-mono tracking-wider"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">EXPIRY DATE *</label>
            <input
              required
              value={payment.expiry}
              onChange={e => setPayment(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
              placeholder="MM/YY"
              maxLength={5}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] text-sm text-[#2c2c2c]"
            />
          </div>
          <div>
            <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">CVV *</label>
            <input
              required
              value={payment.cvv}
              onChange={e => setPayment(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
              placeholder="123"
              maxLength={4}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] text-sm text-[#2c2c2c]"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button type="button" onClick={onBack} className="flex-1 border border-gray-300 py-4 text-sm tracking-widest text-[#2c2c2c] hover:border-[#c4a484] hover:text-[#c4a484] transition-colors">
          BACK
        </button>
        <button type="submit" className="flex-1 bg-[#1a1a1a] text-white py-4 tracking-widest hover:bg-[#c4a484] transition-colors text-sm font-medium flex items-center justify-center gap-2">
          <Lock className="w-4 h-4" /> PLACE ORDER
        </button>
      </div>
    </form>
  );
}

function OrderConfirmation({ orderNumber, shipping, total }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
      <div className="bg-white p-10 shadow-sm text-center">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <p className="text-[#c4a484] text-xs tracking-widest mb-2 font-sans">ORDER CONFIRMED</p>
        <h2 className="font-serif text-3xl text-[#1a1a1a] mb-4">Thank you, {shipping.firstName || 'dear customer'}!</h2>
        <p className="text-gray-600 mb-8 font-sans">Your order <span className="font-medium text-[#1a1a1a]">{orderNumber}</span> has been placed and is being prepared.</p>

        <div className="bg-gray-50 p-6 rounded-sm text-left mb-8">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs tracking-widest text-gray-500 mb-1">ORDER NUMBER</p>
              <p className="text-[#1a1a1a] font-medium">{orderNumber}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-gray-500 mb-1">ESTIMATED DELIVERY</p>
              <p className="text-[#1a1a1a]">5–7 business days</p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-gray-500 mb-1">TOTAL</p>
              <p className="text-[#1a1a1a] font-medium">${total.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-gray-500 mb-1">SHIP TO</p>
              <p className="text-[#1a1a1a]">{shipping.city || 'Your address'}</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-8">A confirmation email has been sent to {shipping.email || 'your email address'}.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/account" className="px-8 py-3 border border-[#2c2c2c] text-sm tracking-widest text-[#2c2c2c] hover:bg-[#2c2c2c] hover:text-white transition-colors">
            VIEW ORDER
          </Link>
          <Link to="/collections" className="px-8 py-3 bg-[#1a1a1a] text-white text-sm tracking-widest hover:bg-[#c4a484] transition-colors">
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
