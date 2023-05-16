import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, FormArray } from '@angular/forms';
import { Customer } from '../customer';
import { debounceTime } from 'rxjs';

function ratingRange (min: number, max: number) : ValidatorFn {
  return  (c: AbstractControl) : {[key: string] : boolean} | null => {
     if(c.value < min) {
      return {'range': true};
     }
     if((c.value > max)){
      return {'range': true};
     }
     return null
  }
}

function emailMatcher( c: AbstractControl) : {[key: string] : boolean} | null {
  const email = c.get('email');
  const confirmEmail = c.get('confirmEmail');

  if(email?.pristine || confirmEmail?.pristine){
    return null;
  }

  if(email?.value === confirmEmail?.value){
    return null;
  }

  return { 'match': true }

}

interface IValidationMessage {
  [key: string]: string
}

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
})
export class ReactiveFormComponent implements OnInit{
  
  private fb = inject(FormBuilder);
  signupForm!: FormGroup;
  customer = new Customer();
  emailMessage: string = '';

  get addresses() : FormArray {
    return <FormArray>this.signupForm.get('addresses');
  }

  private validationMessages: IValidationMessage = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          confirmEmail: ['', Validators.required]
      }, { validator: emailMatcher}),
      phone: [''],
      notification: 'email',
      rating: ['', ratingRange(1,5)],
      sendCatalog: true,
      addresses: this.fb.array([this.buildAddress()])
    })

    this.signupForm.get('notification')?.valueChanges.subscribe(
        value => this.setNotification(value)
    );

    const emailControl = this.signupForm.get('emailGroup.email');
    emailControl?.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(emailControl)
    )
    
  }

  addAddress() : void {
    this.addresses.push(this.buildAddress());
  }

  print(): void {
    console.log(this.addresses)
    Object.keys(this.addresses);
  }

  buildAddress() : FormGroup {
   return this.fb.group({
      addressType: ['home', Validators.required],
      street1: ['', Validators.required],
      street2: '',
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required]
   })
  }

  

  setMessage(c: AbstractControl) : void {
    this.emailMessage = '';
   if( (c.touched || c.dirty) && c.errors){
     this.emailMessage = Object.keys(c.errors).map(err => this.validationMessages[err]).join('');
   }
  }

  save(){
    console.log(this.signupForm);
    console.log('Saved: ', JSON.stringify(this.signupForm.value))
  }

  populateTestData(): void{
    this.signupForm.patchValue({
      firstName: 'Jhon',
      lastName: 'Doe',
      email: 'jhon.doe@domain.com'
    })
  }

  setNotification(notifyVia: string): void{
    const phoneControl = this.signupForm.get('phone');
    if(notifyVia === 'text'){
      phoneControl?.setValidators([Validators.required])
    }else{
      phoneControl?.clearValidators()
    }

    phoneControl?.updateValueAndValidity()
  }
}
