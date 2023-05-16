export interface IValidationMessage {
  [key: string] : Record<string, string>
}

/*Validation Messages for the productForm */
export const productsValidationMessages : IValidationMessage = {
  name: {
    required: 'Product name is required.',
    minlength: 'Product name must be at least three characters.',
    maxlength: 'Product name cannot exceed 50 characters.'
  },
  code: {
    required: 'Product code is required.'
  },
  price: {
    min: 'The min price should be grather than cero'
  },
  rating: {
    range: 'Rate the product between 1 (lowest) and 5 (highest).'
  }
}

