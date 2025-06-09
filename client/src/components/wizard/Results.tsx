import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Phone, RotateCcw } from "lucide-react";
import { useWizard } from "@/hooks/use-wizard";

export function Results() {
  const { formData, results, restartWizard } = useWizard();

  if (!results) return null;

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0 
    }).format(value);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Results Header */}
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-sequel-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your Practice Projections
            </h2>
            <p className="text-gray-600 text-sm">
              By adding Sequel to your lens offerings alongside Neurolens,{" "}
              <span className="font-medium">{formData.practiceName}</span> can expect the following:
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Table 1: Projected Patient Numbers */}
      <Card className="rounded-2xl shadow-lg overflow-hidden">
        <div className="table-header text-white p-4">
          <h3 className="text-lg font-semibold">Projected Patient Numbers</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cash Pay Patients</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">MVC Patients</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Orders</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm font-medium text-gray-900">Sequel</td>
                <td className="px-4 py-4 text-sm text-gray-900 text-right">{results.sequel.cashPayPatients}</td>
                <td className="px-4 py-4 text-sm text-gray-900 text-right">{results.sequel.mvcPatients}</td>
                <td className="px-4 py-4 text-sm font-medium text-gray-900 text-right">{results.sequel.monthlyOrders}</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm font-medium text-gray-900">Neurolens</td>
                <td className="px-4 py-4 text-sm text-gray-900 text-right">{results.neurolens.cashPayPatients}</td>
                <td className="px-4 py-4 text-sm text-gray-900 text-right">{results.neurolens.mvcPatients}</td>
                <td className="px-4 py-4 text-sm font-medium text-gray-900 text-right">{results.neurolens.monthlyOrders}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Table 2: Monthly Revenue and Profit */}
      <Card className="rounded-2xl shadow-lg overflow-hidden">
        <div className="table-header text-white p-4">
          <h3 className="text-lg font-semibold">Monthly Revenue and Profit</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Revenue</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm font-medium text-gray-900">Sequel</td>
                <td className="px-4 py-4 text-sm text-gray-900 text-right">{formatCurrency(results.sequel.monthlyRevenue)}</td>
                <td className="px-4 py-4 text-sm text-gray-900 text-right">{formatCurrency(results.sequel.monthlyProfit)}</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm font-medium text-gray-900">Neurolens</td>
                <td className="px-4 py-4 text-sm text-gray-900 text-right">{formatCurrency(results.neurolens.monthlyRevenue)}</td>
                <td className="px-4 py-4 text-sm text-gray-900 text-right">{formatCurrency(results.neurolens.monthlyProfit)}</td>
              </tr>
              <tr className="bg-sequel-light font-semibold">
                <td className="px-4 py-4 text-sm font-bold text-gray-900">Total</td>
                <td className="px-4 py-4 text-sm font-bold text-gray-900 text-right">{formatCurrency(results.total.monthlyRevenue)}</td>
                <td className="px-4 py-4 text-sm font-bold text-gray-900 text-right">{formatCurrency(results.total.monthlyProfit)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Table 3: Annualized Revenue and Profit */}
      <Card className="rounded-2xl shadow-lg overflow-hidden">
        <div className="table-header text-white p-4">
          <h3 className="text-lg font-semibold">Annualized Revenue and Profit</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Revenue</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm font-medium text-gray-900">Sequel</td>
                <td className="px-4 py-4 text-sm text-gray-900 text-right">{formatCurrency(results.sequel.annualRevenue)}</td>
                <td className="px-4 py-4 text-sm text-gray-900 text-right">{formatCurrency(results.sequel.annualProfit)}</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm font-medium text-gray-900">Neurolens</td>
                <td className="px-4 py-4 text-sm text-gray-900 text-right">{formatCurrency(results.neurolens.annualRevenue)}</td>
                <td className="px-4 py-4 text-sm text-gray-900 text-right">{formatCurrency(results.neurolens.annualProfit)}</td>
              </tr>
              <tr className="bg-sequel-light font-semibold">
                <td className="px-4 py-4 text-sm font-bold text-gray-900">Total</td>
                <td className="px-4 py-4 text-sm font-bold text-gray-900 text-right">{formatCurrency(results.total.annualRevenue)}</td>
                <td className="px-4 py-4 text-sm font-bold text-gray-900 text-right">{formatCurrency(results.total.annualProfit)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Call to Action */}
      <Card className="rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-sequel-primary to-blue-400 p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Ready to Transform Your Practice?</h3>
          <p className="text-blue-100 mb-4 text-sm">
            Contact our team to learn more about implementing Sequel in your practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-white text-sequel-primary hover:bg-gray-100 font-medium">
              <Phone size={16} className="mr-2" />
              Schedule Consultation
            </Button>
            <Button 
              variant="outline" 
              onClick={restartWizard}
              className="border-2 border-white text-white hover:bg-white hover:text-sequel-primary font-medium"
            >
              <RotateCcw size={16} className="mr-2" />
              Start Over
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
