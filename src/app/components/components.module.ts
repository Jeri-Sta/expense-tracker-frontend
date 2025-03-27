import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { PageFrameComponent } from './page-frame/page-frame.component';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InitPageFrameComponent } from './init-page-frame/init-page-frame.component';
@NgModule({
  declarations: [MenuComponent, PageFrameComponent, InitPageFrameComponent],
  imports: [CommonModule, RouterModule, PanelModule, ButtonModule],
  exports: [MenuComponent, PageFrameComponent, InitPageFrameComponent],
})
export class ComponentsModule {}
