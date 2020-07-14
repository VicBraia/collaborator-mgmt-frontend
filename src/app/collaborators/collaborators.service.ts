import { Injectable } from '@angular/core';
import {CollaboratorsModel} from "./collaborators.model";
import {Subject} from "rxjs";
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class CollaboratorsService {
  index: number;
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
  observableCollaboratorsList = new Subject<CollaboratorsModel[]>();

  constructor() {
  }

  //TODO retrieve from API
  public getAll(){
    this.observableCollaboratorsList.next(this.collaboratorsList);
    return this.collaboratorsList;
  }

  public post(collaborator){
    this.collaboratorsList.push(collaborator);
    this.observableCollaboratorsList.next(this.collaboratorsList);
  }

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

  public getById(id){
    this.index = this.collaboratorsList.findIndex(element => element.id == id);
    return this.collaboratorsList[this.index];
  }

  public delete(id){
    this.index = this.collaboratorsList.findIndex(element => element.id == id);
    this.collaboratorsList.splice(this.index, 1);
    this.observableCollaboratorsList.next(this.collaboratorsList);
  }
}


