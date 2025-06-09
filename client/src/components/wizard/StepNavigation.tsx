import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, BarChart } from "lucide-react";
import { useWizard } from "@/contexts/WizardContext";

interface StepNavigationProps {
  onNext: () => void;
  nextDisabled?: boolean;
  isLastStep?: boolean;
}

export function StepNavigation({ onNext, nextDisabled = false, isLastStep = false }: StepNavigationProps) {
  const { currentStep, goToPreviousStep } = useWizard();

  return (
    <div className="flex justify-between items-center mt-6">
      <Button
        variant="ghost"
        onClick={goToPreviousStep}
        disabled={currentStep === 1}
        className="text-gray-500 hover:text-sequel-primary hover:bg-sequel-light px-6 py-3"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back
      </Button>
      
      <Button
        onClick={onNext}
        disabled={nextDisabled}
        className="bg-sequel-yellow-100 hover:bg-sequel-yellow-200 text-sequel-charcoal px-8 py-3 rounded-full shadow-md transition-all transform hover:scale-105 disabled:bg-sequel-gray-100 disabled:text-sequel-gray-200 disabled:cursor-not-allowed"
      >
        {isLastStep ? (
          <>
            View Results
            <BarChart size={16} className="ml-2" />
          </>
        ) : (
          <>
            Next
            <ArrowRight size={16} className="ml-2" />
          </>
        )}
      </Button>
    </div>
  );
}
