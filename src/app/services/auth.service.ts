import { inject, Service } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

//npm i jwt-decode

@Service()
export class AuthService {
  isAuthenticated: boolean = false;
  roles: any;
  username: any;
  accessToken!: any;
  private http = inject(HttpClient);
  private router = inject(Router);

  public login(username: string, password: string) {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    };
    let params = new HttpParams().set('username', username).set('password', password);
    return this.http.post('http://localhost:8085/auth/login', params, options);
  }

  public logOut() {
    this.isAuthenticated = false;
    this.roles = null;
    this.username = null;
    this.accessToken = undefined;
    window.localStorage.removeItem('jwt-access');
    //this.router.navigateByUrl('/login');
    this.router.navigateByUrl('/login');
  }

  public loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data['access-token'];
    let jwtDecoder: any = jwtDecode(this.accessToken);
    this.username = jwtDecoder.sub;
    this.roles = jwtDecoder.scope;
    window.localStorage.setItem('jwt-access', this.accessToken);
  }

  public loadJwtTokenFromLocalStorage() {
    let jwt = window.localStorage.getItem('jwt-access');
    if (jwt) {
      this.loadProfile({ 'access-token': jwt });
     // this.router.navigateByUrl('/admin');
    }
  }
}
