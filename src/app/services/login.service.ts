import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {}
    
  //current user : which is logged in
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/auth/current-user`);
  }
    public generateToken(loginData: any){
        return this.http.post(`${baseUrl}/auth/login`,loginData)
    }

    public loginUser(token:any){
        localStorage.setItem('token',token);
        return true;
    }

    public isLoggedIn(){
      let tokenStr = localStorage.getItem('token')
      if(tokenStr == undefined||tokenStr == '' || tokenStr == null){
        return false;
      }
      else{
        return true;
      }
    }

    public logout(){
      localStorage.removeItem('token')
      console.log("logged out")
      return true;
    }

    public getToken(){
      return localStorage.getItem('token');
    }

    public setUser(user:any){
      localStorage.setItem('user', JSON.stringify(user));
    }

    public getUser(){
      let userStr = localStorage.getItem('user');
      if(userStr!=null){
        return JSON.parse(userStr);
      }
      else{
        this.logout();
        return null;
      }
    }
 
}
