import { Component, output } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  template: `
    <header class="page-header">
      <div class="page-header__text">
        <h1 class="page-header__title">Basic Information</h1>
        <p class="page-header__subtitle">
          Reference data for bank securities management and registration in the Sima system
        </p>
      </div>
      <button type="button" class="btn btn--brand" (click)="createDocuments.emit()">
        <img src="assets/icons/setting.svg" alt="" width="16" height="16" />
        <span>Create New Documents</span>
      </button>
    </header>
  `,
  styleUrl: './page-header.component.scss',
})
export class PageHeaderComponent {
  readonly createDocuments = output<void>();
}
