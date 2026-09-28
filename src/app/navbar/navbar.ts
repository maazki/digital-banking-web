import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {

  constructor(public authService:AuthService,private router:Router) {
  }
  protected handleLogOut() {
    this.authService.logOut();
   // this.router.navigateByUrl('/login');
  }
}
