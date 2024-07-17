import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  private readonly baseURL = environment["endPoint"];

  login(Email: string, Password: string) {
    return this.httpClient.post<any>(`${this.baseURL}/CreateToken`, {Email: Email, Password: Password})
  }
}
