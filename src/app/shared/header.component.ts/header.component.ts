import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, MatIconModule],
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  handleToggle() {
    this.toggleSidebar.emit();
  }
}
