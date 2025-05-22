import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { PageFrameComponent } from './page-frame/page-frame.component';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InitPageFrameComponent } from './init-page-frame/init-page-frame.component';
import { TableComponent } from './table/table.component';
import { TableModule } from 'primeng/table';
import { ColorPickerModule } from 'primeng/colorpicker';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [MenuComponent, PageFrameComponent, InitPageFrameComponent, TableComponent],
  imports: [CommonModule, RouterModule, PanelModule, ButtonModule, TableModule, ColorPickerModule, CheckboxModule, FormsModule, TagModule],
  exports: [MenuComponent, PageFrameComponent, InitPageFrameComponent, TableComponent],
})
export class ComponentsModule {}
