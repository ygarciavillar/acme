import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { ProductModule } from './products/product.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { SignupComponent } from './signup/signup.component';
import { TemplateDrivenFormComponent } from './signup/template-driven-form/template-driven-form.component';
import { ReactiveFormComponent } from './signup/reactive-form/reactive-form.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, WelcomeComponent, SignupComponent, TemplateDrivenFormComponent, ReactiveFormComponent],
  imports: [
    BrowserModule, 
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'welcome', component: WelcomeComponent},
      {path: 'signup', component: SignupComponent, children: [
        {path: 'template-driven', component: TemplateDrivenFormComponent},
        {path: 'reactive', component: ReactiveFormComponent},
      ]},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: '**', redirectTo: 'welcome', pathMatch: 'full'}
    ]),
     SharedModule,
    ProductModule
  ],
  providers: [],
  bootstrap: [AppComponent],
}) 
export class AppModule {}
