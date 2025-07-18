import { Component, Input } from '@angular/core';

type Role = 'finder' | 'employer';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  @Input() role: Role = 'finder';
}