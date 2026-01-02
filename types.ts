export enum TerminationReason {
  NORMAL_END = 'NORMAL_END',
  EMPLOYEE_RESIGNATION = 'EMPLOYEE_RESIGNATION',
  GROSS_MISCONDUCT = 'GROSS_MISCONDUCT',
  CDI_REFUSAL = 'CDI_REFUSAL',
  UNKNOWN = 'UNKNOWN'
}

export type CalculationMode = 'SIMPLE' | 'TOTAL';

export interface CalculationState {
  mode: CalculationMode;
  monthlySalary: string;
  durationMonths: string;
  totalGrossInput: string;
  rate: '10' | '6';
  reason: TerminationReason;
  isSpecialContract: boolean;
}

export interface CalculationResult {
  totalGrossSalary: number;
  primeAmount: number;
  isDue: boolean;
  message: string;
  calculationDetails: {
    baseLabel: string;
    rateValue: string;
  };
}