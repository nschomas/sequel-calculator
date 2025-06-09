import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepNavigation } from "../StepNavigation";
import { useWizard } from "@/hooks/use-wizard";

export function Step3() {
  const { formData, updateFormData, goToNextStep } = useWizard();
  const [opticalConversion, setOpticalConversion] = useState(
    formData.opticalConversion ? (formData.opticalConversion * 100).toString() : ""
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
      <Card className="rounded-2xl shadow-lg mb-6">
        <CardContent className="p-6">
          {/* Hero Image */}
          <div className="mb-6 relative">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=200" 
              alt="Advanced healthcare diagnostic technology in modern clinic" 
              className="w-full h-32 object-cover rounded-xl opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-sequel-primary/20 to-blue-400/20 rounded-xl"></div>
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Optical Conversion Rate
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              What percentage of your comprehensive exam patients typically purchase optical services?
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="optical-conversion" className="block text-sm font-medium text-gray-700 mb-2">
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
