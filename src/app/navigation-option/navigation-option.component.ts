import {Component, Input, OnInit} from '@angular/core';

/**
 * Component for the back button on both Collaborators and Sectos view
 */
@Component({
  selector: 'app-navigation-option',
  templateUrl: './navigation-option.component.html',
  styleUrls: ['./navigation-option.component.scss']
})
export class NavigationOptionComponent implements OnInit {

  /**
   * Path to navigate to (previous page)
   */
  @Input() path: string;
  constructor() { }

  /**
   * ngOnInit
   */
  ngOnInit(): void {
  }

}
