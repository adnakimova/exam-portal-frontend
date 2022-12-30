import { LoginService } from './../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    email:'',
    password:'',
  }

  constructor(private snack:MatSnackBar, private login:LoginService){}

  ngOnInit():void{}

  formSubmit(){
    console.log("login button clicked")

    if(this.loginData.email.trim()=='' || this.loginData.password == null){
        this.snack.open("Username is required","",{
          duration:3000
        });
        return;
    }

    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        this.snack.open("Successfully signed in!","",{
          duration:3000
        });
        console.log('Success!');
        console.log(data)


        this.login.loginUser(data.token)
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user)
          }
        )


      },
      (error:any)=>{
        console.log('Error!');
        console.log(error);
      }
      );
  }
}
