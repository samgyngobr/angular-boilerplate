import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { ComponentsModule } from './components/components.module';
import { AuthModule } from './content/auth/auth.module';
import { ErrorModule } from './content/error/error.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { fakeBackendProvider } from './interceptors/fake-backend.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    ComponentsModule,
    AuthModule,
    ErrorModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
