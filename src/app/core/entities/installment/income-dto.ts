export default interface InstallmentDto {
  id?: string;
  installmentNumber: number;
  value: number;
  installmentDate: string;
  createdBy?: string;
  lastModifiedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
