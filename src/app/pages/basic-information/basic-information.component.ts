import { Component, computed, signal } from '@angular/core';

import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { SecuritiesTableComponent } from '../../components/securities-table/securities-table.component';
import { SECURITIES_MOCK, TOTAL_ITEMS } from '../../data/securities.mock';
import { SecurityRow } from '../../models/security-row.model';

@Component({
  selector: 'app-basic-information',
  standalone: true,
  imports: [PageHeaderComponent, SecuritiesTableComponent],
  templateUrl: './basic-information.component.html',
  styleUrl: './basic-information.component.scss',
})
export class BasicInformationComponent {
  private readonly searchTerm = signal('');
  private readonly pageSize = signal(10);

  readonly allRows = SECURITIES_MOCK;
  readonly totalItems = TOTAL_ITEMS;

  readonly filteredRows = computed<SecurityRow[]>(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return this.allRows;
    }
    return this.allRows.filter(
      (row) =>
        row.currency1.toLowerCase().includes(term) ||
        row.currency2.toLowerCase().includes(term) ||
        row.currency3.toLowerCase().includes(term) ||
        row.currency4.toLowerCase().includes(term) ||
        row.market.toLowerCase().includes(term) ||
        row.field.label.toLowerCase().includes(term)
    );
  });

  onSearchChange(term: string): void {
    this.searchTerm.set(term);
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
  }

  onCreateDocuments(): void {
    // Hook for navigation or modal when backend is ready
  }
}
