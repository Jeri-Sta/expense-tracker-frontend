import CardDto from '../card/card-dto';
import CategoryDto from '../category/category-dto';
import InstallmentDto from '../installment/income-dto';

export default interface ExpenseDto {
  id?: string;
  name: string;
  category?: CategoryDto;
  card?: CardDto;
  value: number;
  expenseDate: string;
  installments: number;
  installmentsRegisters: InstallmentDto[];
  createdBy?: string;
  lastModifiedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
