
export enum UsageFrequency {
  DAILY = 'Daily',
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
  RARELY = 'Rarely',
  NEVER = 'Never'
}

export interface Subscription {
  id: string;
  name: string;
  price: number;
  category: string;
  frequency: UsageFrequency;
  isWaste: boolean;
}

export interface AppStats {
  totalMonthly: number;
  estimatedWaste: number;
  potentialAnnualSavings: number;
}
