// /src/components/admin/StepIndicator.jsx

const StepIndicator = ({ 
  currentStep, 
  steps, 
  onStepClick,
  canNavigate = false,  // true = permite navegar clickeando
  disabledSteps = []    // array de steps deshabilitados (ej: [1])
}) => {
  
  const handleClick = (stepNumber) => {
    if (!canNavigate || !onStepClick) return;
    if (stepNumber === currentStep) return;
    if (disabledSteps.includes(stepNumber)) return;
    onStepClick(stepNumber);
  };

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isLast = index === steps.length - 1;
          const isClickable = canNavigate && onStepClick && stepNumber !== currentStep && !disabledSteps.includes(stepNumber);

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle + Label */}
              <div className="flex flex-col items-center">
                {/* Circle */}
                <button
                  type="button"
                  onClick={() => handleClick(stepNumber)}
                  disabled={!isClickable}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    font-semibold text-sm transition-all duration-300
                    ${isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isActive 
                        ? 'bg-gray-900 text-white ring-4 ring-gray-200' 
                        : 'bg-gray-200 text-gray-500'
                    }
                    ${isClickable 
                      ? 'cursor-pointer hover:ring-4 hover:ring-gray-300 hover:scale-110' 
                      : 'cursor-default'
                    }
                  `}
                >
                  {isCompleted ? (
                    <i className="fa-solid fa-check"></i>
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </button>
                
                {/* Label */}
                <div className="mt-2 text-center">
                  <p 
                    className={`
                      text-sm font-medium
                      ${isActive ? 'text-gray-900' : 'text-gray-500'}
                      ${isClickable ? 'cursor-pointer hover:text-gray-900' : ''}
                    `}
                    onClick={() => handleClick(stepNumber)}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-xs text-gray-400 hidden sm:block">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div className="flex-1 mx-4 hidden sm:block">
                  <div 
                    className={`
                      h-1 rounded-full transition-all duration-300
                      ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;