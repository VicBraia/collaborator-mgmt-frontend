import { Injectable } from '@angular/core';
import {CollaboratorsModel} from "./collaborators.model";
import {Subject} from "rxjs";

/**
 * Service that makes CRUD requests to the Collaborators API
 */
@Injectable({
  providedIn: 'root'
})
export class CollaboratorsService {
  index: number;

  /**
   * @ignore
   */
  collaboratorsList: CollaboratorsModel[] =[
    {
      id: 1,
      cpf: "145214097-92",
      name: "Victória Lopes Braia Coutinho",
      email: "victoriabraia@gmail.com",
      age: 25,
      phone: '3993029320',
      dateOfBirth: new Date("1994-12-13"),
      sectorId: 1
    },
    {
      id: 2,
      cpf: "148014027-93",
      name: "Isvaldo Fernandes de Souza",
      email: "isvaldofernandes@gmail.com",
      age: 27,
      phone: '3993029320',
      dateOfBirth: new Date("1993-05-12"),
      sectorId: 2
    }
  ]

  /**
   * Observable variable to which components can subscribe
   */
  observableCollaboratorsList = new Subject<CollaboratorsModel[]>();

  //TODO retrieve from API
  constructor() {
  }

  /**
   * Method that sends a GET request to Collaborators API
   * @return List of all collaborators provided by the Collaboratos API
   */
  public getAll(){
    this.observableCollaboratorsList.next(this.collaboratorsList);
    return this.collaboratorsList;
  }

  /**
   * Method that sends a POST request to Collaborators API
   * @param Collaborator Object to be added
   */
  public post(collaborator){
    this.collaboratorsList.push(collaborator);
    this.observableCollaboratorsList.next(this.collaboratorsList);
  }

  /**
   * Method that sends a PUT request to Collaborators API
   * @param Collaborator Object to be edited
   */
  public put(collaborator){
    this.index = this.collaboratorsList.findIndex(element => element.id == collaborator.id);
    if(this.index == -1){
      console.log("Não foi possível")
    }
    else{
      this.collaboratorsList.splice(this.index, 1);
      this.collaboratorsList.push(collaborator);
    }
    this.observableCollaboratorsList.next(this.collaboratorsList);
  }

  /**
   * Method that sends a GET request to Collaborators API
   * @param Collaborator id of collaborator to be retrieved
   * @return Collaborator Object provided by the Collaboratos API
   */
  public getById(id){
    this.index = this.collaboratorsList.findIndex(element => element.id == id);
    return this.collaboratorsList[this.index];
  }

  /**
   * Method that sends a DELETE request to Collaborators API
   * @param Collaborator id of collaborator to be deleted
   */
  public delete(id){
    this.index = this.collaboratorsList.findIndex(element => element.id == id);
    this.collaboratorsList.splice(this.index, 1);
    this.observableCollaboratorsList.next(this.collaboratorsList);
  }
}


