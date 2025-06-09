import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username = '';
  password = '';
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.loading = true;
    this.error = null;

    this.http.post<any>('http://localhost:8080/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        // ✅ Store both role and username
        localStorage.setItem('userRole', res.role);
        localStorage.setItem('username', this.username); // Needed for profile page
        this.router.navigateByUrl('/home');
      },
      error: () => {
        this.error = 'Invalid credentials';
        this.loading = false;
      }
    });
  }
}
