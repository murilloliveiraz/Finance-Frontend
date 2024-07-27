export class Transacao
{
  Id: number;
  Name: string;
  Value: number;
  Month: number;
  Year: number;
  TransactionType: number;
  RegistrationDate: Date;
  DateOfTheChange: Date;
  PaymentDate: Date;
  DueDate: Date;
  AlreadyPaid: boolean;
  Overdue: boolean;
  IdCategory: number;
}
