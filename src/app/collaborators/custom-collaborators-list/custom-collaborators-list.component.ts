import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CollaboratorsModel} from "../collaborators.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SectorsModel} from "../../sectors/sectors.model";

/**
 * Component for the layout of the list of collaborators
 */
@Component({
  selector: 'app-custom-collaborators-list',
  templateUrl: './custom-collaborators-list.component.html',
  styleUrls: ['./custom-collaborators-list.component.scss']
})
export class CustomCollaboratorsListComponent implements OnInit {
  /**
   * List of collaborators to be shown. The list may have been filtered by CollaboratorsComponent.
   */
  @Input() collaboratorsList: CollaboratorsModel[];

  /**
   * List of Sectors used to retrieve the names of each collaborator's sector by their sectorId
   */
  @Input() sectorsList: SectorsModel[];

  /**
   * CollaboratorId of the collaborator to be deleted sent as event emission to CollaboratorsComponent
   */
  @Output() deleteIndex = new EventEmitter<number>();

  constructor(private modalService: NgbModal) {
  }

  //TODO paginate
  ngOnInit(): void {
  }

  /**
   * Method that open the Delete Confirmation modal
   * @param content Id of the ng-template for the modal
   * @param id Collaborator Id to be emitted to CollaboratorsComponent
   */
  openConfirmationModal(content, id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result == true){
        this.deleteIndex.emit(id);
      }
    });
  }

  /**
   * Method to match the collaborators' sectorId's to their names, so the names of the sectors can be shown.
   * @param id Sector Id
   */
  getSectorName(id){
    let index = this.sectorsList.findIndex(element => element.id == id);
    if(index == -1){
      return "Não associado a um setor"
    }
    return this.sectorsList[index].name;
  }
}
