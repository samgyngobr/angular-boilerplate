import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{

  user : BehaviorSubject<any>;


  /**
   * Constructor
   *
   * @param {HttpClient} http
   */
  constructor(
    private http: HttpClient
  )
  {
    this.user = new BehaviorSubject(null);
  }


  /**
   * login
   *
   * @param {string} username
   * @param {string} password
   */
  login(username: string, password: string)
  {
    return this.http.post<any>(environment.path + '/api/login', {
        "email"    : username,
        "password" : password
      })
      .pipe( map( user => {

        this.user = user;

        return user;
      }));
  }


}
