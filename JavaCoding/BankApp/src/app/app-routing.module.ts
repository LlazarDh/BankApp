import { Router, RouterModule, Routes } from '@angular/router';
import { LogincomponentComponent } from './logincomponent/logincomponent.component';
import { NgModule } from '@angular/core';
import { AuthGuardService } from './authguard.service';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountListComponent } from './account-list/account-list.component';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { CardListComponent } from './card-list/card-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

const routes: Routes = [
  { path: 'authenticate', component: LogincomponentComponent },
  {
    path: 'create-user',
    canActivate: [AuthGuardService],
    component: CreateUserComponent,
  },
  { path: '', redirectTo: 'authenticate', pathMatch: 'full' },
  {
    path: 'account-list',
    canActivate: [AuthGuardService],
    component: AccountListComponent,
  },
  {
    path: 'card-list',
    canActivate: [AuthGuardService],
    component: CardListComponent,
  },
  {
    path: 'transaction-list',
    canActivate: [AuthGuardService],
    component: TransactionListComponent,
  },

  {
    path: 'home',
    canActivate: [AuthGuardService],
    component: UserListComponent,
  },
  { path: 'update-user/:id', component: UpdateUserComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'create-transaction/:id', component: CreateTransactionComponent },
  { path: 'create-card', component: CreateCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
