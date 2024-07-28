export class SistemaFinanceiro {
  Id: number;
  Name: string;
  Month: number;
  Year: number;
  Closingdate: number;
  GenerateExpensesCopy: boolean;
  CopyMonth: number;
  CopyYear: number;
  NomePropriedade:string="";
  mensagem:string="";
  notificacoes:[];
}
