import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {SectorsModel} from "./sectors.model";

@Injectable({
  providedIn: 'root'
})
export class SectorsService {
  index: number;
  sectorsList: SectorsModel[] = [
    {
      id: 1,
      name: "Recursos Humanos"
    },
    {
      id: 2,
      name: "Suprimentos"
    },
    {
      id: 3,
      name: "Tecnologia"
    },
    {
      id: 4,
      name: "Logística"
    }
  ]

  observableSectorsList = new Subject<SectorsModel[]>();

  constructor() { }

  //TODO retrieve from API
  public getAll(){
    this.observableSectorsList.next(this.sectorsList);
    return this.sectorsList;
  }

  public post(sector){
    this.sectorsList.push(sector);
    this.observableSectorsList.next(this.sectorsList);
  }

  public getById(id){
    this.index = this.sectorsList.findIndex(element => element.id == id);
    return this.sectorsList[this.index];
  }
}


