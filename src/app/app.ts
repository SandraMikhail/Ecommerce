import { afterNextRender, Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite';
import { initFlowbite } from 'flowbite';
import { platformBrowser } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { NgxSpinnerComponent } from "ngx-spinner";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent],
templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ecommerce');
  private readonly id = inject(PLATFORM_ID)
  constructor(private flowbiteService: FlowbiteService) {

  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();

      if(isPlatformBrowser(this.id)){
      }
    });
  }
}
