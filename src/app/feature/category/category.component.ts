import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../core/entities/category/category.service';
import CategoryDto from '../../core/entities/category/category-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  standalone: false,
})
export class CategoryComponent implements OnInit {
  data: CategoryDto[] = [];
  formVisible = false;
  formGroup!: FormGroup;
  totalRecords: number = 0;
  loading: boolean = true;
  pageSize: number = 10;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.getFormGroup();
    this.getCategory();
  }

  getCategory(event?: any) {
    this.loading = true;
    let paramList = {
      page: 0,
      size: this.pageSize,
    };
    if (event) {
      const page = event.first! / event.rows!; // Calcula a página com base no primeiro registro
      const size = event.rows!;
      paramList = {
        page: page,
        size: size,
      };
    }
    this.categoryService.list(paramList).subscribe((data: any) => {
      this.data = data.content;
      this.totalRecords = data.totalElements; // Define o total de registros para paginação
      this.loading = false;
    });
  }

  private getFormGroup() {
    return this.formBuilder.group({
      id: [undefined],
      name: [undefined, Validators.required],
      color: ['#ffffff'],
      fixedExpense: [false],
    });
  }

  newCategory() {
    this.formGroup = this.getFormGroup();
    this.formVisible = true;
  }

  editCategory(category: CategoryDto) {
    this.formVisible = true;
    this.formGroup.patchValue(category);
  }

  deleteCategory(category: CategoryDto) {
    this.categoryService.delete(category.id).subscribe((data) => {
      this.formVisible = false;
      this.getCategory();
    });
  }

  saveCategory() {
    let observable: Observable<any>;
    if (this.formGroup.get('id')?.value) {
      observable = this.updateObservaable();
    } else {
      observable = this.insertObservaable();
    }
    observable.subscribe((data) => {
      this.getCategory();
      this.formVisible = false;
      this.formGroup.reset();
    });
  }

  insertObservaable() {
    return this.categoryService.insert(this.formGroup.getRawValue());
  }

  updateObservaable() {
    return this.categoryService.update(
      this.formGroup.get('id')?.value,
      this.formGroup.getRawValue()
    );
  }

  onPageChange(event: any) {
    console.log(event);
  }
}
