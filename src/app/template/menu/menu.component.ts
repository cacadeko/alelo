import { Component, OnInit } from '@angular/core';
import { HomeService, HomeServiceComponents } from '../home/home.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  desktop: boolean;
  imageSrc = 'assets/images/alelo-logo.png';
  imageAlt = 'Logo da Alelo';
  dash = 'assets/icons/border-all-solid.svg';
  car = 'assets/icons/car-side-solid.svg';
  titulo = 'Alelo Frota';
  
  private mediaService = new HomeServiceComponents('(min-width: 768px)');

  constructor() { }

  ngOnInit() {
    this.mediaService.match$.subscribe(value => this.desktop = value);
  }

}
