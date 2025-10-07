import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { CadastroComponent } from './componentes/cadastro/cadastro.component';
import { CarrinhoComponent } from './componentes/carrinho/carrinho.component';
import { LooksComponent } from './componentes/looks/looks.component';
import { AuthGuard } from './guards/auth.guard';
import { SobreComponent } from './componentes/sobre/sobre.component';
import { ContatoComponent } from './componentes/contato/contato.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'register', redirectTo: '/cadastro', pathMatch: 'full' }, // Redirect para compatibilidade
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'search', component: HomeComponent }, // Temporary: redirect search to home, can be updated to a dedicated search component later
  { path: 'looks', component: LooksComponent, canActivate: [AuthGuard] },
  { path: 'sobre', component: SobreComponent },
  { path: 'contato', component: ContatoComponent }
];
