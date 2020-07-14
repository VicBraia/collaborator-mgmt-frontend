import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { SectorsComponent } from './sectors/sectors.component';
import { NavigationOptionComponent } from './navigation-option/navigation-option.component';
import { AddCollaboratorComponent } from './collaborators/add-collaborator/add-collaborator.component';
import {ReactiveFormsModule} from "@angular/forms";
import { EditCollaboratorComponent } from './collaborators/edit-collaborator/edit-collaborator.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomSectorsListComponent } from './sectors/custom-sectors-list/custom-sectors-list.component';
import {AddSectorComponent} from "./sectors/add-sector/add-sector.component";
import { CustomCollaboratorsListComponent } from './collaborators/custom-collaborators-list/custom-collaborators-list.component';
import ptBr from '@angular/common/locales/pt';
import {registerLocaleData} from "@angular/common";

registerLocaleData(ptBr)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CollaboratorsComponent,
    SectorsComponent,
    NavigationOptionComponent,
    AddCollaboratorComponent,
    EditCollaboratorComponent,
    CustomSectorsListComponent,
    AddSectorComponent,
    CustomCollaboratorsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
