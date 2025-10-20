import React, { useState } from 'react';
import { X, Package, Users, MapPin, User, ShoppingCart, Loader } from 'lucide-react';
import { db } from '../../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import SuccessModal from './SuccessModal';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderType?: 'retail' | 'distributor';
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, orderType = 'retail' }) => {
  const [selectedType, setSelectedType] = useState<'retail' | 'distributor'>(orderType);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState({ orderId: '', totalPrice: 0, phone: '' });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    zipCode: '',
    quantity: selectedType === 'retail' ? 1 : 100,
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const pricePerPack = selectedType === 'retail' ? 200 : 150;
  const minQuantity = selectedType === 'retail' ? 1 : 100;
  const totalPrice = formData.quantity * pricePerPack;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleTypeChange = (type: 'retail' | 'distributor') => {
    setSelectedType(type);
    setFormData(prev => ({
      ...prev,
      quantity: type === 'retail' ? 1 : 100
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.province.trim()) newErrors.province = 'Province is required';
    
    if (formData.quantity < minQuantity) {
      newErrors.quantity = `Minimum quantity is ${minQuantity} pack${minQuantity > 1 ? 's' : ''}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      try {
        const orderData = {
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          province: formData.province.trim(),
          zipCode: formData.zipCode.trim(),
          quantity: parseInt(formData.quantity.toString()),
          message: formData.message.trim(),
          orderType: selectedType,
          pricePerPack,
          totalPrice,
          createdAt: Timestamp.now(),
          status: 'pending'
        };

        const docRef = await addDoc(collection(db, 'orders'), orderData);
        
        // Show success modal instead of alert
        setSuccessData({
          orderId: docRef.id,
          totalPrice,
          phone: formData.phone
        });
        setShowSuccess(true);
        
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          province: '',
          zipCode: '',
          quantity: selectedType === 'retail' ? 1 : 100,
          message: ''
        });
      } catch (error) {
        console.error('Error submitting order:', error);
        alert('Error submitting order. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-400/30 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
          <button
            onClick={onClose}
            disabled={loading}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-t-2xl">
            <h2 className="text-3xl font-black text-white mb-2">
              Place Your Order
            </h2>
            <p className="text-white/90">Fill in your details below to complete your purchase</p>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Select Order Type</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleTypeChange('retail')}
                  disabled={loading}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 disabled:opacity-50 ${
                    selectedType === 'retail'
                      ? 'border-yellow-400 bg-yellow-400/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Package className={`w-8 h-8 ${selectedType === 'retail' ? 'text-yellow-400' : 'text-gray-400'}`} />
                    <div className="text-left">
                      <h4 className="font-bold text-white text-lg">Retail Order</h4>
                      <p className="text-sm text-gray-400">For personal use</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-yellow-400">₱200 <span className="text-sm text-gray-400">per pack</span></p>
                </button>

                <button
                  type="button"
                  onClick={() => handleTypeChange('distributor')}
                  disabled={loading}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 disabled:opacity-50 ${
                    selectedType === 'distributor'
                      ? 'border-yellow-400 bg-yellow-400/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Users className={`w-8 h-8 ${selectedType === 'distributor' ? 'text-yellow-400' : 'text-gray-400'}`} />
                    <div className="text-left">
                      <h4 className="font-bold text-white text-lg">Distributor Order</h4>
                      <p className="text-sm text-gray-400">Min. 100 packs</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-yellow-400">₱150 <span className="text-sm text-gray-400">per pack</span></p>
                  <span className="inline-block mt-2 text-xs bg-green-600 text-white px-2 py-1 rounded">Save 25%</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-yellow-400" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      disabled={loading}
                      className={`w-full px-4 py-3 bg-gray-800 border ${errors.fullName ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors disabled:opacity-50`}
                      placeholder="Juan Dela Cruz"
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={loading}
                      className={`w-full px-4 py-3 bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors disabled:opacity-50`}
                      placeholder="juan@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={loading}
                      className={`w-full px-4 py-3 bg-gray-800 border ${errors.phone ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors disabled:opacity-50`}
                      placeholder="09XX XXX XXXX"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      disabled={loading}
                      min={minQuantity}
                      className={`w-full px-4 py-3 bg-gray-800 border ${errors.quantity ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors disabled:opacity-50`}
                    />
                    {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                    <p className="text-xs text-gray-400 mt-1">Min: {minQuantity} pack{minQuantity > 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-yellow-400" />
                  Shipping Address
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={loading}
                      className={`w-full px-4 py-3 bg-gray-800 border ${errors.address ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors disabled:opacity-50`}
                      placeholder="123 Main Street, Barangay"
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        disabled={loading}
                        className={`w-full px-4 py-3 bg-gray-800 border ${errors.city ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors disabled:opacity-50`}
                        placeholder="Cebu City"
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Province <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        disabled={loading}
                        className={`w-full px-4 py-3 bg-gray-800 border ${errors.province ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors disabled:opacity-50`}
                        placeholder="Cebu"
                      />
                      {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        disabled={loading}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors disabled:opacity-50"
                        placeholder="6000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={loading}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors resize-none disabled:opacity-50"
                  placeholder="Any special instructions or questions..."
                />
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-yellow-400/30 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-300">
                    <span>Order Type:</span>
                    <span className="font-semibold text-white capitalize">{selectedType}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Price per Pack:</span>
                    <span className="font-semibold text-white">₱{pricePerPack}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Quantity:</span>
                    <span className="font-semibold text-white">{formData.quantity} pack{formData.quantity > 1 ? 's' : ''}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-white">Total:</span>
                      <span className="text-3xl font-black text-yellow-400">₱{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-red-600/50 hover:shadow-red-600/70 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Complete Order - ₱{totalPrice.toLocaleString()}
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                By placing an order, you agree to our terms and conditions. We will contact you to confirm your order and arrange payment.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        orderId={successData.orderId}
        totalPrice={successData.totalPrice}
        phone={successData.phone}
        orderType={selectedType}
      />
    </>
  );
};

export default OrderModal;