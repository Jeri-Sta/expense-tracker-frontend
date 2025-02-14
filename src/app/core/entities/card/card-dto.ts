import BankDto from '../bank/bank-dto';

export default interface CardDto {
  id?: string;
  limit: number;
  closingDate: string;
  bank: BankDto;
}
