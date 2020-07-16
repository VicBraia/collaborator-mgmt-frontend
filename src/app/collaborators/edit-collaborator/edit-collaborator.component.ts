import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CollaboratorsModel} from "../collaborators.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CollaboratorsService} from "../collaborators.service";
import {DatePipe} from '@angular/common'
import {SectorsModel} from "../../sectors/sectors.model";
import {SectorsService} from "../../sectors/sectors.service";

/**
 * Component for editing a collaborator
 */
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
  ngOnInit(): void {
    this.subscribe();
    this.initializeForm();
  }

  /**
   * Method to create subscription to observable variables from SectorsService and collaboratorsService to always keep the data shown in the view up-to-date
   */
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

  /**
   * Initializes the reactive form with all inputs necessary to edit a  collaborator, defines the Validators and prefills the fields with the collaborator's data.
   */
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

  /**
   * Method that sets the id of the chosen sector in the select menu as the value of the sectorId of the new collaborator. Method triggered by change event.
   * @param data receives $event with all info on the formControl for the select menu
   */
  setSector(data){
    this.collaborator.sectorId = this.sectorsList[data.target.selectedIndex].id;
  }

  /**
   * Method that checks if name field was filled out for field validation
   */
  isNameEmpty(){
    return this.form.value.name == '';
  }

  /**
   * Method that checks if cpf field was filled out for field validation
   */
  isCpfEmpty(){
    return this.form.value.cpf == '';
  }

  /**
   * Method that checks if email field was filled out for field validation
   */
  isEmailEmpty(){
    return this.form.value.email == '';
  }

  /**
   * Method that checks if phone field was filled out for field validation
   */
  isPhoneEmpty(){
    return this.form.value.telephone == '';
  }

  /**
   * Method that checks if date field was filled out for field validation
   */
  isDateEmpty(){
    return this.form.value.dateOfBirth == '';
  }

  /**
   * getter function used to check if there are errors of validation on the e-mail provided
   */
  get email() {
    return this.form.get('email');
  }

  /**
   * getter function used to check if the quantity of characters is correct and if there are only number characters on the cpf provided.
   */
  get cpf() {
    return this.form.get('cpf');
  }

  /**
   * getter function used to check if there are only number characters on the phone number provided.
   */
  get phone(){
    return this.form.get('telephone');
  }

  /**
   * Method triggered by the button "Conluir" that further checks if form is valid. If it is, it calls the collaboratorsService to put the new Collaborator. If not, it sets a flag that will make visible an error message on the form.
   */
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
