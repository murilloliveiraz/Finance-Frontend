import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  constructor(public formBuilder: FormBuilder, private router: Router, private loginService: LoginService, public authService: AuthService){}
  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required]]
      }
    )
  }

  get dadosForm(){
    return this, this.loginForm.controls;
  }

  loginUser() {
    const observer = {
      next: (token: string) => {
        this.authService.setToken(token);
        this.authService.UsuarioAutenticado(true);
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        alert('Ocorreu um erro');
      }
    };
    this.loginService.login(this.dadosForm["email"].value, this.dadosForm["senha"].value).subscribe(observer);
  }
}
