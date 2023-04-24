import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConvertToSpacesPipe } from './convert-to-spaces.pipe';
import { StartComponent } from './start-component';



@NgModule({
  declarations: [ StartComponent, ConvertToSpacesPipe],
  imports: [
    CommonModule,
  ],
  exports:[
    CommonModule,
    FormsModule,
    StartComponent,
    ConvertToSpacesPipe
  ]
})
export class SharedModule { }
