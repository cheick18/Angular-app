import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{

productId!:number;
productFormGroup!: FormGroup;
  constructor( private activatedRoute: ActivatedRoute, private fb: FormBuilder,
    private productservice: ProductService){

  }
  ngOnInit(): void {
    this.productId=this.activatedRoute.snapshot.params['id']
    this.productservice.getProductById(this.productId).subscribe({
      next:(product)=>{
        this.productFormGroup=this.fb.group({
          id: this.fb.control(product.id),
          name: this.fb.control(product.name , [Validators.required]),
          price: this.fb.control(product.price , [Validators.min(100)]),
          checked: this.fb.control(product.checked),
        })
      },
      error:error=>{
        console.log(error)
      }
      
    });
  }

  updateProduct() {
    let product : Product=this.productFormGroup.value

    this.productservice.updateProduct(product).subscribe({
      next: data=>{
        alert(JSON.stringify(data));
      }
    });
    }
}
