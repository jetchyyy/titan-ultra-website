import React from 'react';
import { CheckCircle, X, Package } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  totalPrice: number;
  phone: string;
  orderType: 'retail' | 'distributor';
}

const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  orderId, 
  totalPrice, 
  phone,
  orderType 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/50 rounded-2xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center pt-8 pb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"></div>
            <CheckCircle className="w-20 h-20 text-green-500 relative animate-in zoom-in duration-500" />
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8 text-center">
          <h2 className="text-2xl font-black text-white mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-400 mb-6">
            Thank you for your order. We've received your request and will contact you shortly.
          </p>

          {/* Order Details */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 mb-6 text-left">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-700">
              <Package className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white">Order Details</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Order ID:</span>
                <span className="text-white font-mono text-sm">{orderId.substring(0, 12)}...</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Order Type:</span>
                <span className="text-white font-semibold text-sm capitalize">{orderType}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Total Amount:</span>
                <span className="text-yellow-400 font-bold text-lg">₱{totalPrice.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Contact Number:</span>
                <span className="text-white font-semibold text-sm">{phone}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
            <p className="text-blue-300 text-sm">
              <strong>Next Steps:</strong> Our team will contact you at <span className="font-semibold">{phone}</span> within 24 hours to confirm your order and arrange payment & delivery.
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-green-600/30 hover:shadow-green-600/50"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;