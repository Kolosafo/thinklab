import { useMemo } from "react";

type MortgageInput = {
  propertyCost: number;
  buyerEquityPercent: string; // 0 to 1
  financingRate?: number; // e.g. 0.15 for 15%
  tenorMonths: number;
};

type MortgageOutput = {
  buyerEquity: number;
  loanAmount: number;
  //   financingCost: number;
  monthlyPayment: number;
};

function toPercentage(input: string, isCompay?: boolean): number {
  const num = !isCompay ? parseFloat(input) : 100 - parseFloat(input);
  const result = isNaN(num) ? 0 : num / 100;
  return result;
}
export function useMortgageCalculator({
  propertyCost,
  buyerEquityPercent,
  //   financingRate,
  tenorMonths,
}: MortgageInput): MortgageOutput {
  return useMemo(() => {
    const buyerEquity = propertyCost * toPercentage(buyerEquityPercent);
    const companyEquity = toPercentage(buyerEquityPercent, true);
    const loanAmount = propertyCost - buyerEquity;
    // const financingRate = propertyCost * 0.15;
    const financingCostOne = companyEquity * 0.15;
    const financingCostMonthly = financingCostOne / 12;
    const totalFinancingCost = propertyCost * financingCostMonthly;
    const monthlyPayment = totalFinancingCost * tenorMonths;
    console.log("FINAL FINANCING PAYMENT: ", monthlyPayment);

    return {
      buyerEquity,
      loanAmount,
      financingCostMonthly,
      monthlyPayment,
    };
  }, [propertyCost, buyerEquityPercent, tenorMonths]);
}
