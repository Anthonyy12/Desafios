import { Component } from "@angular/core";
import { DatabaseService } from "../database.service";
import { Product } from "../products";
import { products } from "../products";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(private database: DatabaseService) {
    this.database.getItems().subscribe((res) => {
      console.log(res);
      this.products = res;
    });
  }

  share() {
    window.alert("El producto ha sido compartido.!");
  }

  onNotify() {
    window.alert("Se le notificará cuando el producto salga a la venta");
  }
}
