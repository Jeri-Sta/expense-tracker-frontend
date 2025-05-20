export default interface BankDto {
  id?: string;
  name: string;
  balance: number;
  createdBy?: string;
  lastModifiedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
