import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CollaboratorsModel} from "../collaborators.model";
import {CollaboratorsService} from "../collaborators.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-component',
  templateUrl: './add-collaborator.component.html',
  styleUrls: ['./add-collaborator.component.scss']
})
export class AddCollaboratorComponent implements OnInit {
  form: FormGroup;
  newCollaborator: CollaboratorsModel = {age: 0, cpf: "", dateOfBirth: undefined, email: "", id: 0, name: "", phone: ""};

  constructor(private collaboratorService: CollaboratorsService, private router: Router) { }

  //TODO validate fields
  //TODO format date
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      cpf: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      telephone: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateOfBirth: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
    })
  }

  onSubmit(){
    this.newCollaborator.name = this.form.value.name;
    this.newCollaborator.cpf = this.form.value.cpf;
    this.newCollaborator.email = this.form.value.email;
    this.newCollaborator.dateOfBirth = this.form.value.dateOfBirth;
    this.newCollaborator.phone = this.form.value.telephone;
    this.collaboratorService.post(this.newCollaborator)
    this.router.navigate(['/collaborators']);
  }
}
