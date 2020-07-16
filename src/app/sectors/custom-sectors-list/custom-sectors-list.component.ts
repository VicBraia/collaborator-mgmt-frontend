import {Component, Input, OnInit,} from '@angular/core';
import {SectorsModel} from "../sectors.model";

/**
 * Component for the layout of the list of sectors
 */
@Component({
  selector: 'app-custom-sectors-list',
  templateUrl: './custom-sectors-list.component.html',
  styleUrls: ['./custom-sectors-list.component.scss']
})
export class CustomSectorsListComponent implements OnInit {
  /**
   * List of sectors to be shown. The list may have been filtered by SectorsComponent.
   */
  @Input() sectorList: SectorsModel[];
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit(): void {
  }

}
