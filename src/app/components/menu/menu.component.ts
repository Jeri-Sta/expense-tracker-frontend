import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ep-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  standalone: false,
})
export class MenuComponent {
  menuItems = [
    { label: 'Dashboard', link: '/' },
    {
      label: 'Cadastros',
      submenu: [
        { label: 'Bancos', link: '/bank' },
        { label: 'Cartões', link: '/card' },
        { label: 'Categorias', link: '/category' },
      ],
    },
  ];
}
