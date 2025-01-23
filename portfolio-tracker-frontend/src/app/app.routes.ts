import { Routes } from '@angular/router';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { HomeComponent } from './Pages/home/home.component';
import { PortfolioDetailsComponent } from './Pages/portfolio-details/portfolio-details.component';
import { StockManagementComponent } from './Pages/stock-management/stock-management.component';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { ForgetPasswordComponent } from './Pages/forget-password/forget-password.component';
import { StocksComponent } from './Pages/stocks/stocks.component';
import { StockInfoComponent } from './Pages/stock-info/stock-info.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgetpassword', component: ForgetPasswordComponent },
    ],
  },
  {
    path: '',
    component: NavbarComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'stock-management', component: StockManagementComponent },
      { path: 'portfolio-details', component: PortfolioDetailsComponent },
      { path: 'stocks', component: StocksComponent },
      { path: 'stock-info', component: StockInfoComponent },
    ],
  },
];
