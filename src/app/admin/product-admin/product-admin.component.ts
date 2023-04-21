import { Component } from "@angular/core";
import { DatabaseService } from "src/app/database.service";
import { Product } from "src/app/products";
import { ConfirmationService } from "primeng/api";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";

@Component({
  selector: "app-product-admin",
  templateUrl: "./product-admin.component.html",
  styleUrls: ["./product-admin.component.css"],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  providers: [],
})
export class ProductAdminComponent {
  products: Product[] = [];
  status: string = "";
  errorMessage: string = "";
  display: boolean = false;
  id: number = 0;

  constructor(
    private database: DatabaseService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.database.getItems().subscribe((res) => {
      console.log(res);
      this.products = res;
    });
  }

  delete(id: string) {
    this.confirmationService.confirm({
      message: "¿Deseas eliminar el producto?",
      accept: () => {
        console.log("Eliminado registro con Id = " + id);
        this.database.deleteProduct(id).subscribe({
          next: (data) => {
            this.status = "Se ha borrado correctamente";
            window.location.reload();
          },
          error: (error) => {
            this.errorMessage = error.message;
            console.error("Hubo un error!", error);
          },
        });
      },
    });
  }

  editProductForm = this.formBuilder.group({
    idUpdate: "",
    nameUpdate: "",
  });

  update() {
    let p = {
      id: Number(this.id),
      name: String(this.editProductForm.value.nameUpdate),
    };
    this.confirmationService.confirm({
      message: "¿Deseas Actualizar el producto?",
      accept: () => {
        console.log("Actualizado con el ID = " + p.id);
        this.database.editProduct(p.id, p.name).subscribe({
          next: (data) => {
            this.status = "Se ha actualizado correctamente";
            window.location.reload();
          },
          error: (error) => {
            this.errorMessage = error.message;
            console.error("Hubo un error!", error);
          },
        });
      },
    });
  }

  //Agregado de producto/
  addProductForm = this.formBuilder.group({
    id: "",
    name: "",
    description: "",
    price: 0,
    images: "",
  });

  onSubmit(): void {
    let p = {
      id: Number(this.addProductForm.value.id),
      name: this.addProductForm.value.name,
      description: this.addProductForm.value.description,
      price: this.addProductForm.value.price,
      images: this.addProductForm.value.images,
    };

    this.database.addProduct(p).subscribe({
      next: (data) => {
        this.status = "Se añadio correctamente";
        this.router.navigate(["/"]);
      },
      error: (error) => {
        this.errorMessage = error.message;
        console.error("Hubo un error!", error);
      },
    });
    console.warn("Su pedido ha sido enviado", this.addProductForm.value);
    this.addProductForm.reset();
  }

  showDialog(id: number) {
    this.id = id;
    this.display = true;
  }
}
