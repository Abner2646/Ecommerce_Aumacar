// /src/components/common/ConfirmDialog.jsx 

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = '¿Estás seguro?',
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'danger' // danger, warning, info
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: 'fa-exclamation-triangle',
          iconColor: 'text-red-600',
          buttonClass: 'adm-btn-danger'
        };
      case 'warning':
        return {
          icon: 'fa-exclamation-circle',
          iconColor: 'text-yellow-600',
          buttonClass: 'bg-yellow-500 hover:bg-yellow-600'
        };
      case 'info':
        return {
          icon: 'fa-info-circle',
          iconColor: 'text-blue-600',
          buttonClass: 'adm-btn-primary'
        };
      default:
        return {
          icon: 'fa-question-circle',
          iconColor: 'text-gray-600',
          buttonClass: 'adm-btn-primary'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div 
        className="adm-confirm-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="adm-confirm-icon-wrapper">
          <i className={`fa-solid ${styles.icon} ${styles.iconColor} text-5xl`}></i>
        </div>
        
        <h3 className="adm-confirm-title">{title}</h3>
        
        {message && (
          <p className="adm-confirm-message">{message}</p>
        )}
        
        <div className="adm-confirm-buttons">
          <button
            onClick={onClose}
            className="adm-btn adm-btn-secondary flex-1"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`adm-btn ${styles.buttonClass} flex-1`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;