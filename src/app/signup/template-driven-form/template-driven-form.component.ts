import { Component } from '@angular/core';
import { Customer } from '../customer';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',

})
export class TemplateDrivenFormComponent {
customer = new Customer();

  save(signupForm: NgForm){
    console.log(signupForm.form);
    console.log('Saved :' + JSON.stringify(signupForm.value));
  }
}
