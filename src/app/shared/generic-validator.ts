import { FormGroup } from "@angular/forms";
import { IValidationMessage } from "./validation-messages";

export class GenericValidator {

  constructor(private validationMessages: IValidationMessage){}

  processMessages(formContainer: FormGroup): Record<string, string> {
    const messages: Record<string, string> = {};
    for(let controlKey in formContainer.controls) {
      if(formContainer.controls.hasOwnProperty(controlKey)){
        const inputControl = formContainer.controls[controlKey];
        if(inputControl instanceof FormGroup){
          const childMessage = this.processMessages(inputControl);
          Object.assign(messages, childMessage);
        }else{
          if(this.validationMessages[controlKey]){
            messages[controlKey] = '';
            if( (inputControl.dirty || inputControl.touched) && inputControl.errors) {
              Object.keys(inputControl.errors).map( errorKey => {
                messages[controlKey] += this.validationMessages[controlKey][errorKey] + '';
              })
            }
          }
        }
      }
    }
    return messages;
  }
}