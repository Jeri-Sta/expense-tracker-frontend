import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { PageFrameComponent } from './page-frame/page-frame.component';

@NgModule({
  declarations: [MenuComponent, PageFrameComponent],
  imports: [CommonModule, RouterModule],
  providers: [],
  exports: [MenuComponent, PageFrameComponent],
})
export class ComponentsModule {}
