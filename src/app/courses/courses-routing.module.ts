import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { AuthGuard } from '../auth.guard';
import { OwnerGuard } from '../owner.guard';

const routes: Routes = [
  {path:'catalog',component:CatalogComponent},
  {path:'create',component:CreateComponent,canActivate:[AuthGuard]},
  {path:'edit/:id',component:EditComponent,canActivate:[OwnerGuard]},
  {path:'details/:id',component:DetailsComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
