import { Component, input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  template: `
    <span class="status-badge">
      @if (showIcon()) {
        <img src="assets/icons/tick.svg" alt="" class="status-badge__icon" width="12" height="12" />
      }
      <span class="status-badge__label">{{ label() }}</span>
    </span>
  `,
  styleUrl: './status-badge.component.scss',
})
export class StatusBadgeComponent {
  readonly label = input('موفقیت');
  readonly showIcon = input(true);
}
