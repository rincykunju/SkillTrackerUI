import { Component } from '@angular/core';

import {RouterModule, Routes, Router,  } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works';
  constructor(private router:Router) {
    //this.router.navigate["./searchassociatecomponent"]
  }

  ngOnInit() {
    
  }
}