import { Component, Input } from "@angular/core";
import { Product } from "../products";
import { DialogModule } from "primeng/dialog";
import { CartService } from "../cart.service";
import { MessageService } from "primeng/api";
import { PrimeNGConfig } from "primeng/api";

@Component({
  providers: [MessageService],
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent {
  display: boolean = false;

  constructor(
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private cartService: CartService
  ) {}

  @Input() product!: Product;

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  share() {
    window.alert("The product has been shared!");
  }

  onNotify() {
    this.primengConfig.ripple = true;
    this.messageService.add({
      severity: "success",
      detail: "Sera notificado ",
    });
  }

  showDialog() {
    this.display = true;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.messageService.add({
      severity: "success",
      detail: "Se agrega al carrito de compras",
    });
  }
}
