export default interface IncomeDto {
  id?: string;
  name: string;
  value: number;
  incomeDate: string;
  createdBy?: string;
  lastModifiedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
