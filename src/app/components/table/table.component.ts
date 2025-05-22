import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'ep-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: false,
})
export class TableComponent {
  @Input()
  title: string = '';
  @Input()
  displayHeader: boolean = true;
  @Input()
  columns: any[] = [];
  @Input()
  expandedColumns: any[] = [];
  @Input()
  data!: any[];
  @Input()
  loading: boolean = false;
  @Output()
  newRegister: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  editRegister: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  deleteRegister: EventEmitter<any> = new EventEmitter<any>();
  @Input() 
  rowStyle?: (item: any) => any;

  getFieldValue(item: any, field: string) {
    const fields = field.split('.');
    let value = item;
    for (const f of fields) {
      if (value[f] === undefined) {
        return '';
      }
      value = value[f];
    }
    return value;
  }
}
