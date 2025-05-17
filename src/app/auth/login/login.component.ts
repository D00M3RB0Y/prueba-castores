import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ErrorsService } from '../../services/errors.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{
  username: string = '';
  email: string = '';
  password: string = '';
  showUsernameField: boolean = false;

  constructor(
    private toast: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorsService
  ) {}

  ngOnInit(): void {}

  toggleUsernameField() {
    this.showUsernameField = !this.showUsernameField;
    // Limpiar el campo que se oculta para evitar envíos incorrectos
    if (this.showUsernameField) {
      this.email = '';
    } else {
      this.username = '';
    }
  }

  logIn() {
    if ((!this.username && !this.email) || this.password == '') {
      this.toast.error('The fields are empty', 'Error');
      return;
    }

    const user: User = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this._userService.logIn(user).subscribe({
      next: (response: any) => {
        const token = response.token
        // console.log(token);
        
        this.toast.success(
          `${this.username} ${this.email} Successfully LogedIn.`
        );
        localStorage.setItem("myToken", token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('id', response.id);
        this.router.navigate(['/dashboard']);    
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.messageError(e)
      },
      complete: () => console.log('complete'),
    });
  }
}
