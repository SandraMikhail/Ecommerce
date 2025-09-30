import { Component } from '@angular/core';
import { Footer } from '../../layouts/footer/footer';
import { Navbar } from '../../layouts/navbar/navbar';

@Component({
  selector: 'app-not-found',
  imports: [Footer,Navbar],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class NotFound {

  notFoundImage:string="404.png"

}
