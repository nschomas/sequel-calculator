import { useWizard } from "@/hooks/use-wizard";

export function ProgressIndicator() {
  const { currentStep, showResults } = useWizard();

  return (
    <div className="flex items-center space-x-1">
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((step) => (
          <div
            key={step}
            className={`w-2 h-2 rounded-full transition-colors ${
              step <= currentStep || showResults
                ? 'bg-sequel-primary'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500 ml-2">
        {showResults ? 'Complete' : `${currentStep} of 5`}
      </span>
    </div>
  );
}
