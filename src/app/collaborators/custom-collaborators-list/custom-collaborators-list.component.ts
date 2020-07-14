import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CollaboratorsModel} from "../collaborators.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SectorsModel} from "../../sectors/sectors.model";
import {element} from "protractor";

@Component({
  selector: 'app-custom-collaborators-list',
  templateUrl: './custom-collaborators-list.component.html',
  styleUrls: ['./custom-collaborators-list.component.scss']
})
export class CustomCollaboratorsListComponent implements OnInit {

  closeResult: boolean = false;
  @Input() collaboratorsList: CollaboratorsModel[];
  @Input() sectorsList: SectorsModel[];
  @Output() deleteIndex = new EventEmitter<number>();

  constructor(private modalService: NgbModal) {
  }

  //TODO paginate
  ngOnInit(): void {
  }

  openConfirmationModal(content, id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result == true){
        this.deleteIndex.emit(id);
      }
    });
  }

  getSectorName(id){
    let index = this.sectorsList.findIndex(element => element.id == id);
    if(index == -1){
      return "Não associado a um setor"
    }
    return this.sectorsList[index].name;
  }
}
