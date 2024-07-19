import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthGuardService } from './pages/guard/auth-guard.service';
import { HTTPStatus, LoaderMiddleware } from './middleware/loader.middleware';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
const RxJS = [LoaderMiddleware, HTTPStatus];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, NgxSpinnerModule],
  providers: [AuthGuardService, RxJS, {provide: HTTP_INTERCEPTORS, useClass: LoaderMiddleware, multi: true}],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Finance-FrontEnd';
}
