import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ep-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  standalone: false,
})
export class MenuComponent {
  menuItems = [
    { label: 'Dashboard', link: '/dashboard' },
    {
      label: 'Cadastros',
      submenu: [
        { label: 'Bancos', link: '/bank' },
        { label: 'Cartões', link: '/card' },
        { label: 'Categorias', link: '/category' },
      ],
    },
  ];

  constructor(private readonly router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/authentication']);
  }

  goTo(link: string) {
    this.router.navigate([link]);
  }
}
