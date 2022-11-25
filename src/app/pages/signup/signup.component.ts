import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']

})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService, private snack:MatSnackBar) { }

  public user = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  ngOnInit(): void {

  }

  formSubmit() {
    console.log(this.user);
    if(this.user.userName=='' || this.user.userName==null){
      //alert("User is required!!");
      this.snack.open("Username is required!", '',{duration:3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    })
      return;
    }
    //addUser: userService
    this.userService.addUser(this.user).subscribe(
        (data)=>{
          alert("success")
        },
        (error)=>{
          console.log("error")
          this.snack.open("Something went wrong!", '',{duration:3000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          })
        }
    )
  }


}


