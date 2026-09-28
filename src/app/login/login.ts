import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login implements OnInit {
  formLogin!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authServices: AuthService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control(''),
    });
  }

  handleLogin() {
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;
    this.authServices.login(username, password).subscribe({
      next: (data) => {
        this.authServices.loadProfile(data);
        this.router.navigateByUrl('/admin');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
