import { ChangeDetectorRef, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Card } from "../../core/card/card";
import { Product } from '../../core/interfaces/product';
import { Products as ProductsService } from './../../core/services/products'; // ✅ Aliased correctly
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchPipe } from '../../core/pipes/search-pipe';
import { NgxSpinnerService } from 'ngx-spinner';
import { Writable } from 'stream';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, Card,NgxPaginationModule,SearchPipe, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.scss'] // ✅ Fixed key
})
export class Products implements OnInit {
  private readonly productsService = inject(ProductsService); // ✅ Correct class reference
  private readonly ngxSpinnerService = inject(NgxSpinnerService);
  private readonly cdr = inject(ChangeDetectorRef);

  productsList:WritableSignal<Product[]> = signal([]);
  pageSize!:number
  p!:number
  total!:number
  text:string =""

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(pageNumber:number = 1): void {
    this.ngxSpinnerService.show()
    this.productsService.getProducts(pageNumber).subscribe({
      next: (res) => {
        console.log('Response:', res);
        this.productsList.set(res.data);
        this.pageSize = res.metadata.limit
        this.p = res.metadata.currentPage
        this.total= res.results
        this.ngxSpinnerService.hide()
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.ngxSpinnerService.hide()
        console.error('Error fetching products:', err);
      }
    });
  }
}
