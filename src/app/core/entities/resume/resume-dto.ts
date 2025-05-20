export default interface ResumeDto {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  createdBy?: string;
  lastModifiedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
