import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { calculateResults, type FormData, type Results } from "@/lib/calculations";
import { getDeviceInfo, getIPAddress } from "@/lib/device-detection";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "sequel-wizard-data";
const STEP_KEY = "sequel-wizard-step";

export function useWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    practiceName: "",
    comprehensiveExams: 0,
    opticalConversion: 0,
    cashPayPercentage: 0,
    mvcConversion: 0,
  });
  const [results, setResults] = useState<Results | null>(null);
  const [sessionId] = useState(() => crypto.randomUUID());
  const { toast } = useToast();

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const savedStep = localStorage.getItem(STEP_KEY);
    
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error("Failed to parse saved data:", error);
      }
    }
    
    if (savedStep) {
      const step = parseInt(savedStep);
      if (step >= 1 && step <= 5) {
        setCurrentStep(step);
      }
    }
  }, []);

  // Save data when formData changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  // Save step when currentStep changes
  useEffect(() => {
    localStorage.setItem(STEP_KEY, currentStep.toString());
  }, [currentStep]);

  const submitDataMutation = useMutation({
    mutationFn: async (data: any) => {
      const deviceInfo = await getDeviceInfo();
      const ipAddress = await getIPAddress();
      
      const payload = {
        ...data,
        ...deviceInfo,
        ip_address: ipAddress,
      };
      
      return apiRequest("POST", "/api/responses", payload);
    },
    onError: (error) => {
      console.error("Failed to submit data to backend:", error);
      // Don't show error to user - continue flow
    }
  });

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const goToNextStep = () => {
    if (currentStep < 5) {
      // Submit current data to backend
      submitDataMutation.mutate({
        practice_name: formData.practiceName,
        comprehensive_exams: formData.comprehensiveExams,
        optical_conversion_rate: formData.opticalConversion,
        cash_pay_percentage: formData.cashPayPercentage,
        mvc_conversion_percentage: formData.mvcConversion,
      });
      
      setCurrentStep(prev => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const calculateAndShowResults = () => {
    // Submit final data to backend
    submitDataMutation.mutate({
      practice_name: formData.practiceName,
      comprehensive_exams: formData.comprehensiveExams,
      optical_conversion_rate: formData.opticalConversion,
      cash_pay_percentage: formData.cashPayPercentage,
      mvc_conversion_percentage: formData.mvcConversion,
    });

    // Calculate results
    const calculatedResults = calculateResults(formData);
    setResults(calculatedResults);
    setShowResults(true);
  };

  const restartWizard = () => {
    setFormData({
      practiceName: "",
      comprehensiveExams: 0,
      opticalConversion: 0,
      cashPayPercentage: 0,
      mvcConversion: 0,
    });
    setResults(null);
    setShowResults(false);
    setCurrentStep(1);
    
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STEP_KEY);
    
    toast({
      title: "Wizard Reset",
      description: "Starting fresh with a new assessment.",
    });
  };

  return {
    currentStep,
    showResults,
    formData,
    results,
    sessionId,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    calculateAndShowResults,
    restartWizard,
    isSubmitting: submitDataMutation.isPending,
  };
}
