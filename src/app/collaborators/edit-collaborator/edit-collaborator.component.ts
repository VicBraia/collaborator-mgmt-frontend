import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CollaboratorsModel} from "../collaborators.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CollaboratorsService} from "../collaborators.service";
import {DatePipe} from '@angular/common'
import {SectorsModel} from "../../sectors/sectors.model";
import {SectorsService} from "../../sectors/sectors.service";

@Component({
  selector: 'app-edit-collaborator',
  templateUrl: './edit-collaborator.component.html',
  styleUrls: ['./edit-collaborator.component.scss']
})
export class EditCollaboratorComponent implements OnInit {
  form: FormGroup;
  sectorsList: SectorsModel[] = [];
  id: number;
  sub: any;
  showErrorMessage: boolean = false;
  collaborator: CollaboratorsModel = {
    age: 0,
    cpf: "",
    dateOfBirth: undefined,
    email: "",
    id: 0,
    name: "",
    phone: "",
    sectorId: 0
  };

  constructor(private router: Router, private route: ActivatedRoute, private collaboratorsService: CollaboratorsService, private sectorService: SectorsService) { }

  //TODO pre-fill date of birth
  //TODO validate fields
  ngOnInit(): void {
    this.subscribe();
    this.initializeForm();
  }

  subscribe(){
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.collaborator = this.collaboratorsService.getById(this.id);
    });
    this.sectorsList = this.sectorService.getAll();
    this.sectorService.observableSectorsList.subscribe(sectors => {
      this.sectorsList = sectors;
    })
  }

  initializeForm(){
    let dp = new DatePipe('pt');
    this.form = new FormGroup({
      name: new FormControl(this.collaborator.name, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      cpf: new FormControl(this.collaborator.cpf, {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(11), Validators.maxLength(11),  Validators.pattern("^[0-9]*$")]
      }),
      telephone: new FormControl(this.collaborator.phone, {
        updateOn: 'change',
        validators: [Validators.required, Validators.pattern("^[0-9]*$")]
      }),
      dateOfBirth: new FormControl(dp.transform(this.collaborator.dateOfBirth, 'dd/MM/yyyy'), {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      email: new FormControl(this.collaborator.email, {
        updateOn: 'change',
        validators: [Validators.required, Validators.email]
      }),
      sectorId: new FormControl(this.collaborator.sectorId, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    })
  }

  setSector(data){
    this.collaborator.sectorId = this.sectorsList[data.target.selectedIndex].id;
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
      this.collaborator.name = this.form.value.name;
      this.collaborator.cpf = this.form.value.cpf;
      this.collaborator.email = this.form.value.email;
      this.collaborator.dateOfBirth = this.form.value.dateOfBirth;
      this.collaborator.phone = this.form.value.telephone;
      this.collaborator.sectorId = this.form.value.sectorId;
      this.collaboratorsService.put(this.collaborator)
      this.router.navigate(['/collaborators']);
    }
    else{
      this.showErrorMessage = true;
    }
  }

}
