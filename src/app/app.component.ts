import { Component } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { ToastModule } from 'primeng/toast';
import { FeatureModule } from './feature/feature.module';
import { CategoryService } from './core/entities/category/category.service';
import { MessageService } from 'primeng/api';
import { BankService } from './core/entities/bank/bank.service';
import { CardService } from './core/entities/card/card.service';
@Component({
  selector: 'app-root',
  imports: [ComponentsModule, FeatureModule, ToastModule],
  providers: [CategoryService, BankService, CardService, MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'expense-tracker-frontend';
}
