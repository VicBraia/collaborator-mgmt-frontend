import { Component, OnInit } from '@angular/core';
import {SectorsModel} from "./sectors.model";
import {SectorsService} from "./sectors.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.scss']
})
export class SectorsComponent implements OnInit {
  sectorsList: SectorsModel[];
  filteredSectorsList: SectorsModel[];

  constructor(private sectorsService: SectorsService, private router: Router) { }

  //TODO paginate data
  ngOnInit(): void {
    this.sectorsList = this.sectorsService.getAll();
    this.filteredSectorsList = this.sectorsList;
    this.sectorsService.observableSectorsList.subscribe(sectors => {
      this.sectorsList = sectors;
    });
  }

  redirectTo(path) {
    this.router.navigate([path]);
  }

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
