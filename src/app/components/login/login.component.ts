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
  constructor(public formBuilder: FormBuilder, private router: Router){}
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
    alert("OK");
  }
}
