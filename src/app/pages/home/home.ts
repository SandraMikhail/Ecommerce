import { Component, OnInit } from '@angular/core';

import { Products } from './../../core/services/products';
import { Category, Product } from '../../core/interfaces/product';
import { Categories } from '../../core/services/categories';
import {CarouselModule, OwlOptions} from 'ngx-owl-carousel-o';
import { Card } from '../../core/card/card';


@Component({
  selector: 'app-home',
  imports: [CarouselModule,Card],

  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  productsList:Product[]=[]
  categoriesList:Category[]=[]

   customOptionsMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    nav: true,
    items:1
  }


     customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  constructor(private products: Products, private category:Categories) { }



  ngOnInit(): void {
  this.getProducts()
  this.getCategory()
  }

      getProducts(){
      this.products.getProducts().subscribe({
        next: (res) => {
          console.log(res)
          this.productsList = res.data
        }, error: (err) => {
          console.log(err)
        }
      })
    }

    getCategory(){
      this.category.getCategories().subscribe({
        next:(res)=>{
            this.categoriesList = res.data
            console.log("categories", this.categoriesList)
        }, error:(err)=>{
          console.log(err)
        }
      })
    }

}
