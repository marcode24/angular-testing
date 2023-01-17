import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

import { ProductsService } from 'src/app/services/product.service';
import { ValueService } from 'src/app/services/value.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  limit = 10;
  offset = 0;
  status: 'loading' | 'success' | 'error' | 'init' = 'init';
  rta!: string;
  constructor(
    private productsService: ProductsService,
    private valueService: ValueService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  async callPromise() {
    this.rta = await this.valueService.getPromiseValue();
  }

  getAllProducts() {
    this.status = 'loading';
    this.productsService.getAll( this.limit, this.offset )
    .subscribe({
      next: products => {
        this.products = [...this.products, ...products];
        this.offset += this.limit;
        this.status = 'success';
      },
      error: err => {
        setTimeout(() => {
          this.products = [];
          this.status = 'error';
        }, 3000);
      }
    })

    // .subscribe(products => {
    //   this.products = [...this.products, ...products];
    //   this.offset += this.limit;
    //   this.status = 'success';
    // });
    // this.productsService.getAllSimple()
    // .subscribe(products => {
    //   this.products = products;
    // });
  };
}
