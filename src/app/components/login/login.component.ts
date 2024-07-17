import { LoginService } from './../../services/login.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  constructor(public formBuilder: FormBuilder, private router: Router, private loginService: LoginService){}
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
        alert(token);
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        alert('Ocorreu um erro');
      }
    };
    this.loginService.login(this.dadosForm["email"].value, this.dadosForm["senha"].value).subscribe(observer);
  }
}
