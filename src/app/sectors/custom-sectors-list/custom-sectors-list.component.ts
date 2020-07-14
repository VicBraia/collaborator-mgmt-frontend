import {Component, Input, OnInit,} from '@angular/core';
import {SectorsModel} from "../sectors.model";

@Component({
  selector: 'app-custom-sectors-list',
  templateUrl: './custom-sectors-list.component.html',
  styleUrls: ['./custom-sectors-list.component.scss']
})
export class CustomSectorsListComponent implements OnInit {

  @Input() sectorList: SectorsModel[];
  constructor() { }

  ngOnInit(): void {
    console.log(this.sectorList)
  }

}
