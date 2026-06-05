import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { SecurityRow } from '../../models/security-row.model';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';

@Component({
  selector: 'app-securities-table',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    StatusBadgeComponent,
  ],
  templateUrl: './securities-table.component.html',
  styleUrl: './securities-table.component.scss',
})
export class SecuritiesTableComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  readonly rows = input.required<SecurityRow[]>();
  readonly totalItems = input(75);
  readonly pageSizeChange = output<number>();
  readonly searchChange = output<string>();

  readonly toolbarForm = new FormGroup({
    code: new FormControl('', { nonNullable: true }),
    pageSize: new FormControl('۱', { nonNullable: true }),
  });

  readonly displayedColumns = [
    'actions',
    'status',
    'currency4',
    'currency3',
    'currency2',
    'currency1',
    'market',
    'row',
  ];

  readonly headerSelectAll = new FormControl(false, { nonNullable: true });
  readonly rowSelection = new SelectionModel<SecurityRow>(true, []);
  readonly pageSummary = signal('10-1 از 75 مورد');

  ngOnInit(): void {
    this.toolbarForm.controls.code.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.searchChange.emit(value));

    this.toolbarForm.controls.pageSize.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.pageSizeChange.emit(this.parsePageSize()));
  }

  onSearch(): void {
    this.searchChange.emit(this.toolbarForm.controls.code.value);
  }

  isAllSelected(): boolean {
    const data = this.rows();
    return data.length > 0 && this.rowSelection.selected.length === data.length;
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.rowSelection.clear();
      this.headerSelectAll.setValue(false, { emitEvent: false });
      return;
    }
    this.rowSelection.select(...this.rows());
    this.headerSelectAll.setValue(true, { emitEvent: false });
  }

  toggleRow(row: SecurityRow): void {
    this.rowSelection.toggle(row);
    this.headerSelectAll.setValue(this.isAllSelected(), { emitEvent: false });
  }

  isRowSelected(row: SecurityRow): boolean {
    return this.rowSelection.isSelected(row);
  }

  private parsePageSize(): number {
    const raw = this.toolbarForm.controls.pageSize.value.replace(/[^\d]/g, '');
    const n = parseInt(raw, 10);
    return Number.isFinite(n) && n > 0 ? n : 10;
  }
}
