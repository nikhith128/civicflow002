import { useEffect, useState } from 'react';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 4000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  const config = {
    success: { icon: CheckCircle, bg: 'bg-green-50 border-green-200', text: 'text-green-800', icon_cls: 'text-green-500' },
    error: { icon: AlertTriangle, bg: 'bg-red-50 border-red-200', text: 'text-red-800', icon_cls: 'text-red-500' },
    info: { icon: Info, bg: 'bg-blue-50 border-blue-200', text: 'text-blue-800', icon_cls: 'text-blue-500' },
  };
  const c = config[type] || config.info;
  const Icon = c.icon;

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg max-w-sm transition-all duration-300 ${c.bg} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${c.icon_cls}`} />
      <p className={`text-sm font-medium flex-1 ${c.text}`}>{message}</p>
      <button onClick={onClose} className={`${c.icon_cls} hover:opacity-70`}>
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
    {toasts.map((t) => (
      <Toast key={t.id} {...t} onClose={() => removeToast(t.id)} />
    ))}
  </div>
);

export default Toast;

