import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IonicModule, CommonModule], // ✅ Import Ionic + Angular directives
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const username = localStorage.getItem('username');
    if (username) {
      this.http.get(`http://localhost:8080/users/${username}`).subscribe({
        next: (res) => this.user = res,
        error: () => alert('User not found')
      });
    } else {
      alert('User not logged in');
    }
  }
}
