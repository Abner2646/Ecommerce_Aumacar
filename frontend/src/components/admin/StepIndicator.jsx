// /src/components/admin/StepIndicator.jsx 

const StepIndicator = ({ currentStep, steps }) => {
  return (
    <div className="adm-step-indicator">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={step.id} className="adm-step-indicator-item">
            {/* Línea conectora (antes del step) */}
            {index > 0 && (
              <div className={`adm-step-line ${isCompleted ? 'adm-step-line-completed' : ''}`} />
            )}

            {/* Círculo del step */}
            <div className="adm-step-circle-wrapper">
              <div
                className={`adm-step-circle ${
                  isCompleted
                    ? 'adm-step-circle-completed'
                    : isActive
                    ? 'adm-step-circle-active'
                    : ''
                }`}
              >
                {isCompleted ? (
                  <i className="fa-solid fa-check"></i>
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>
              
              {/* Label */}
              <div className="adm-step-label">
                <p className={`adm-step-label-text ${isActive ? 'adm-step-label-active' : ''}`}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="adm-step-label-description">{step.description}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;