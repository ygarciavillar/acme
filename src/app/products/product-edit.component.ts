import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren, inject } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product.interface';
import { Observable, Subscription, debounce, debounceTime, fromEvent, merge, tap } from 'rxjs';
import { ProductService } from './product.service';
import { NumberValidator } from '../shared/number-validators';
import { IValidationMessage, productsValidationMessages } from '../shared/validation-messages';
import { HammerGestureConfig } from '@angular/platform-browser';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy, AfterViewInit {
   
  @ViewChildren(FormControlName, {read: ElementRef}) 
  formInputsElements!: ElementRef[];

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private sub!: Subscription;

  pageTitle!: string;
  errorMessage!: string;
  productForm!: FormGroup;
  product!: IProduct | undefined;


  // Use with the generic validation message class
  displayMessage: Record<string, string> = {};
  private validationMessages: IValidationMessage = productsValidationMessages;
  private genericValidator = new GenericValidator(this.validationMessages);

  

  get tags(): FormArray {
     return <FormArray>this.productForm.get('tags');
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3) ,Validators.maxLength(50)]],
      code: ['', Validators.required],
      price: ['', Validators.min(0)],
      releaseDate: [''],
      rating: ['', NumberValidator.range(1,5)],
      imageUrl: [''],
      tags: this.fb.array([]),
      description: '',
    })

    this.sub = this.route.paramMap.subscribe( params => {
       const id = params.get('id') || 0;
       this.getProduct(+id);
    })


  }

  

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputsElements
     .map((control : ElementRef) => fromEvent(control.nativeElement, 'blur'));

    merge(this.productForm.valueChanges,...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe( () => this.displayMessage = this.genericValidator.processMessages(this.productForm))

  }

  addTag(): void{
    this.tags.push(new FormControl())
  }

  deleteTag(index: number): void{
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  getProduct(id: number){
    this.productService.getProduct(id).subscribe({
      next: (prod: IProduct) => this.displayProduct(prod),
      error: err => this.errorMessage = err
    }
     
    )
  }

  displayProduct(prod: IProduct){
    if(this.productForm){
      this.productForm.reset();
    }
    this.product = prod;
    this.product.id === 0 
    ? this.pageTitle = 'Add Product' 
    : this.pageTitle = `Edit Product: ${this.product.name}`
    this.productForm.patchValue({
      'name': prod.name,
      'code': prod.code,
      'price': prod.price,
      'releaseDate': prod.releaseDate,
      'rating': prod.rating,
      'imageUrl': prod.imageUrl,
      'description': prod.description,
      
    });
    this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
  }

  deleteProduct(): void{
    if(this.product){
       if(this.product.id === 0) {
         this.onSaveComplete()
       } else{
        if(confirm(`Really delete the product ${this.product.name} `)){
          this.productService.deleteProduct(this.product.id).subscribe({
            next: () => this.onSaveComplete(),
            error: e => this.errorMessage = e
          })
        }
        
      }
    }
    
  }

  saveProduct(): void{
    if(this.productForm.valid){
      if(this.productForm.dirty){
        const p : IProduct = {...this.product, ...this.productForm.value}

        if(p.id === 0) {
          this.productService.createProduct(p).subscribe({
            next: () => this.onSaveComplete(),
            error: e => this.errorMessage = e 
          }
          )
        }
        else{
          this.productService.updateProduct(p).subscribe({
            next: () => this.onSaveComplete(),
            error: e => this.errorMessage = e
          })
        }
      }
      else{
        this.onSaveComplete()
      }
    }else{
      this.errorMessage = "Please correct the validartion errors"
    }
  }

  onSaveComplete(): void {
    this.productForm.reset();
    this.router.navigate(['/products'])
  }

  ngOnDestroy(): void {
   this.sub.unsubscribe();
  }
}
