import { Component, signal } from '@angular/core';

type Role = 'finder' | 'employer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly role = signal<Role>('finder');

  switchRole() {
    this.role.update(current => current === 'finder' ? 'employer' : 'finder');
  }
}