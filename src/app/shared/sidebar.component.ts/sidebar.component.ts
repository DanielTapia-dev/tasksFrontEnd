import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule, MatIconModule],
})
export class SidebarComponent {
  @Input() isOpen: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(private router: Router) {}

  handleToggle() {
    this.toggleSidebar.emit();
  }

  hasRole(role: string): boolean {
    const userRoles = ['administrador'];
    return userRoles.includes(role);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.handleToggle();
  }

  logout() {
    this.handleToggle();
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }
}
