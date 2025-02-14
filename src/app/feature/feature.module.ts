import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { CategoryComponent } from './category/category.component';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { BankComponent } from './bank/bank.component';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [CategoryComponent, BankComponent],
  imports: [
    ComponentsModule,
    CommonModule,
    PanelModule,
    TableModule,
    ButtonModule,
    TagModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ColorPickerModule,
    ToggleSwitchModule,
  ],
})
export class FeatureModule {}
