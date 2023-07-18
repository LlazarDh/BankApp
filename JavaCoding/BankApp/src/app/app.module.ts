import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LogincomponentComponent } from './logincomponent/logincomponent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { HttpInterceptorService } from './httpinterceptor.service';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountListComponent } from './account-list/account-list.component';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { CardListComponent } from './card-list/card-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    LogincomponentComponent,
    CreateUserComponent,
    UpdateUserComponent,
    CreateAccountComponent,
    AccountListComponent,
    CreateTransactionComponent,
    CreateCardComponent,
    CardListComponent,
    TransactionListComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterOutlet,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
