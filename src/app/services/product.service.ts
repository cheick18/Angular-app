import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
 

  constructor(private http: HttpClient) { }

  public getProducts(page: number=1, size:number=4){
    return  this.http.get(`http://localhost:60/products?_page=${page}&_limit=${size}`,{observe:'response'});
  }
 
  public checkProduct (p:Product): Observable<Product>{
    return  this.http.patch<Product>(`http://localhost:60/products/${p.id}`, 
    {checked:!p.checked});
  }

  public deletProduct (p:Product): Observable<any>{
    return  this.http.delete<any>(`http://localhost:60/products/${p.id}`);
  }

  public saveProduct (p:Product): Observable<Product>{
    return  this.http.post<Product>(`http://localhost:60/products`, 
    p);
  }
  public searchProducts(keyword: string): Observable<Array<Product>>{
    return  this.http.get<Array<Product>>(`http://localhost:60/products?name_like=${keyword}`);
  }


  getProductById(productId: number): Observable<Product> {
    return  this.http.get<Product>(`http://localhost:60/products/${productId}`);
  }

  updateProduct(product: Product) {
    return  this.http.put<Product>(`http://localhost:60/products/${product.id}`, product);
  }
}
