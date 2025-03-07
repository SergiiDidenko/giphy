import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'gifs', pathMatch: 'full' },
  {
    path: 'gifs',
    loadChildren: () =>
      import('./pages/gifs/gifs.module').then((m) => m.GifsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
