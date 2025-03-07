import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsComponent } from './gifs.component';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: GifsComponent },
  { path: ':id', component: DetailsComponent },
];
@NgModule({
  declarations: [GifsComponent, DetailsComponent],
  imports: [CommonModule, RouterModule.forChild(routes),ReactiveFormsModule ],
})
export class GifsModule {}
