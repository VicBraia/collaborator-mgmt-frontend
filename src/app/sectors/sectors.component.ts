import { Component, OnInit } from '@angular/core';
import {SectorsModel} from "./sectors.model";
import {SectorsService} from "./sectors.service";
import {Router} from "@angular/router";

/**
 * Component for the layout of the page where the list of sectors can be seen
 */
@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.scss']
})
export class SectorsComponent implements OnInit {
  /**
   * List of all sectors
   */
  sectorsList: SectorsModel[];

  /**
   * List of sectors to be shown
   */
  filteredSectorsList: SectorsModel[];

  constructor(private sectorsService: SectorsService, private router: Router) { }

  //TODO paginate data
  /**
   * Initializes Sectors and Collaborators list as well as subscribes to observable sectorsList in SectorsService
   */
  ngOnInit(): void {
    this.sectorsList = this.sectorsService.getAll();
    this.filteredSectorsList = this.sectorsList;
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
   * Method that filters all sectors by name
   * @param data Characters typed to the sesrch bar
   */
  searchThis(data) {
    this.filteredSectorsList = this.sectorsList;
    if (data) {
      this.filteredSectorsList = this.filteredSectorsList.filter(function (ele, i, array) {
        let collaboratorName = ele.name.toLowerCase();
        return collaboratorName.includes(data.target.value, 0);
      })
    }
  }

}
