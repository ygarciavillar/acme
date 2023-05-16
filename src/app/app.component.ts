import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: `
   
    <nav class='navbar navbar-expand navbar-light bg-light'>
       <div class="container">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <a class='navbar-brand'>{{pageTitle}}</a>
          <ul class='nav nav-pills'>
            <li>
              <a class='nav-link' routerLinkActive='active' routerLink='/welcome'>Home</a>
            </li>
            <li>
              <a class='nav-link' routerLinkActive='active' routerLink='/products' 
                 [routerLinkActiveOptions]="{exact: true}"> 
                 Product List
              </a>
            </li>
            <li>
              <a class="nav-link" routerLinkActive="active" routerLink='/products/0/edit' 
                 [routerLinkActiveOptions]="{exact: true}">
                Add Product
              </a>
            </li>
          </ul>
         </div>
         <a class="btn btn-primary" routerLink="/signup">Sign Up</a>
       </div>
    </nav>
 
    <div class='container'>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  pageTitle: string = 'Acme Product Managment';
}
