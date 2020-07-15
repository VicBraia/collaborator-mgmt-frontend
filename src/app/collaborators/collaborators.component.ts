import {Component, OnInit} from '@angular/core';
import {CollaboratorsModel} from "./collaborators.model";
import {CollaboratorsService} from "./collaborators.service";
import {Router} from "@angular/router";
import {SectorsModel} from "../sectors/sectors.model";
import {SectorsService} from "../sectors/sectors.service";

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.scss']
})
export class CollaboratorsComponent implements OnInit {
  collaboratorsList: CollaboratorsModel[];
  sectorsList: SectorsModel[];
  filteredCollaboratorsList: CollaboratorsModel[];

  constructor(private collaboratorService: CollaboratorsService, private sectorsService: SectorsService, private router: Router) {
  }

  ngOnInit(): void {
    this.subscribeVariables();
  }

  subscribeVariables(){
    this.collaboratorsList = this.collaboratorService.getAll();
    this.filteredCollaboratorsList = this.collaboratorsList;
    this.collaboratorService.observableCollaboratorsList.subscribe(collaborators => {
      this.collaboratorsList = collaborators;
    });
    this.sectorsList = this.sectorsService.getAll();
    this.sectorsService.observableSectorsList.subscribe(sectors => {
      this.sectorsList = sectors;
    });
  }

  redirectTo(path) {
    this.router.navigate([path]);
  }

  onDeleteCollaborator(collaboratorId) {
    this.collaboratorService.delete(collaboratorId);
  }

  searchThis(data) {
    this.filteredCollaboratorsList = this.collaboratorsList;
    if (data) {
      let sectorsList = this.sectorsList;
      this.filteredCollaboratorsList = this.filteredCollaboratorsList.filter(function (ele, i, array) {
        let collaboratorName = ele.name.toLowerCase();
        let collaboratorCpf = ele.cpf.toLowerCase();
        let collaboratorEmail = ele.email.toLowerCase();
        let collaboratorSector =  sectorsList[sectorsList.findIndex(element => element.id == ele.sectorId)].name.toLocaleLowerCase();
        return collaboratorName.includes(data.target.value, 0) || collaboratorCpf.includes(data.target.value, 0)
          || collaboratorEmail.includes(data.target.value, 0) || collaboratorSector.includes(data.target.value, 0);
      })
    }
  }
}
