import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app.routing.module';
import { HTTPStatus, LoaderMiddleware } from './middleware/loader.middleware';
import { AuthGuard } from './pages/guard/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const RxJS = [LoaderMiddleware, HTTPStatus];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    CommonModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,

    NgxSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthGuard,
    RxJS,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderMiddleware, multi: true },
  ],
  bootstrap: [AppComponent],
  exports:
  [
    CommonModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
