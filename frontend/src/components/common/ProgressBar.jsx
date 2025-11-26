// /src/components/common/ProgressBar.jsx

const ProgressBar = ({ progress = 0, fileName = '', status = 'uploading' }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'uploading':
        return 'bg-blue-500';
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'uploading':
        return 'fa-spinner fa-spin';
      case 'success':
        return 'fa-check';
      case 'error':
        return 'fa-xmark';
      default:
        return 'fa-circle';
    }
  };

  return (
    <div className="adm-progress-container">
      <div className="adm-progress-header">
        <div className="flex items-center gap-2">
          <i className={`fa-solid ${getStatusIcon()} text-sm`}></i>
          <span className="text-sm font-medium text-gray-700 truncate">
            {fileName}
          </span>
        </div>
        <span className="text-xs text-gray-500">{Math.round(progress)}%</span>
      </div>
      
      <div className="adm-progress-bar">
        <div 
          className={`adm-progress-fill ${getStatusColor()}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;