import { Injectable } from "@angular/core";
import { Product } from "./products";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  //URL para consumir los productos
  baseUrl = "http://localhost:3000/products";
  items: Product[] = []; //Productos vacíos iniciando

  constructor(private http: HttpClient) {}

  // GET
  getItems(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }
  deleteProduct(id: string): Observable<any> {
    try {
      return this.http.delete<Product>(this.baseUrl + "/" + id);
    } catch (error) {
      return this.http.delete<Product>(this.baseUrl + "/" + id);
    }
  }
  addProduct(product: any): Observable<any> {
    let p = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.images[0],
    };
    return this.http.post(this.baseUrl, p);
  }

  editProduct(id: number, name: string) {
    const params = new HttpParams().set("id", id).set("name", name);
    return this.http.put<Product>(this.baseUrl, {}, { params });
  }
}
