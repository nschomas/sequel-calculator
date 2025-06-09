import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepNavigation } from "../StepNavigation";
import { useWizard } from "@/contexts/WizardContext";
import sequelLogo from "@/assets/images/sequel-logo.png";

export function Step1() {
  const { formData, updateFormData, goToNextStep } = useWizard();
  const [practiceName, setPracticeName] = useState(formData.practiceName || "");

  const handleNext = () => {
    if (practiceName.trim()) {
      updateFormData({ practiceName: practiceName.trim() });
      goToNextStep();
    }
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
              Practice Impact Calculator
            </h2>
            <p className="font-dolph text-sequel-gray-300 text-sm leading-relaxed">
              Discover how adding Sequel to your lens offerings alongside Neurolens can transform your practice revenue and patient outcomes.
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="practice-name" className="block text-sm font-dolph font-medium text-sequel-charcoal mb-2">
                Practice Name
              </Label>
              <Input
                id="practice-name"
                type="text"
                placeholder="Enter your practice name"
                value={practiceName}
                onChange={(e) => setPracticeName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sequel-primary focus:border-transparent transition-all"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <StepNavigation 
        onNext={handleNext} 
        nextDisabled={!practiceName.trim()}
      />
    </div>
  );
}
