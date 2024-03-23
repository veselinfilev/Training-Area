import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {path:'catalog',component:CatalogComponent},
  {path:'create',component:CreateComponent,canActivate:[AuthGuard]},
  {path:'edit/:id',component:EditComponent},
  {path:'details/:id',component:DetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
