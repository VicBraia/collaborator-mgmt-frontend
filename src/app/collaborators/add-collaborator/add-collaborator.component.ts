import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators, NgForm} from "@angular/forms";
import {CollaboratorsModel} from "../collaborators.model";
import {CollaboratorsService} from "../collaborators.service";
import {Router} from "@angular/router";
import {SectorsService} from "../../sectors/sectors.service";
import {SectorsModel} from "../../sectors/sectors.model";

@Component({
  selector: 'app-add-component',
  templateUrl: './add-collaborator.component.html',
  styleUrls: ['./add-collaborator.component.scss']
})
export class AddCollaboratorComponent implements OnInit {
  form: FormGroup;
  sectorsList: SectorsModel[] = [];
  showErrorMessage: boolean = false;
  newCollaborator: CollaboratorsModel = {
    age: 0,
    cpf: "",
    dateOfBirth: undefined,
    email: "",
    id: 0,
    name: "",
    phone: "",
    sectorId: -1
  }
  @ViewChild('f') f = NgForm;

  constructor(private collaboratorService: CollaboratorsService, private sectorService: SectorsService, private router: Router) { }

  //TODO validate fields
  //TODO format date
  ngOnInit(): void {
    this.subscribe();
    this.initializeForm();
  }

  initializeForm(){
    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      cpf: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(11), Validators.maxLength(11),  Validators.pattern("^[0-9]*$")],
      }),
      telephone: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern("^[0-9]*$")]
      }),
      dateOfBirth: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.email]
      }),
      sectorId: new FormControl(1, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    })
  }

  subscribe(){
    this.sectorsList = this.sectorService.getAll();
    this.sectorService.observableSectorsList.subscribe(sectors => {
      this.sectorsList = sectors;
    })
  }

  setSector(data){
    this.newCollaborator.sectorId = this.sectorsList[data.target.selectedIndex].id;
  }

  isBlacklistMember(){
    return false;
  }

  isSectorFull(){
     return false;
  }

  isNameEmpty(){
    return this.form.value.name == '';
  }

  isCpfEmpty(){
    return this.form.value.cpf == '';
  }

  isEmailEmpty(){
    return this.form.value.email == '';
  }

  isPhoneEmpty(){
    return this.form.value.telephone == '';
  }

  isDateEmpty(){
    return this.form.value.dateOfBirth == '';
  }

  get email() {
    return this.form.get('email');
  }

  get cpf() {
    return this.form.get('cpf');
  }

  get phone(){
    return this.form.get('telephone');
  }

  onSubmit(){
    if(this.form.status != 'INVALID'){
      this.newCollaborator.name = this.form.value.name;
      this.newCollaborator.cpf = this.form.value.cpf;
      this.newCollaborator.email = this.form.value.email;
      this.newCollaborator.dateOfBirth = this.form.value.dateOfBirth;
      this.newCollaborator.phone = this.form.value.telephone;
      this.newCollaborator.sectorId = this.form.value.sectorId;
      this.collaboratorService.post(this.newCollaborator)
      this.router.navigate(['/collaborators']);
    }
    else{
      this.showErrorMessage = true;
    }
  }
}
