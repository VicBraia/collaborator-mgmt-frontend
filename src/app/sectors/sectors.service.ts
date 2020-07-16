import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {SectorsModel} from "./sectors.model";

/**
 * Service that makes CRUD requests to the Collaborators API
 */
@Injectable({
  providedIn: 'root'
})
export class SectorsService {
  index: number;
  /**
   * @ignore
   */
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

  /**
   * Observable variable for components to subscribe to Sectors List
   */
  observableSectorsList = new Subject<SectorsModel[]>();

  //TODO retrieve from API
  constructor() { }

  /**
   * Method that sends a GET request to Collaborators API
   * @return List of all sectors provided by the Collaboratos API
   */
  public getAll(){
    this.observableSectorsList.next(this.sectorsList);
    return this.sectorsList;
  }

  /**
   * Method that sends a POST request to Collaborators API
   * @param Sector Object to be added
   */
  public post(sector){
    this.sectorsList.push(sector);
    this.observableSectorsList.next(this.sectorsList);
  }

  /**
   * Method that sends a GET request to Collaborators API
   * @param Sector id of sector to be retrieved
   * @return Sector Object provided by the Collaboratos API
   */
  public getById(id){
    this.index = this.sectorsList.findIndex(element => element.id == id);
    return this.sectorsList[this.index];
  }
}


