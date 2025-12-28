import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  getExistingEmails = () => of(new Set<string>(['dyn@gmail.com', 'neo@gmail.com', 'ken@gmail.com']))
}
