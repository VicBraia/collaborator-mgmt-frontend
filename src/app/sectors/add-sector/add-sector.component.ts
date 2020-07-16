import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SectorsModel} from "../sectors.model";
import {Router} from "@angular/router";
import {SectorsService} from "../sectors.service";

/**
 * Component for adding new sectors
 */
@Component({
  selector: 'app-add-sector',
  templateUrl: './add-sector.component.html',
  styleUrls: ['./add-sector.component.scss']
})
export class AddSectorComponent implements OnInit {

  /**
   * FormGroup for reactive form
   */
  form: FormGroup;
  showErrorMessage: boolean = false;
  newSector: SectorsModel = {id: 0, name: ""};

  constructor(private router: Router, private sectorsService: SectorsService) {
  }

  /**
   * Reactive form is initialized
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    })
  }

  /**
   * Method triggered by the button "Adicionar" that checks if form is valid. If it is, it calls the sectorsService to post the new Sector. If not, it sets a flag that will make visible an error message on the form.
   */
  onSubmit() {
    if (this.form.status != 'INVALID') {
      this.newSector.name = this.form.value.name;
      this.sectorsService.post(this.newSector)
      this.router.navigate(['/sectors']);
    }
    else{
      this.showErrorMessage = true;
    }
  }

}
