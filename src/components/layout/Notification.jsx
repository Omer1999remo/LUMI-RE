import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function Notification() {
  const { notification } = useShop();

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-[#c4a484]" />,
    error: <AlertCircle className="w-5 h-5 text-red-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
  };

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 right-8 bg-[#1a1a1a] text-white px-6 py-4 shadow-2xl z-50 flex items-center gap-3 rounded-sm font-sans max-w-sm"
        >
          {icons[notification.type] || icons.success}
          <span className="text-sm tracking-wide">{notification.msg}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
