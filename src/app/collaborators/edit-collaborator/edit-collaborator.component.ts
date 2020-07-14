import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, NgForm} from "@angular/forms";
import {CollaboratorsModel} from "../collaborators.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CollaboratorsService} from "../collaborators.service";
import {DatePipe} from '@angular/common'


@Component({
  selector: 'app-edit-collaborator',
  templateUrl: './edit-collaborator.component.html',
  styleUrls: ['./edit-collaborator.component.scss']
})
export class EditCollaboratorComponent implements OnInit {
  form: FormGroup;
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
  id: number;
  sub: any;
  constructor(private router: Router, private route: ActivatedRoute, private collaboratorsService: CollaboratorsService) { }

  //TODO pre-fill date of birth
  //TODO validate fields
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.collaborator = this.collaboratorsService.getById(this.id);
    });
    let dp = new DatePipe('pt');
    this.form = new FormGroup({
      name: new FormControl(this.collaborator.name, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      cpf: new FormControl(this.collaborator.cpf, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(11), Validators.minLength(11)]
      }),
      telephone: new FormControl(this.collaborator.phone, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateOfBirth: new FormControl(dp.transform(this.collaborator.dateOfBirth, 'dd/MM/yyyy'), {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      email: new FormControl(this.collaborator.email, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
    })
  }

  onSubmit(){
    this.collaborator.name = this.form.value.name;
    this.collaborator.cpf = this.form.value.cpf;
    this.collaborator.email = this.form.value.email;
    this.collaborator.dateOfBirth = this.form.value.dateOfBirth;
    this.collaborator.phone = this.form.value.telephone;
    this.collaboratorsService.put(this.collaborator)
    this.router.navigate(['/collaborators']);
  }

}
