import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { ProductEditComponent } from './product-edit.component';
import { ProductEditGuard } from './product-edit.guard';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent},
      {
        path: 'products/:id', 
        component: ProductDetailComponent, 
        canActivate: [ProductDetailGuard]
      },
      {
        path: 'products/:id/edit',
        component: ProductEditComponent,
        canDeactivate: [ProductEditGuard]
      }
   
    ]), SharedModule
  ],
  exports: [ReactiveFormsModule]
})
export class ProductModule { }
