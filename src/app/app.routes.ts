import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';
import { CarrinhoComponent } from './componentes/carrinho/carrinho.component';
import { LooksComponent } from './componentes/looks/looks.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { SobreComponent } from './componentes/sobre/sobre.component';
import { ContatoComponent } from './componentes/contato/contato.component';
import { AdminDashboardComponent } from './componentes/admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './componentes/profile/profile.component';
import { CompraComponent } from './componentes/compra/compra.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'register', redirectTo: '/cadastro', pathMatch: 'full' },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'compra', component: CompraComponent, canActivate: [AuthGuard] },
  { path: 'search', component: HomeComponent },
  { path: 'looks', component: LooksComponent, canActivate: [AuthGuard] },
  { path: 'sobre', component: SobreComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'perfil', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] }
];
