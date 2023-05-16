import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { IProduct } from './product.interface';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styles: ['thead {color: #337AB7}']
})
export class ProductListComponent implements OnInit, OnDestroy{
  pageTitle = 'Product List';
  imageWidth =  50;
  imageMargin = 2;
  shownImage = false;
  filteredProducts: IProduct[] = [];
  productsList: IProduct[] = [];
  sub!: Subscription;

  private productService = inject(ProductService)

  private _listFilter = '';
  set listFilter(filter: string){
      this._listFilter = filter;
      this.filteredProducts = this.performFilter(filter);
  }

  get listFilter(){
    return this._listFilter
  }

  
  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({ 
      next: products => {
        this.productsList = products;
        this.filteredProducts = products;
      },
      error: err => this.pageTitle = err
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  toggleImage() : void {
    this.shownImage = !this.shownImage;
  }

  performFilter(filterBy: string) : IProduct[]{
      filterBy = filterBy.toLowerCase();
      return this.productsList.filter(product => product.name ?? ''.toLowerCase().includes(filterBy));
  }

  onClickedRating(message: string){
    this.pageTitle = 'Products List: ' + message ;
  }
}
