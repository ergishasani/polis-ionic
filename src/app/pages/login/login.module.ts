import { Routes } from '@angular/router';
import { LoginPage } from './login.page';
import { RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

export default {
  imports: [RouterModule.forChild(routes)]
};
