import React from 'react';
import './Style.css';

function Summary({ formData }) {
  // If formData is not yet available, don't render anything

  const calculateTotal = (data, key) => {
    if (!Array.isArray(data)) return 0;
  
    return data.reduce((sum, item) => {
      const value = parseFloat(item[key]) || 0;
      return sum + value;
    }, 0);
  };
  

  const netIncome = calculateTotal(formData.Income, "Amount");
  const netInvestment = calculateTotal(formData.Investment, "Amount");
  const netExpense = calculateTotal(formData.Expense, "Amount");
  const totalSaving = calculateTotal(formData.Saving, "Amount");

  const handleSave = (e) => {
    e.preventDefault();
    alert("Download functionality coming soon!");
  };

  return (
    <div className="summary">
      <h2 className="summary-heading">Summary Report</h2>
      <div className="summary-item"><strong>Net Income:</strong> ₹{netIncome.toFixed(2)}</div>
      <div className="summary-item"><strong>Net Investment:</strong> ₹{netInvestment.toFixed(2)}</div>
      <div className="summary-item"><strong>Net Expense:</strong> ₹{netExpense.toFixed(2)}</div>
      <div className="summary-item"><strong>Total Saving:</strong> ₹{totalSaving.toFixed(2)}</div>
      
    </div>
  );
}

export default Summary;
