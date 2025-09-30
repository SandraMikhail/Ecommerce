import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-blank-layout',
  imports: [RouterOutlet,Navbar, Footer],
  templateUrl: './blank-layout.html',
  styleUrl: './blank-layout.scss'
})
export class BlankLayout {

}
