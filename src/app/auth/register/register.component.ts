import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';

  

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  username: string = '';
  name: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';

  constructor(
    private toast: ToastrService, 
    private _userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addUser() {
    if (
      this.username == '' ||
      this.name == '' ||
      this.lastname == '' ||
      this.email == '' ||
      this.password == '' ||
      this.repeatPassword == ''
    ) {
      this.toast.error("The fields are empty", "Error")
      return
    }
    if(this.password != this.repeatPassword){
      this.toast.warning("The passwords do not match.", "Warning")
      return
    }

    const user: User = {
      username: this.username,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    }

    console.log(user)

    this._userService.signIn(user).subscribe(data =>{
      this.toast.success(`${this.name} ${this.lastname} Successfully created.`)
      this.router.navigate(['/login'])

    }, (event: HttpErrorResponse)=>{
      if(event.error.msg){
        console.log(event.error.msg)
        this.toast.warning(event.error.msg, "Error")
      }else{
        this.toast.error("Server error", "Error")
      }
    })
  }
}