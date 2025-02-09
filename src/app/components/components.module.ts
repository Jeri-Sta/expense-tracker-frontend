import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { PageFrameComponent } from './page-frame/page-frame.component';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [MenuComponent, PageFrameComponent],
  imports: [CommonModule, RouterModule, PanelModule, ButtonModule],
  exports: [MenuComponent, PageFrameComponent],
})
export class ComponentsModule {}
