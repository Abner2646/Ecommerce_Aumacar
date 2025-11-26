// src/components/common/Modal.jsx

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div 
        className={`adm-modal ${sizeClasses[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="adm-modal-header">
          <h3 className="adm-modal-title">{title}</h3>
          <button
            onClick={onClose}
            className="adm-modal-close"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Body */}
        <div className="adm-modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;