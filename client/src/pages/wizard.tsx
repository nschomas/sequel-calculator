import { useState, useEffect } from "react";
import { useWizard, WizardProvider } from "@/contexts/WizardContext";
import { Card } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { ProgressIndicator } from "@/components/wizard/ProgressIndicator";
import { Step1 } from "@/components/wizard/steps/Step1";
import { Step2 } from "@/components/wizard/steps/Step2";
import { Step3 } from "@/components/wizard/steps/Step3";
import { Step4 } from "@/components/wizard/steps/Step4";
import { Step5 } from "@/components/wizard/steps/Step5";
import { Results } from "@/components/wizard/Results";

function WizardContent() {
  const { currentStep, showResults } = useWizard();

  const renderStep = () => {
    if (showResults) return <Results />;
    
    switch (currentStep) {
      case 1: return <Step1 />;
      case 2: return <Step2 />;
      case 3: return <Step3 />;
      case 4: return <Step4 />;
      case 5: return <Step5 />;
      default: return <Step1 />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-sequel-primary rounded-lg flex items-center justify-center">
                <Eye className="text-white" size={16} />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Sequel</h1>
                <p className="text-xs text-gray-500">Practice Assessment</p>
              </div>
            </div>
            
            <ProgressIndicator />
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-sequel-primary h-1 rounded-full transition-all duration-300" 
              style={{ 
                width: showResults ? '100%' : `${(currentStep / 5) * 100}%` 
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        <div className="animate-fade-in">
          {renderStep()}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-xs">
        <p>© 2024 Sequel. Re-envisioning health and wellness to ease your everyday.</p>
      </footer>
    </div>
  );
}

export default function Wizard() {
  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  );
}
