import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  public page = 1;
  public pageSize = 5; // Nombre d'éléments par page

  totalPages: number = 0;
  currentPage: number = 1;
  //products: Array<Product> = [];
 // keyword: string = "";

goToPage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.page = page;
    this.getProducts();
  }
}
generatePageNumbers(): number[] {
  return Array(this.totalPages).fill(0).map((x, i) => i + 1);
}


  //private http!:HttpClient;
  constructor(private productservice:ProductService, private router:Router ){}

 public products:Array<Product> =[]
  keyword: string="";
  //totalPages:number=0;
  //pageSize:number=3;
  //currentPage:number=1;


  ngOnInit(): void {
   this.getProducts();
  }

  getProducts(){

    this.productservice.getProducts(this.page, this.pageSize)
    this.productservice.getProducts(1, 100)
    .subscribe({
      next :(resp) =>{
        this.products=resp.body as Product[];
        this.totalPages = Math.ceil(this.products.length / this.pageSize);
       // let totalProducts:number=parseInt(resp.headers.get('x-total-count')!);
        console.log("zzto",this.totalPages)
       /* this.totalPages= Math.floor(totalProducts / this.pageSize);
        if(totalProducts% this.pageSize !=0){
          this.totalPages =this.totalPages+1
        }*/
      },
     
        error: err =>{
          console.log(err);
        }
     
    })
  }

 

handlaCheckProduct(p: Product) {
  this.productservice.checkProduct(p)
  .subscribe({
    next: updatedProduct =>{
      this.getProducts();
      //p.checked=!p.checked;
    }
  })
 
  }


  handleDelete(p: Product) {
    if(confirm("Etes vous sûre?"))
    this.productservice.deletProduct(p).subscribe({
      next:value =>{
        //this.getProducts();
        this.products=this.products.filter(p=>p.id!= p.id);
      }
    })
    }

    searchProducts() {
      this.productservice.searchProducts(this.keyword).subscribe({
        next:value=>
        {this.products=value;
        }
      })
      }

      handleEdit(product: Product) {
        this.router.navigateByUrl(`/editProduct/${product.id}`)
        }

   // Méthode pour compter les produits avec checked=true
  countCheckedProducts(): number {
    return this.products.filter(product => product.checked).length;
  }
}

