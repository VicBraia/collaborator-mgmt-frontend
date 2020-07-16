import {Component, OnInit} from '@angular/core';
import {CollaboratorsModel} from "./collaborators.model";
import {CollaboratorsService} from "./collaborators.service";
import {Router} from "@angular/router";
import {SectorsModel} from "../sectors/sectors.model";
import {SectorsService} from "../sectors/sectors.service";

/**
 * Component for the layout of the  page where the list of collaborators can be seen
 */
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

  /**
   * Initiates Collaborators and Sectors Lists
   */
  ngOnInit(): void {
    this.collaboratorsList = this.collaboratorService.getAll();
    this.sectorsList = this.sectorsService.getAll();
    this.filteredCollaboratorsList = this.collaboratorsList;
    this.subscribeVariables();
  }

  /**
   * Method that creates subscription to observable variables from SectorsService and CollaboratorsService to always keep the data shown in the view up-to-date
   */
  subscribeVariables(){
    this.collaboratorService.observableCollaboratorsList.subscribe(collaborators => {
      this.collaboratorsList = collaborators;
    });
    this.sectorsService.observableSectorsList.subscribe(sectors => {
      this.sectorsList = sectors;
    });
  }

  /**
   * Method that redirects user to a provided path
   * @param path
   */
  redirectTo(path) {
    this.router.navigate([path]);
  }

  /**
   * Method triggered by clicking on the delete button of a collaborator. It calls the CollaboratorsService to perfom the deletion.
   * @param collaboratorId Id of the collaborator to be deleted
   */
  onDeleteCollaborator(collaboratorId) {
    this.collaboratorService.delete(collaboratorId);
  }

  /**
   * Method that filters all collaborators by name, cpf, email or sector
   * @param data Characters typed to the sesrch bar
   */
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
