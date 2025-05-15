import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logOut(){
    this.authService.logOut()
    .then(()=>{
      this.router.navigate(['/login']);
    })
    .catch(error => console.log(error))
  }
}
