import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp } from "lucide-react";
import { StepNavigation } from "../StepNavigation";
import { useWizard } from "@/hooks/use-wizard";

export function Step2() {
  const { formData, updateFormData, goToNextStep } = useWizard();
  const [comprehensiveExams, setComprehensiveExams] = useState(
    formData.comprehensiveExams?.toString() || ""
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
      <Card className="rounded-2xl shadow-lg mb-6">
        <CardContent className="p-6">
          {/* Hero Image */}
          <div className="mb-6 relative">
            <img 
              src="https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=200" 
              alt="Professional optical examination room with modern equipment" 
              className="w-full h-32 object-cover rounded-xl opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-sequel-primary/20 to-blue-400/20 rounded-xl"></div>
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Monthly Patient Volume
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Help us understand your practice's monthly comprehensive exam volume to calculate accurate projections.
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="comprehensive-exams" className="block text-sm font-medium text-gray-700 mb-2">
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
                <div className="absolute right-3 top-3 text-gray-400">
                  <TrendingUp size={16} />
                </div>
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
