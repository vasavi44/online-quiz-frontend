import React from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

const Alert = ({ type = 'info', message, onClose }) => {
  if (!message) return null;

  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertCircle size={20} />;
      case 'success':
        return <CheckCircle2 size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  return (
    <div className={`alert alert-${type}`}>
      <span style={{ display: 'flex', alignItems: 'center' }}>{getIcon()}</span>
      <span style={{ flex: 1 }}>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{ background: 'transparent', color: 'inherit', fontSize: '1.2rem', padding: '0 4px', lineHeight: 1 }}
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
