export class SistemaFinanceiro {
  Id: number;
  Name: string;
  Month: number;
  Year: number;
  Closingdate: number;
  GenerateExpensesCopy: boolean;
  CopyMonth: number;
  CopyYear: number;
  PropName:string="";
  Message:string="";
  notifications:[] = [];
}
