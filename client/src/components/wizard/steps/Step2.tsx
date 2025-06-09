import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepNavigation } from "../StepNavigation";
import { useWizard } from "@/contexts/WizardContext";
import sequelLogo from "@/assets/images/sequel-logo.png";

export function Step2() {
  const { formData, updateFormData, goToNextStep } = useWizard();
  const [comprehensiveExams, setComprehensiveExams] = useState(
    formData.comprehensiveExams === null ? "" : formData.comprehensiveExams.toString()
  );

  const handleNext = () => {
    const value = parseInt(comprehensiveExams);
    if (value > 0 && value <= 9999) {
      updateFormData({ comprehensiveExams: value });
      goToNextStep();
    }
  };

  const isValid = () => {
    const value = parseInt(comprehensiveExams);
    return value > 0 && value <= 9999;
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
              Monthly Patient Volume
            </h2>
            <p className="font-dolph text-sequel-gray-300 text-sm leading-relaxed">
              Help us understand your practice's monthly comprehensive exam volume to calculate accurate projections.
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="comprehensive-exams" className="block text-sm font-dolph font-medium text-sequel-charcoal mb-2">
                Monthly Comprehensive Exams
              </Label>
              <div className="relative">
                <Input
                  id="comprehensive-exams"
                  type="number"
                  placeholder="e.g., 250"
                  max="9999"
                  min="1"
                  value={comprehensiveExams}
                  onChange={(e) => setComprehensiveExams(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sequel-primary focus:border-transparent transition-all"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Maximum 4 digits (up to 9,999)</p>
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
