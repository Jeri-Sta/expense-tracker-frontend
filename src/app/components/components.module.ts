import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, RouterModule],
  providers: [],
  exports: [MenuComponent],
})
export class ComponentsModule {}
