import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Member} from '../_models/member';
import {AccountService} from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  baseUrl = environment.apiUrl;

  constructor() { }

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }

  getMember(username: string){
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }
}
