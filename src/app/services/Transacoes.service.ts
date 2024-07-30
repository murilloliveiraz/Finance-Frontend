import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { Transacao } from '../models/Transacao';

@Injectable({
  providedIn: 'root'
})
export class TransacoesService {

  constructor(private httpClient: HttpClient) { }

  private readonly baseURL = environment["endPoint"];

  AdicionarDespesa(transacao: Transacao){
    return this.httpClient.post<Transacao>(`${this.baseURL}/AdicionarDespesa`, transacao);
  }

  ListarDespesasUsuario(emailUsuario: string){
    return this.httpClient.get(`${this.baseURL}/ListarDespesasUsuario?emailUsuario=${emailUsuario}`);
  }
}
