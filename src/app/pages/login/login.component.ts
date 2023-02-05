import { LoginService } from './../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private snack:MatSnackBar, private login:LoginService,private router:Router){}

  ngOnInit():void{}

  formSubmit(){
   

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
            //redirect to normal user page
            // window.location.href = '/user-dashboard'
            this.router.navigate(['user-dashboard'])
          }
        )


      },
      (error:any)=>{
        console.log('Error!');
        console.log(error);
        this.login.logout;
        this.snack.open("Invalid details! Try again!",'',{
          duration: 3000
        })
      }
      );
  }
}
