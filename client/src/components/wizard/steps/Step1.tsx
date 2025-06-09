import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepNavigation } from "../StepNavigation";
import { useWizard } from "@/hooks/use-wizard";

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
      <Card className="rounded-2xl shadow-lg mb-6">
        <CardContent className="p-6">
          {/* Hero Image */}
          <div className="mb-6 relative">
            <img 
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=200" 
              alt="Modern medical practice equipment" 
              className="w-full h-32 object-cover rounded-xl opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-sequel-primary/20 to-blue-400/20 rounded-xl"></div>
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to Your Practice Assessment
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Discover how adding Sequel to your lens offerings alongside Neurolens can transform your practice revenue and patient outcomes.
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="practice-name" className="block text-sm font-medium text-gray-700 mb-2">
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
