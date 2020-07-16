import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators, NgForm} from "@angular/forms";
import {CollaboratorsModel} from "../collaborators.model";
import {CollaboratorsService} from "../collaborators.service";
import {Router} from "@angular/router";
import {SectorsService} from "../../sectors/sectors.service";
import {SectorsModel} from "../../sectors/sectors.model";

/**
 * Component for adding new collaborators
 */
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

  //TODO format date
  ngOnInit(): void {
    this.subscribe();
    this.initializeForm();
  }

  /**
   * Initializes the reactive form with all inputs necessary to create a new collaborator and defines the Validators
   */
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

  /**
   * Method to create subscription to observable variables from SectorsService to always keep the data shown in the view up-to-date
   */
  subscribe(){
    this.sectorsList = this.sectorService.getAll();
    this.sectorService.observableSectorsList.subscribe(sectors => {
      this.sectorsList = sectors;
    })
  }

  /**
   * Method that sets the id of the chosen sector in the select menu as the value of the sectorId of the new collaborator. Method triggered by change event.
   * @param data receives $event with all info on the formControl for the select menu
   */
  setSector(data){
    this.newCollaborator.sectorId = this.sectorsList[data.target.selectedIndex].id;
  }

  /**
   * Method that checks if Collaborators API's response indicates that the collaborator could not be added because they are in the blacklist.
   */
  isBlacklistMember(){
    return false;
  }

  /**
   * Method that checks if Collaborators API's response indicates that the collaborator could not be added because their sector's age range proportion limit.
   */
  isSectorFull(){
     return false;
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
   * Method triggered by the button "Adicionar" that further checks if form is valid. If it is, it calls the collaboratorsService to post the new Collaborator. If not, it sets a flag that will make visible an error message on the form.
   */
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
