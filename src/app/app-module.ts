import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './navbar/navbar';
import { Customers } from './customers/customers';
import { Accounts } from './accounts/accounts';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NewCustomer } from './new-customer/new-customer';
import { Login } from './login/login';
import { AdminTemplate } from './admin-template/admin-template';
import { appHttpInterceptor } from './interceptors/app-http-interceptor';

@NgModule({
  declarations: [App, Navbar, Customers, Accounts, NewCustomer, Login, AdminTemplate],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideHttpClient(withInterceptors([appHttpInterceptor])),
  ],
  bootstrap: [App],
})
export class AppModule {}
