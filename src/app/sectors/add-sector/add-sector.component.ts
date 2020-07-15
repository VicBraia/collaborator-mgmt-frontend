import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SectorsModel} from "../sectors.model";
import {Router} from "@angular/router";
import {SectorsService} from "../sectors.service";

@Component({
  selector: 'app-add-sector',
  templateUrl: './add-sector.component.html',
  styleUrls: ['./add-sector.component.scss']
})
export class AddSectorComponent implements OnInit {

  form: FormGroup;
  showErrorMessage: boolean = false;
  newSector: SectorsModel = {id: 0, name: ""};

  constructor(private router: Router, private sectorsService: SectorsService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    })
  }

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
