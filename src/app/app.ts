import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  constructor(private authService:AuthService) {
  }
  ngOnInit(): void {
    this.authService.loadJwtTokenFromLocalStorage();
  }
  protected readonly title = signal('digital-banking-web');
}
