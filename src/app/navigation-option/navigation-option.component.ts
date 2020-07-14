import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-navigation-option',
  templateUrl: './navigation-option.component.html',
  styleUrls: ['./navigation-option.component.scss']
})
export class NavigationOptionComponent implements OnInit {

  @Input() path: string;
  constructor() { }

  ngOnInit(): void {
  }

}
