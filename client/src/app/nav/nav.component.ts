import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AccountService} from '../_services/account.service';
import {BsDropdownDirective, BsDropdownToggleDirective} from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  imports: [
    FormsModule,
    BsDropdownToggleDirective,
    BsDropdownDirective
  ],
  templateUrl: './nav.component.html',
  standalone: true,
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService);
  model: any = {};

  login(){
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.log(error)
    });
  }

  logout(){
    this.accountService.logout();
  }
}
