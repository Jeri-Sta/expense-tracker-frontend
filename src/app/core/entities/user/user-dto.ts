export default interface UserDto {
  name?: string;
  email: string;
  password: string;
  ownerEmail?: string;
  paymentDay?: number;
  inviteCode?: string;
}
