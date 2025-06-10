import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useWizard } from "@/contexts/WizardContext";
import sequelLogo from "@/assets/images/sequel-logo.png";
import neurolensLogo from "@/assets/images/Neurolens Secondary Logo No Tagline Blue PNG.png";

export function Results() {
  const { formData, results, clearAndRestartWizard } = useWizard();

  if (!results) return null;

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0 
    }).format(value);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="rounded-2xl shadow-lg bg-sequel-yellow-100">
        <CardContent className="p-4 md:p-6">
          <div className="mb-2 relative">
            <img 
              src={sequelLogo} 
              alt="Sequel Logo" 
              className="w-full h-auto object-contain p-6"
            />
          </div>
          <div className="text-center px-4">
            <h2 className="text-2xl font-romek font-light text-sequel-charcoal mb-2">
              Your Practice Projections
            </h2>
            <p className="font-dolph text-sequel-gray-300 text-sm leading-relaxed">
              By adding Sequel to your lens offerings alongside Neurolens,{" "}
              <span className="font-medium text-sequel-charcoal">{formData.practiceName}</span> can expect the following:
            </p>
          </div>

          {/* Tables Container */}
          <div className="mt-6 space-y-6">
            {/* Table 1: Projected Patient Numbers */}
            <div className="bg-white/70 rounded-xl shadow-md overflow-hidden">
              <div className="table-header text-sequel-charcoal p-3">
                <h3 className="text-base font-dolph font-semibold">Projected Patient Numbers</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-4 py-1.5 text-left text-xs font-dolph font-medium text-gray-500 uppercase tracking-wider align-bottom">Product</th>
                      <th className="px-4 py-1.5 text-center text-xs font-dolph font-medium text-gray-500 uppercase tracking-wider align-bottom">Cash Pay</th>
                      <th className="px-4 py-1.5 text-center text-xs font-dolph font-medium text-gray-500 uppercase tracking-wider align-bottom">MVC</th>
                      <th className="px-4 py-1.5 text-center text-xs font-dolph font-medium text-gray-500 uppercase tracking-wider align-bottom">Monthly Orders</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 font-dolph">
                    <tr className="hover:bg-gray-50/50">
                      <td className="px-4 py-2 text-left align-middle">
                        <img src={sequelLogo} alt="Sequel Logo" className="h-4" />
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900 text-center align-middle">{results.sequel.cashPayPatients}</td>
                      <td className="px-4 py-2 text-sm text-gray-900 text-center align-middle">{results.sequel.mvcPatients}</td>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900 text-center align-middle">{results.sequel.monthlyOrders}</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="px-4 py-2 text-left align-middle">
                        <img src={neurolensLogo} alt="Neurolens Logo" className="h-5" />
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900 text-center align-middle">{results.neurolens.cashPayPatients}</td>
                      <td className="px-4 py-2 text-sm text-gray-900 text-center align-middle">{results.neurolens.mvcPatients}</td>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900 text-center align-middle">{results.neurolens.monthlyOrders}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Table 2: Monthly Revenue and Profit */}
            <div className="bg-white/70 rounded-xl shadow-md overflow-hidden">
              <div className="table-header text-sequel-charcoal p-3">
                <h3 className="text-base font-dolph font-semibold">Monthly Financial Impact</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-4 py-1.5 text-left text-xs font-dolph font-medium text-gray-500 uppercase tracking-wider align-bottom">Product</th>
                      <th className="px-4 py-1.5 text-center text-xs font-dolph font-medium text-gray-500 uppercase tracking-wider align-bottom">Revenue</th>
                      <th className="px-4 py-1.5 text-center text-xs font-dolph font-medium text-gray-500 uppercase tracking-wider align-bottom">Profit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 font-dolph">
                    <tr className="hover:bg-gray-50/50">
                      <td className="px-4 py-2 text-left align-middle">
                        <img src={sequelLogo} alt="Sequel Logo" className="h-4" />
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900 text-center align-middle">{formatCurrency(results.sequel.monthlyRevenue)}</td>
                      <td className="px-4 py-2 text-sm text-gray-900 text-center align-middle">{formatCurrency(results.sequel.monthlyProfit)}</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="px-4 py-2 text-left align-middle">
                        <img src={neurolensLogo} alt="Neurolens Logo" className="h-5" />
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900 text-center align-middle">{formatCurrency(results.neurolens.monthlyRevenue)}</td>
                      <td className="px-4 py-2 text-sm text-gray-900 text-center align-middle">{formatCurrency(results.neurolens.monthlyProfit)}</td>
                    </tr>
                    <tr className="bg-sequel-light font-semibold">
                      <td className="px-4 py-2 text-sm font-bold text-gray-900 text-left align-middle">Total</td>
                      <td className="px-4 py-2 text-sm font-bold text-gray-900 text-center align-middle">{formatCurrency(results.total.monthlyRevenue)}</td>
                      <td className="px-4 py-2 text-sm font-bold text-gray-900 text-center align-middle">{formatCurrency(results.total.monthlyProfit)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Table 3: Annualized Revenue and Profit */}
            <div className="bg-white/70 rounded-xl shadow-md overflow-hidden">
              <div className="table-header text-sequel-charcoal p-3">
                <h3 className="text-base font-dolph font-semibold">Annualized Financial Impact</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-4 py-1.5 text-left text-xs font-dolph font-medium text-gray-500 uppercase tracking-wider align-bottom">Product</th>
                      <th className="px-4 py-1.5 text-center text-xs font-dolph font-medium text-gray-500 uppercase tracking-wider align-bottom">Revenue</th>
                      <th className="px-4 py-1.5 text-center text-xs font-dolph font-medium text-gray-500 uppercase tracking-wider align-bottom">Profit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 font-dolph">
                    <tr className="hover:bg-gray-50/50">
                      <td className="px-4 py-2 text-left align-middle">
                        <img src={sequelLogo} alt="Sequel Logo" className="h-4" />
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900 text-center align-middle">{formatCurrency(results.sequel.annualRevenue)}</td>
                      <td className="px-4 py-2 text-sm text-gray-900 text-center align-middle">{formatCurrency(results.sequel.annualProfit)}</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="px-4 py-2 text-left align-middle">
                        <img src={neurolensLogo} alt="Neurolens Logo" className="h-5" />
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900 text-center align-middle">{formatCurrency(results.neurolens.annualRevenue)}</td>
                      <td className="px-4 py-2 text-sm text-gray-900 text-center align-middle">{formatCurrency(results.neurolens.annualProfit)}</td>
                    </tr>
                    <tr className="bg-sequel-light font-semibold">
                      <td className="px-4 py-2 text-sm font-bold text-gray-900 text-left align-middle">Total</td>
                      <td className="px-4 py-2 text-sm font-bold text-gray-900 text-center align-middle">{formatCurrency(results.total.annualRevenue)}</td>
                      <td className="px-4 py-2 text-sm font-bold text-gray-900 text-center align-middle">{formatCurrency(results.total.annualProfit)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8 text-center">
        <Button 
          variant="outline" 
          onClick={clearAndRestartWizard}
          className="border-2 border-sequel-primary text-sequel-primary hover:bg-sequel-primary hover:text-white font-medium px-8 py-3 rounded-full shadow-md transition-all transform hover:scale-105"
        >
          <RotateCcw size={16} className="mr-2" />
          Start Over
        </Button>
      </div>
    </div>
  );
}
