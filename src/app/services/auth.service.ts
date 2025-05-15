import { Injectable } from '@angular/core';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAuth(){
    return getAuth();
  }

  register(user:User){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  logIn(user:User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  logOut(){
    return signOut(getAuth());
  }

  isAuthenticated():boolean{
    const user= getAuth().currentUser;
    return user !== null;
  }
}
