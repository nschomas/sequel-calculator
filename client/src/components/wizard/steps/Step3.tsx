import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepNavigation } from "../StepNavigation";
import { useWizard } from "@/contexts/WizardContext";
import sequelLogo from "@/assets/images/sequel-logo.png";

export function Step3() {
  const { formData, updateFormData, goToNextStep } = useWizard();
  const [opticalConversion, setOpticalConversion] = useState(
    formData.opticalConversion === null ? "" : (formData.opticalConversion * 100).toString()
  );

  const handleNext = () => {
    const value = parseFloat(opticalConversion);
    if (value >= 0 && value <= 100) {
      updateFormData({ opticalConversion: value / 100 });
      goToNextStep();
    }
  };

  const isValid = () => {
    const value = parseFloat(opticalConversion);
    return !isNaN(value) && value >= 0 && value <= 100;
  };

  return (
    <div className="animate-slide-up">
      <Card className="rounded-2xl shadow-lg mb-6 bg-sequel-yellow-100">
        <CardContent className="p-6">
          {/* Hero Image */}
          <div className="mb-6 relative">
            <img 
              src={sequelLogo} 
              alt="Sequel Logo" 
              className="w-full h-auto object-contain p-8"
            />
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-romek font-light text-sequel-charcoal mb-2">
              Optical Conversion Rate
            </h2>
            <p className="font-dolph text-sequel-gray-300 text-sm leading-relaxed">
              What percentage of your comprehensive exam patients typically purchase optical services?
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="optical-conversion" className="block text-sm font-dolph font-medium text-sequel-charcoal mb-2">
                Optical Conversion Rate (%)
              </Label>
              <div className="relative">
                <Input
                  id="optical-conversion"
                  type="number"
                  placeholder="e.g., 65"
                  max="100"
                  min="0"
                  step="0.1"
                  value={opticalConversion}
                  onChange={(e) => setOpticalConversion(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sequel-primary focus:border-transparent transition-all"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <span className="text-sm">%</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Enter a percentage between 0-100</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <StepNavigation 
        onNext={handleNext} 
        nextDisabled={!isValid()}
      />
    </div>
  );
}
