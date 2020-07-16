import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

/**
 * Component for the home page where the menu with the options "Colaboradores" and "Setores" can be seen
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  /**
   * ngOninit
   */
  ngOnInit(): void {
  }

  /**
   * Method that redirects user to a provided path
   * @param path
   */
  redirect(path){
    this.router.navigate([path]);
  }
}
