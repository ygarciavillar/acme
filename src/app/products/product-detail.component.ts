import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from './product.interface';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy{

  pageTitle = "Product Detail";
  product: IProduct | undefined;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private sub!: Subscription

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if(productId){
      this.getProduct(productId);
    }
  }

  getProduct(id: number): void {
    this.sub = this.productService.getProduct(id).subscribe({
      next: prod => this.product = prod,
      error: err => this.pageTitle = err
    })
  }

  onBack(){
    this.router.navigate(['/products']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
