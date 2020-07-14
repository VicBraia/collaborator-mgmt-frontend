import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CollaboratorsComponent} from "./collaborators/collaborators.component";
import {HomeComponent} from "./home/home.component";
import {SectorsComponent} from "./sectors/sectors.component";
import {AddCollaboratorComponent} from "./collaborators/add-collaborator/add-collaborator.component";
import {EditCollaboratorComponent} from "./collaborators/edit-collaborator/edit-collaborator.component";
import {AddSectorComponent} from "./sectors/add-sector/add-sector.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'collaborators',
    component: CollaboratorsComponent,
  },
  {
    path: 'collaborator/add',
    component: AddCollaboratorComponent,
  },
  {
    path: 'collaborator/edit/:id',
    component: EditCollaboratorComponent,
  },
  {
    path: 'sectors',
    component: SectorsComponent,
  },
  {
    path: 'sectors/add',
    component: AddSectorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
